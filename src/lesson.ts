import type { LessonMetadata } from "./core.js";

export const LESSON = {
  "number": 7,
  "title": "Building and Registering Your First Agent",
  "shortTitle": "Agent registration",
  "eyebrow": "DEFINE · EXPORT · REGISTER · INVOKE",
  "hero": "Register your",
  "accent": "first agent.",
  "description": "Resolve a real agent by registry key or stable ID, inspect its identity, and invoke it only after provider setup is ready.",
  "labTitle": "Resolve the first agent",
  "labDescription": "Try the registry key and the agent ID as different lookup methods. A source module alone does not make an agent available to the runtime.",
  "localMode": "Actual Mastra agent registration and lookup · no model call",
  "defaultQuestion": "Explain what an AI agent is using one short example and one check-your-understanding question.",
  "objectives": [
    {
      "title": "Define a minimal Agent",
      "text": "Supply a stable id, display name, instructions and model. Add capabilities deliberately rather than starting with an opaque all-in-one configuration."
    },
    {
      "title": "Export the definition",
      "text": "The agent module exports the actual object used by the registry. Dead or unimported source is not a running component."
    },
    {
      "title": "Register with Mastra",
      "text": "The firstAgent registry key is how getAgent selects this agent. It differs from the stable lesson-seven-first-agent ID."
    },
    {
      "title": "Use the correct lookup method",
      "text": "getAgent resolves the registry key; getAgentById resolves the stable id. The lab executes those SDK methods instead of guessing from filenames."
    },
    {
      "title": "Separate setup failures",
      "text": "Registration can work while provider credentials or model permissions are missing. Inspect each boundary independently."
    },
    {
      "title": "Run a bounded first task",
      "text": "The optional live call uses the registered agent and a small prompt. It has explicit step, output and time limits."
    }
  ],
  "workflow": [
    "Import the agent definition",
    "Register it under firstAgent",
    "Validate the requested lookup",
    "Resolve by registry key or stable ID",
    "Inspect actual identity fields",
    "Optionally invoke the registered agent"
  ],
  "scope": "The local lab really resolves the registered agent. No tools, persistent memory or authentication system are added to this minimal first-agent example. Provider inference occurs only in live mode.",
  "examples": [
    {
      "name": "Resolve the registry key",
      "input": {
        "lookupBy": "key",
        "agentRef": "firstAgent"
      },
      "expected": "The registered agent's actual ID and name."
    },
    {
      "name": "Use an ID as a key",
      "input": {
        "lookupBy": "key",
        "agentRef": "lesson-seven-first-agent"
      },
      "expected": "A lookup finding explaining the key/ID distinction."
    },
    {
      "name": "Resolve the stable ID",
      "input": {
        "lookupBy": "id",
        "agentRef": "lesson-seven-first-agent"
      },
      "expected": "The same registered agent through getAgentById."
    }
  ],
  "sourceFiles": [
    "src/lab.ts",
    "src/mastra/agents.ts",
    "src/mastra/index.ts"
  ],
  "exercise": "Change the display name and inspect whether the key and stable ID change. Then use the wrong lookup method and diagnose the result before changing credentials.",
  "checks": [
    {
      "question": "Does exporting a class instance register it?",
      "answer": "No. The runtime must import it and supply it in the Mastra agents record."
    },
    {
      "question": "Are key, ID and name interchangeable?",
      "answer": "No. This app demonstrates the registry-key and ID lookup methods separately; the name is a display label."
    },
    {
      "question": "Does a successful lookup prove provider access?",
      "answer": "No. Lookup is local registration evidence. A model call has a separate credential and provider boundary."
    }
  ],
  "docs": [
    {
      "title": "Agent definition",
      "url": "https://mastra.ai/docs/agents/overview"
    },
    {
      "title": "Mastra registry",
      "url": "https://mastra.ai/reference/core/mastra-class"
    }
  ]
} satisfies LessonMetadata;
