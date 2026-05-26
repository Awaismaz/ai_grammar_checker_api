# AI Grammar Checker — API

Backend API for [`ai_grammar_checker`](https://github.com/Awaismaz/ai_grammar_checker) — a thin service that wraps an LLM provider and exposes grammar / clarity / style suggestions over HTTP.

## Status

Companion service to the React front-end. Code is uploaded for portfolio reference; see the front-end repo for the user-facing flow.

## Usage

The front-end expects a small REST surface roughly along the lines of:

```
POST /check
Body: { "text": "your draft here" }

Response:
{
  "suggestions": [ { "type": "grammar", "from": "...", "to": "...", "reason": "..." }, ... ]
}
```

Adjust the exact route to whatever your deployment uses.

## Quick start

```bash
npm install      # if Node
# or
pip install -r requirements.txt   # if Python

# then run the server entry point appropriate to the stack
```

## Notes

This repo is intentionally minimal. The polished demo lives in the front-end repo — this side just brokers the LLM call.
