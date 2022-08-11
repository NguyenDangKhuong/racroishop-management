**run development**
1.terminal: 

> yarn dev


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Sync
auto sync with github and gitlab(done):

#### Sync Gitlab to Github (easy)
This one is simple. You could set up some CI/CD yourself. But Gitlab will automatically do this for you.

Go to "Settings > Repository > Mirroring repositories"
Enter your Github repo with your username in front `https://<github username>@github.com/path/to/your/repo.git`
In the password field, enter your Github token
Select push (this requires a subscription)
Press Mirror repository
From now on, changes to Gitlab will be mirrored to Github

#### Sync Github to Gitlab (intermediate unless you pay)

Method 1 Github CI/CD
Create the following secrets in your Github repository
`TARGET_URL` value: the URL of the Gitlab repository
`TARGET_TOKEN` value: Gitlab token
`TARGET_USERNAME` value: Gitlab username
Create a Github action for your repository with the following code:
```
name: GitlabSync

on:
  - push
  - delete

jobs:
  sync:
    runs-on: ubuntu-latest
    name: Git Repo Sync
    steps:
    - uses: actions/checkout@v2
      with:
        fetch-depth: 0
    - uses: wangchucheng/git-repo-sync@v0.1.0
      with:
        # Such as https://github.com/wangchucheng/git-repo-sync.git
        target-url: ${{ secrets.TARGET_URL }}
        # Such as wangchucheng
        target-username: ${{ secrets.TARGET_USERNAME }}
          # You can store token in your project's 'Setting > Secrets' and reference the name here. Such as ${{ secrets.ACCESS\_TOKEN }}
        target-token: ${{ secrets.TARGET_TOKEN }}
```
**Make sure the branch you are pushing to in Gitlab is not protected or allows for force push**
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
