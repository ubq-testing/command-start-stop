import { SupportedEvents, SupportedEventsU } from "./context";
import { StaticDecode, Type as T } from "@sinclair/typebox";
import { StandardValidator } from "typebox-validators";

export type Thresholds = {
  prs: number;
  stars: number;
  issues: number;
  minCommitsThisYear: number;
};

export type LangData = {
  lang: string;
  percentage: number;
};

export type Language = Record<string, number>;

export interface PluginInputs<T extends SupportedEventsU = SupportedEventsU, TU extends SupportedEvents[T] = SupportedEvents[T]> {
  stateId: string;
  eventName: T;
  eventPayload: TU["payload"];
  settings: StartStopSettings;
  authToken: string;
  ref: string;
}

const ONE_DAY = 24 * 60 * 60 * 1000;

export const startStopSchema = T.Object({
  isEnabled: T.Boolean({ default: true }),
  timers: T.Object(
    {
      reviewDelayTolerance: T.Number(),
      taskStaleTimeoutDuration: T.Number(),
    },
    { default: { reviewDelayTolerance: ONE_DAY * 5, taskStaleTimeoutDuration: ONE_DAY * 30 } }
  ),
  miscellaneous: T.Object(
    {
      maxConcurrentTasks: T.Number(),
      startRequiresWallet: T.Boolean(),
    },
    { default: { maxConcurrentTasks: 3, startRequiresWallet: true } }
  ),
  experience: T.Optional(
    T.Object(
      {
        minAccountAgeInDays: T.Number(), // Minimum account age in days,
        mostImportantLanguage: T.Record(T.String(), T.Number()), // Most important language to detect
        languages: T.Record(T.String(), T.Number()), // Languages to detect
        statThresholds: T.Object({
          stars: T.Number(), // Minimum number of stars
          minCommitsThisYear: T.Number(), // Minimum number of commits
          prs: T.Number(), // Minimum number of PRs
          issues: T.Number(), // Minimum number of issues
          // contributions: T.Number(), // Minimum number of contributions
        }),
      },
      {
        default: {
          minAccountAgeInDays: 365,
          mostImportantLanguage: { Typescript: 10 },
          languages: { Solidity: 10, JavaScript: 10 },
          statThresholds: {
            stars: 1,
            commits: 1,
            prs: 1,
            issues: 1,
            contributions: 1,
          },
        },
      }
    )
  ),
});

export type StartStopSettings = StaticDecode<typeof startStopSchema>;
export const startStopSettingsValidator = new StandardValidator(startStopSchema);
