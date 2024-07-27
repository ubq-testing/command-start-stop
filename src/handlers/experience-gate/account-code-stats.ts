import { Context, LangData, Language, Thresholds } from "../../types";
import { statsParser, topLangsParser } from "./parsers";

export async function accountCodeStats(context: Context) {
  const { payload, logger, config } = context;
  const { sender } = payload;

  if (!config.experience) {
    return;
  }

  const {
    experience: { languages, mostImportantLanguage, statThresholds },
  } = config;

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
  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}`;
  const topLangsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}`;

  const statsRes = await fetch(statsUrl);
  const topLangsRes = await fetch(topLangsUrl);

  if (!statsRes.ok || !topLangsRes.ok) {
    throw new Error("Failed to fetch account stats");
  }

  const statsDoc = await statsRes.text();
  const topLangsDoc = await topLangsRes.text();

  return {
    stats: statsParser(statsDoc),
    langs: topLangsParser(topLangsDoc),
  };
}

function handleLanguageChecks(
  langs: LangData[],
  mostImportantLanguage: Language,
  languages: Language,
  logger: Context["logger"],
  sender: Context["payload"]["sender"]
) {
  const mostImportantLang = Object.keys(mostImportantLanguage)[0].toLowerCase();
  const requiredMilThreshold = Object.values(mostImportantLanguage)[0];
  const mostImportantLangData = langs.find((lang) => lang.lang.toLowerCase() === mostImportantLang);

  if (!mostImportantLangData) {
    logger.error(`${sender.login} does not any recorded experience with ${mostImportantLang}`);
    return;
  }

  if (mostImportantLangData.percentage < requiredMilThreshold) {
    logger.error(`${sender.login} has less than required ${requiredMilThreshold}% experience with ${mostImportantLang}`);
    return;
  }

  const langsToCheck = Object.keys(languages).map((lang) => lang.toLowerCase());
  const detectedLangs = [];
  for (const lang of langsToCheck) {
    const langData = langs.find((l) => l.lang.toLowerCase() === lang);
    if (langData) {
      detectedLangs.push(langData);
    }
  }

  for (const lang of detectedLangs) {
    const threshold = languages[lang.lang.toLowerCase()];
    const percentage = lang.percentage;

    if (threshold > percentage) {
      logger.error(`${sender.login}: ${percentage}% of ${lang.lang} is less than required ${threshold}%`);
      return;
    }
  }

  logger.info(`${sender.login} has passed all language checks`);

  return true;
}

function handleStatChecks(stats: ReturnType<typeof statsParser>, thresholds: Thresholds, logger: Context["logger"], sender: Context["payload"]["sender"]) {
  const { totalPRs, totalStars, totalIssues, totalCommitsThisYear } = stats;

  logger.info(`Checking ${sender.login} stats`, { stats, thresholds });

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

  if (totalCommitsThisYear < thresholds.minCommitsThisYear) {
    logger.error(`${sender.login} has less than required ${thresholds.minCommitsThisYear} commits`);
    return;
  }

  logger.info(`${sender.login} has passed all stat checks`);

  return true;
}
