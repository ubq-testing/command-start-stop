import { Value } from "@sinclair/typebox/value";
import { startStopBounty } from "./plugin";
import { Env } from "./types/env";
import { startStopSchema } from "./types/plugin-input";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      if (request.method !== "POST") {
        return new Response(JSON.stringify({ error: `Only POST requests are supported.` }), {
          status: 405,
          headers: { "content-type": "application/json", Allow: "POST" },
        });
      }
      const contentType = request.headers.get("content-type");
      if (contentType !== "application/json") {
        return new Response(JSON.stringify({ error: `Error: ${contentType} is not a valid content type` }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }

      const webhookPayload = await request.json();
      console.log("webhookPayload: ", webhookPayload);
      const settings = Value.Decode(startStopSchema, Value.Default(startStopSchema, JSON.parse(webhookPayload.settings)));
      webhookPayload.eventPayload = JSON.parse(webhookPayload.eventPayload);
      webhookPayload.settings = settings;
      await startStopBounty(webhookPayload, env);
      return new Response(JSON.stringify("OK"), { status: 200, headers: { "content-type": "application/json" } });
    } catch (error) {
      return handleUncaughtError(error);
    }
  },
};

function handleUncaughtError(error: unknown) {
  console.error(error);
  const status = 500;
  return new Response(JSON.stringify({ error }), { status: status, headers: { "content-type": "application/json" } });
}