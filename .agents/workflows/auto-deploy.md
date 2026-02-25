---
description: Auto-Deploy to production anytime an AI task finishes
---
// turbo-all

This workflow ensures that when the AI finishes a task, it pushes the code to the main branch to trigger a deployment in Hostinger.

1. Run the local deployment script to stage, commit, and push changes to the `main` branch.
```bash
npm run deploy
```
