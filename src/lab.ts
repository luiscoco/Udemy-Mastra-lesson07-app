import { z } from "zod";
import { mastra } from "./mastra/index.js";
import { createTutor } from "./mastra/agents.js";
import { assertActive, generateAnswer, modelId, type AgentModel, type Emit, type LabResult } from "./core.js";
export const inputSchema = z.object({ lookupBy: z.enum(["key", "id"]), agentRef: z.string().min(1).max(100) }).strict();
export function resolveAgent(input: z.infer<typeof inputSchema>) {
  const registered = mastra.listAgents();
  if (input.lookupBy === "key") return Object.hasOwn(registered, input.agentRef) ? mastra.getAgent(input.agentRef as "firstAgent") : undefined;
  return Object.values(registered).some(agent => agent.id === input.agentRef) ? mastra.getAgentById(input.agentRef) : undefined;
}
export async function executeLab(raw: unknown, emit: Emit, signal: AbortSignal): Promise<LabResult> {
  const input = inputSchema.parse(raw); assertActive(signal); const agent = resolveAgent(input);
  emit({ type: "stage", text: `Looked up the actual registered agent by ${input.lookupBy}.` });
  return { status: agent ? "pass" : "needs-attention", summary: agent ? "The actual Mastra lookup resolved an agent. Generation is a separate operation." : "No agent matches that lookup. Compare the registry key with the stable id.",
    data: { lookup: input, registry: Object.entries(mastra.listAgents()).map(([key, value]) => ({ key, id: value.id, name: value.name })), resolved: agent ? { id: agent.id, name: agent.name } : null, providerCalled: false } };
}
export const liveModel = (_?: unknown) => modelId();
export async function executeLive(raw: unknown, question: string, emit: Emit, signal: AbortSignal, model?: AgentModel) {
  const input = inputSchema.parse(raw); const agent = resolveAgent(input);
  if (!agent) return { finished: false, steps: 0, details: { finding: "No matching registered agent; no model call." } };
  const result = await generateAnswer(model ? createTutor(model) : agent, question, emit, signal);
  return { ...result, details: { registryKey: "firstAgent", stableId: agent.id, finishReason: result.finishReason } };
}
export async function dispose() {}
