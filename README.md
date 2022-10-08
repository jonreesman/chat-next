# chat-app

This application is the associated frontend that goes with [chat-app](https://github.com/jonreesman/chat). It is developed using Next.js with Typescript for strict typing and [mantine](https://mantine.dev/) to simplify components I needed to create. The use of Typescript was a secondary thought, being implemented after much of the work was done. Thus, I may go back and re-work the entire structure.

[Live Demo](https://chat.jonreesman.dev)

## Getting Started

1. Make sure the associated [backend](https://github.com/jonreesman/chat) is running.
2. Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to direct to your backend instance (see included `.env.local.sample`). Ensure you also set `NEXT_PUBLIC_SITE_SECURE` to be `true` or `false` depending on whether your backend needs to be reached via HTTP or HTTPS.
3. Simply run:

```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000).
