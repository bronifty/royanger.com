# royanger.com

A new, fully React-based website built to house my portfolio, contact details and blog. The goal was something modern, using the technology stacks I am currently working with and to move away from WordPress.

-  **Library** [React](https://reactjs.org/)
-  **Framework** [Next.js](https://nextjs.org/)
-  **Content**
-  **Deployment** [Vercel](https://vercel.com)

## Goals

-  Easy to manage blog via markdown
-  Allow for blog posts and 'bookmarks' as reading material
-  Great mobile, tablet and desktop experience
-  Great accessibility
-  Portfolio showcase
-  Light and Dark mode
-  Clean and professional

## Running Locally

```bash
git clone https://github.com/royanger/royanger.com.git
cd royanger.com
npm install
npm run dev
```

Set the following variables as Environment Variables in Vercel, then use the CLI to create a local copy of those in your project.

**ENV Variables**

```js
MAIL_PASS
MAIL_USER
MAIL_HOST
MAIL_PORT
```

**Vercel CLI**

```bash
vercel env pull
```

-  requires you have setup Vercel CLI and linked to your project. See [Project Linking](https://vercel.com/docs/cli#introduction/project-linking) for more info
