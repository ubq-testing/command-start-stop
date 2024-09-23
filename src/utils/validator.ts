import { Value, ValueError } from "@sinclair/typebox/value";
import { Env, envConfigValidator, startStopSchema, StartStopSettings, startStopSettingsValidator } from "../types";

export function validateAndDecodeSchemas(env: Env, rawSettings: object) {
  const errorDetails: ValueError[] = [];
  const settings = Value.Default(startStopSchema, rawSettings) as StartStopSettings;

  if (!startStopSettingsValidator.test(settings)) {
    for (const error of startStopSettingsValidator.errors(settings)) {
      console.error(error);
      errorDetails.push(error);
    }
  }

  if (!envConfigValidator.test(env)) {
    for (const error of envConfigValidator.errors(env)) {
      console.error(error);
      errorDetails.push(error);
    }
  }

  const decodedSettings = Value.Decode(startStopSchema, settings);
  const decodedEnv = Value.Decode(envConfigValidator.schema, env);

  return { decodedEnv, decodedSettings, errors: errorDetails };
}
