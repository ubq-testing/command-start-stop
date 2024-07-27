import { load } from 'cheerio';

export function topLangsParser(html: string) {
    const $ = load(html);
    const langs = $('text[data-testid="lang-name"]');
    const percentages = $('text.lang-name').filter((_, element) => {
        return /\d+(\.\d+)?%/.test($(element).text());
    });

    const data = langs.map((i, lang) => {
        return {
            lang: $(lang).text().toLowerCase(),
            percentage: parseFloat($(percentages[i]).text())
        };
    }).get();

    return data;
}

export function statsParser(text2: string) {
    const $ = load(text2);
    const desc = $('desc').text();
    const year = new Date().getFullYear();

    const steps = {
        totalStars: 0,
        totalCommitsThisYear: 0,
        totalPRs: 0,
        totalIssues: 0,
        totalContributionsLastYear: 0,
    }

    const regexes = [
        /Total Stars Earned: (\d+)/,
        new RegExp(`Total Commits in ${year} : (\\d+)`), // the space before ":" is intentional
        /Total PRs: (\d+)/,
        /Total Issues: (\d+)/,
        /Contributed to \(last year\): (\d+)/
    ];

    const data = regexes.reduce((acc, regex, i) => {
        const match = desc.match(regex);
        if (match) {
            const key = Object.keys(steps)[i] as keyof typeof steps;
            const value = match[1];
            steps[key] = parseInt(value);
        }
        return acc;
    }, steps);

    return data;
}
