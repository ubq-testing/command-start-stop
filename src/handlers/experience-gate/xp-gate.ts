import { accountCodeStats } from "./account-code-stats";
import { accountAgeHandler } from "./account-age-handler";
import { Context } from "../../types";

export async function handleExperienceChecks(context: Context) {
    const { logger } = context;

    if (!await accountAgeHandler(context)) {
        return;
    }

    if (!await accountCodeStats(context)) {
        return;
    }

    logger.info("User meets all requirements");

    return true;
}