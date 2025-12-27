# Terminology Constitution v1

**Status: Frozen (Product Layer)**

This is Syncrade’s external dictionary. Terms must not drift.

⸻

## Hard Rule: Dictionary Is a System API

- **User-visible dictionary must be unique** (Signal/Insight/Observation/Risk/Behavior...).
- **UI copy must not invent new nouns.** If a concept cannot be expressed with the dictionary, it is not a Syncrade feature.
- Forbidden lexicon must be treated as **compile-time failure** (lint/CI), not “style preference”.

⸻

## Core Terms (with boundary sentence)

- **Notify**: only answers **“我的钱包发生了什么”** (wallet changes), not market advice.
- **Signal**: only answers **“市场有什么值得注意（系统判断）”**, never trade instructions.
- **Insights**: only answers **“行为发生了什么稳定变化（非信号）”**; not a “report/aggregation page”.
- **Share**: only answers **“策略配置模板（不是建议）”**; sharing is configuration, not recommendation.
- **Config**: only answers **“系统如何被约束与配置”** (windows, rules, filters), not personalization for profit.

⸻

## Naming Consistency Rules

- “Insights” must always mean **stable behavior shift** across windows.
- If a page/module is a deterministic fact projection, name it **Observation**, not “Summary”.
- If an output cannot be mapped to an Intelligence Object type, it must not be named as a feature.
 - **SUMMARY is not an Intelligence Object type**; it is a Render Block / Composite View.

⸻

## Forbidden Lexicon (Minimum)

These terms must not appear in user-visible UI copy or rendering:

- buy / sell
- entry / exit
- target / opportunity
- bullish / bearish
- long / short

**Executable source:** `docs/terminology.json` (nouns + forbidden lexicon).



