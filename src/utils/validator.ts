import { TransformDecodeCheckError, TransformDecodeError, Value, ValueError } from "@sinclair/typebox/value";
import { Env, envConfigValidator, startStopSchema, StartStopSettings, startStopSettingsValidator } from "../types";

export function validateAndDecodeSchemas(env: Env, rawSettings: object) {
  const errors: ValueError[] = [];
  const settings = Value.Default(startStopSchema, rawSettings) as StartStopSettings;

  if (!startStopSettingsValidator.test(settings)) {
    for (const error of startStopSettingsValidator.errors(settings)) {
      console.error(error);
      errors.push(error);
    }
  }

  if (!envConfigValidator.test(env)) {
    for (const error of envConfigValidator.errors(env)) {
      console.error(error);
      errors.push(error);
    }
  }

  if (errors.length) {
    throw { errors };
  }

  try {
    const decodedSettings = Value.Decode(startStopSchema, settings);
    const decodedEnv = Value.Decode(envConfigValidator.schema, env);
    return { decodedEnv, decodedSettings };
  } catch (e) {
    if (e instanceof TransformDecodeCheckError || e instanceof TransformDecodeError) {
      throw { errors: [e.error] };
    }
    throw e;
  }
}
