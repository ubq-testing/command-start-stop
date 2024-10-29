import { Organization, PullRequest, PullRequestState, Repository } from "@octokit/graphql-schema";
import { Context } from "../types";

type QueryResponse = {
  organization: Pick<Organization, "repositories"> & {
    repositories: {
      nodes: Array<
        Pick<Repository, "name"> & {
          pullRequests: {
            nodes: Array<
              Pick<PullRequest, "number" | "title" | "url" | "createdAt"> & {
                author: {
                  login: string;
                } | null;
              }
            >;
            pageInfo: {
              endCursor: string | null;
              hasNextPage: boolean;
            };
          };
        }
      >;
      pageInfo: {
        endCursor: string | null;
        hasNextPage: boolean;
      };
    };
  };
};

interface TransformedPullRequest {
  repository: string;
  number: number;
  title: string;
  url: string;
  author: string | null;
  createdAt: string;
}

interface FetchPullRequestsParams {
  context: Context;
  organization: string;
  state?: PullRequestState[];
}

const QUERY_PULL_REQUESTS = /* GraphQL */ `
  query ($organization: String!, $state: [PullRequestState!]!, $repoAfter: String, $prAfter: String) {
    organization(login: $organization) {
      repositories(first: 100, after: $repoAfter) {
        nodes {
          name
          pullRequests(states: $state, first: 100, after: $prAfter) {
            nodes {
              number
              title
              url
              author {
                login
              }
              createdAt
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

async function getAllPullRequests({ context, organization, state = ["OPEN"] }: FetchPullRequestsParams): Promise<TransformedPullRequest[]> {
  const { octokit } = context;
  const allPullRequests: TransformedPullRequest[] = [];
  let hasNextRepoPage = true;
  let repoAfter: string | null = null;

  while (hasNextRepoPage) {
    try {
      const response = (await octokit.graphql(QUERY_PULL_REQUESTS, {
        organization,
        state,
        repoAfter,
        prAfter: null,
      })) as QueryResponse;

      const { repositories } = response.organization;

      for (const repo of repositories.nodes) {
        let hasNextPrPage = true;
        let prAfter: string | null = null;

        while (hasNextPrPage) {
          const prResponse = (await octokit.graphql<QueryResponse>(QUERY_PULL_REQUESTS, {
            organization,
            state,
            repoAfter,
            prAfter,
          })) as QueryResponse;

          const currentRepo = prResponse.organization.repositories.nodes.find((r) => r?.name === repo.name);

          if (currentRepo && currentRepo.pullRequests.nodes?.length) {
            const transformedPrs = (currentRepo.pullRequests.nodes.filter((o) => o) as PullRequest[]).map((pr) => ({
              repository: repo.name,
              number: pr.number,
              title: pr.title,
              url: pr.url,
              author: pr.author?.login ?? null,
              createdAt: pr.createdAt,
            }));

            allPullRequests.push(...transformedPrs);
          }

          hasNextPrPage = currentRepo?.pullRequests.pageInfo.hasNextPage ?? false;
          prAfter = currentRepo?.pullRequests.pageInfo.endCursor ?? null;

          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      hasNextRepoPage = repositories.pageInfo.hasNextPage;
      repoAfter = repositories.pageInfo.endCursor;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  return allPullRequests;
}

export { getAllPullRequests };
export type { FetchPullRequestsParams, TransformedPullRequest };
