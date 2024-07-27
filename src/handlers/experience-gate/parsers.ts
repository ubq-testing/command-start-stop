import { load } from "cheerio";

export function topLangsParser(html: string) {
  const $ = load(html);
  // cspell: disable
  const langs = $('text[data-testid="lang-name"]');
  // cspell: enable
  const percentages = $("text.lang-name").filter((a, element) => {
    a;
    return /\d+(\.\d+)?%/.test($(element).text());
  });

  return langs
    .map((i, lang) => {
      return {
        lang: $(lang).text().toLowerCase(),
        percentage: parseFloat($(percentages[i]).text()),
      };
    })
    .get();
}

export function statsParser(text2: string) {
  const $ = load(text2);
  const desc = $("desc").text();
  const year = new Date().getFullYear();

  const steps = {
    totalStars: 0,
    totalCommitsThisYear: 0,
    totalPRs: 0,
    totalIssues: 0,
    totalContributionsLastYear: 0,
  };

  const regexes = [
    /Total Stars Earned: (\d+)/,
    new RegExp(`Total Commits in ${year} : (\\d+)`), // the space before ":" is intentional
    /Total PRs: (\d+)/,
    /Total Issues: (\d+)/,
    /Contributed to \(last year\): (\d+)/,
  ];

  return regexes.reduce((acc, regex, i) => {
    const match = desc.match(regex);
    if (match) {
      const key = Object.keys(steps)[i] as keyof typeof steps;
      const value = match[1];
      steps[key] = parseInt(value);
    }
    return acc;
  }, steps);
}
