import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";
dotenv.config();
interface PrDetails {
  repository: string;
  number: number;
  title: string;
  url: string;
  created_at: string;
  updated_at: string;
}

interface PrCountResult {
  totalPRs: number;
  processedRepos: number;
  totalRepos: number;
}

interface PrDetailsResult {
  prs: PrDetails[];
  total: number;
  processedRepos: number;
  totalRepos: number;
}

function isHttpError(error: unknown): error is { status: number; message: string } {
  return typeof error === "object" && error !== null && "status" in error && "message" in error;
}

async function countPrivateUserOpenPrs(organization: string, username: string, authToken: string): Promise<PrCountResult> {
  const octokit = new Octokit({ auth: authToken });

  try {
    const repos = await octokit.paginate(octokit.repos.listForOrg, {
      org: organization,
      per_page: 100,
      type: "all",
    });

    let totalPrs = 0;
    let processedRepos = 0;
    const totalRepos = repos.length;

    const tasks = repos.map(async (repo) => {
      processedRepos++;

      if (processedRepos % 10 === 0) {
        console.log(`Processing repositories: ${processedRepos}/${totalRepos}`);
      }

      try {
        const prs = await octokit.paginate(octokit.pulls.list, {
          owner: organization,
          repo: repo.name,
          state: "open",
          per_page: 100,
        });

        const userPrs = prs.filter((pr) => pr.user?.login === username);
        totalPrs += userPrs.length;
      } catch (error) {
        if (isHttpError(error)) {
          if (error.status === 404) {
            console.warn(`Repository ${repo.name} not found or no access`);
            return;
          }
          if (error.status === 403) {
            console.warn(`No permission to access ${repo.name}`);
            return;
          }
        }
        throw error;
      }
    });

    await Promise.all(tasks);

    return {
      totalPRs: totalPrs,
      processedRepos,
      totalRepos,
    };
  } catch (error) {
    if (isHttpError(error) && error.status === 403) {
      throw new Error(`Authentication failed or rate limit exceeded: ${error.message}`);
    }
    throw error;
  }
}

async function getPrivateUserOpenPrsDetails(organization: string, username: string, authToken: string): Promise<PrDetailsResult> {
  const octokit = new Octokit({ auth: authToken });

  try {
    const repos = await octokit.paginate(octokit.repos.listForOrg, {
      org: organization,
      per_page: 100,
      type: "all",
    });

    const allPrs: PrDetails[] = [];
    let processedRepos = 0;
    const totalRepos = repos.length;

    const tasks = repos.map(async (repo) => {
      processedRepos++;

      if (processedRepos % 10 === 0) {
        console.log(`Processing repositories: ${processedRepos}/${totalRepos}`);
      }

      try {
        const prs = await octokit.paginate(octokit.pulls.list, {
          owner: organization,
          repo: repo.name,
          state: "open",
          per_page: 100,
        });

        const userPrs = prs
          .filter((pr) => pr.user?.login === username)
          .map((pr) => ({
            repository: repo.name,
            number: pr.number,
            title: pr.title,
            url: pr.html_url,
            created_at: pr.created_at,
            updated_at: pr.updated_at,
          }));

        allPrs.push(...userPrs);
      } catch (error) {
        if (isHttpError(error) && (error.status === 404 || error.status === 403)) {
          return;
        }
        throw error;
      }
    });

    await Promise.all(tasks);

    return {
      prs: allPrs,
      total: allPrs.length,
      processedRepos,
      totalRepos,
    };
  } catch (error) {
    if (isHttpError(error) && error.status === 403) {
      throw new Error(`Authentication failed or rate limit exceeded: ${error.message}`);
    }
    throw error;
  }
}

async function main() {
  const organization = "ubiquity";
  const username = "sshivaditya2019";
  const authToken = process.env.GITHUB_TOKEN ?? "";

  try {
    const countResult = await countPrivateUserOpenPrs(organization, username, authToken);
    console.log(`Found ${countResult.totalPRs} open PRs by ${username}`);
    console.log(`Processed ${countResult.processedRepos} out of ${countResult.totalRepos} repositories`);

    const detailedResult = await getPrivateUserOpenPrsDetails(organization, username, authToken);
    console.log(detailedResult);
  } catch (error) {
    console.error(error);
  }
}

main().catch(console.error);
