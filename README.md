# ☔Rain

![Vercel](https://vercelbadge.vercel.app/api/yoshiya0503/rain)
![React](https://badges.aleen42.com/src/react.svg)
![Typescript](https://github.com/aleen42/badges/raw/master/src/typescript.svg)

simple and beautiful bluesky client for web.

<img width="1388" alt="スクリーンショット 2023-10-09 15 33 54" src="https://github.com/yoshiya0503/rain/assets/5334715/0963573d-d586-42fa-86ec-867e62851bfe">

# 🖥 Development

you only try follow.

```
yarn
yarn dev
```

# 🔖 Deployment

Now we use vercel to deploy. (hosting service for SPA)

# 🔨 Architecture

-   _only to use react and material-UI._
-   _we use <Suspense /> (react new feature) at all of api call._
-   _response data managed by zustand._
-   _we use typescript and reference types of atproto lexicons._

# ✨ Directory

-   pages -> call by react-router-dom.
-   stores -> zustand state management.
-   templates -> layout component and skeletons UI in loading.
-   components -> UI components by using MUI.
-   hooks -> separated localize data manage, and logic from components.
