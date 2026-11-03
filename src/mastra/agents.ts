import { makeAgent, type AgentModel } from "../core.js";
export const instructions = "You are a beginner Mastra tutor. Explain one concept accurately using the supplied task. Distinguish agent stable id, display name and registry key. Use Markdown and fenced TypeScript code when helpful.";
export function createTutor(model?: AgentModel) { return makeAgent("lesson-seven-first-agent", "Lesson 7 tutor", instructions, model); }
export const tutor = createTutor();
