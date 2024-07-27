import { Context } from "../../types";


export async function accountAgeHandler(context: Context) {
    const { octokit, payload, logger, config: { experience: { minAccountAgeInDays } } } = context;
    const { sender } = payload;

    const user = await octokit.users.getByUsername({
        username: sender.login,
    });

    const created = new Date(user.data.created_at);

    const age = Math.round((Date.now() - created.getTime()) / (1000 * 60 * 60 * 24));

    if (age < minAccountAgeInDays || isNaN(age)) {
        logger.error(`${sender.login} has not met the minimum account age requirement of ${minAccountAgeInDays} days`);
        return;
    }

    return true;
}