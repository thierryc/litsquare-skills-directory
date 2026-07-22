# Interoperability

LitSquare Skills separates four layers:

1. Agent Skills defines the portable Skill directory and `SKILL.md`.
2. `.skill` transports exactly one Skill as a Gemini-compatible ZIP layout.
3. `.skillkit` is an experimental LitSquare collection format.
4. Publisher discovery and MCP are versioned adapters, not authoring formats.

The Core fixtures pin Agent Skills commit `38a2ff8`, Gemini CLI `.skill` behavior
at `v0.51.0`, Cloudflare discovery draft 0.2.0 for later M4 work, and MCP stable
protocol 2025-11-25 for later M5 work. Draft integrations are labeled as drafts
and isolated so they can evolve without rewriting Skill content.
