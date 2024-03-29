### Usage

## use notus nextjs theme - daisy-ui -tailwind

**run development**

- run cmd:

> `yarn dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`.

**deploy production**

- before deploy run cmd:

> `yarn build`

**Use webpack-bundle-analyzer in your Next.js project:**

> `yarn build-ananalyzer`

- When enabled two HTML files (client.html and server.html) will be outputted to <distDir>/analyze/. One will be for the server bundle, one for the browser bundle.

#### Auto deploy with `vecel` when push on branch `master`

## Sync gitlab and github

auto sync with github and gitlab (done):

#### Sync Gitlab to Github

This one is simple. You could set up some CI/CD yourself. But Gitlab will automatically do this for you.

Go to "Settings > Repository > Mirroring repositories"

Enter your Github repo with your username in front `https://NguyenDangKhuong@github.com/NguyenDangKhuong/racroishop-management.git`

In the password field, enter your Github token

Select push (this requires a subscription)

Press Mirror repository

From now on, changes to Gitlab will be mirrored to Github

#### Sync Github to Gitlab

Add Github CI/CD:

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
          # You can store token in your project's 'Setting > Secrets' and reference the name here. Such as ${{ secrets.TARGET_TOKEN }}
        target-token: ${{ secrets.TARGET_TOKEN }}
```

**Make sure the branch you are pushing to in Gitlab is not protected or allows for force push**

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
