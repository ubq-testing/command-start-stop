import { Context } from "../../types";
import { statsParser, topLangsParser } from "./parsers";

export async function accountCodeStats(context: Context) {
    const { payload, logger, config: { experience: { languages, mostImportantLanguage, statThresholds } } } = context;
    const { sender } = payload;

    const { langs, stats } = await getAccountStats(sender.login);

    if (!handleLanguageChecks(langs, mostImportantLanguage, languages, logger, sender)) {
        return;
    }

    if (!handleStatChecks(stats, statThresholds, logger, sender)) {
        return;
    }

    return true;
}


async function getAccountStats(username: string) {
    // https://github.com/anuraghazra/github-readme-stats - for more info, filters, etc.
    const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}`;
    const topLangsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}`

    const statsRes = await fetch(statsUrl);
    const topLangsRes = await fetch(topLangsUrl);

    const statsDoc = await statsRes.text();
    const topLangsDoc = await topLangsRes.text();

    return {
        stats: statsParser(statsDoc),
        langs: topLangsParser(topLangsDoc)
    }
}



function handleLanguageChecks(
    langs: { lang: string; percentage: string }[],
    mostImportantLanguage: { [key: string]: number },
    languages: { [key: string]: number },
    logger: Context["logger"],
    sender: Context["payload"]["sender"]
) {
    const mostImportantLang = langs.find(lang => lang.lang in mostImportantLanguage);

    if (!mostImportantLang) {
        logger.error(`${sender.login} does not any recorded experience with ${mostImportantLanguage}`);
        return;
    }

    const userMilPercentage = parseFloat(mostImportantLang.percentage);
    const requiredMilThreshold = mostImportantLanguage[mostImportantLang.lang];

    if (requiredMilThreshold > userMilPercentage) {
        logger.error(`${sender.login}: ${userMilPercentage}% of ${mostImportantLang.lang} is less than required ${requiredMilThreshold}%`);
        return;
    }

    const detectedLangs = langs.filter(lang => lang.lang in languages);

    for (const lang of detectedLangs) {
        const threshold = languages[lang.lang];
        const percentage = parseFloat(lang.percentage);

        if (threshold > percentage) {
            logger.error(`${sender.login}: ${percentage}% of ${lang.lang} is less than required ${threshold}%`);
            return;
        }
    }

    logger.info(`${sender.login} has passed all language checks`);

    return true;
}

function handleStatChecks(
    stats: {
        totalPRs: number;
        totalStars: number;
        totalIssues: number;
        totalCommitsThisYear: number;
        totalContributionsLastYear: number;
    },
    thresholds: {
        prs: number;
        stars: number;
        issues: number;
        commits: number;
        contributions: number;
    },
    logger: Context["logger"],
    sender: Context["payload"]["sender"]
) {
    const {
        totalPRs,
        totalStars,
        totalIssues,
        totalCommitsThisYear,
        totalContributionsLastYear,
    } = stats;

    if (totalPRs < thresholds.prs) {
        logger.error(`${sender.login} has less than required ${thresholds.prs} PRs`);
        return;
    }

    if (totalStars < thresholds.stars) {
        logger.error(`${sender.login} has less than required ${thresholds.stars} stars`);
        return;
    }

    if (totalIssues < thresholds.issues) {
        logger.error(`${sender.login} has less than required ${thresholds.issues} issues`);
        return;
    }

    if (totalCommitsThisYear < thresholds.commits) {
        logger.error(`${sender.login} has less than required ${thresholds.commits} commits`);
        return;
    }

    if (totalContributionsLastYear < thresholds.contributions) {
        logger.error(`${sender.login} has less than required ${thresholds.contributions} contributions`);
        return;
    }



    logger.info(`${sender.login} has passed all stat checks`);

    return true;
}
