# Rain

simple and beautiful bluesky client for web.

<img width="1388" alt="スクリーンショット 2023-10-09 15 33 54" src="https://github.com/yoshiya0503/rain/assets/5334715/0963573d-d586-42fa-86ec-867e62851bfe">

# Development
you only try follow.

```
yarn
yarn dev
```

# Deployment

Now we use vercel to deploy. (hosting service for SPA)

# Architecture

-   only to use react and material-UI.
-   we use <Suspense /> (react new feature) at all of api call.
-   response data managed by zustand.
-   we use typescript and reference types of atproto lexicons.

# Directory

-   pages -> call by react-router-dom.
-   stores -> zustand state management.
-   templates -> layout component and skeletons UI in loading.
-   components -> UI components by using MUI.
-   hooks -> separated localize data manage, and logic from components.
