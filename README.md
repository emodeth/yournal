# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```
yournal
├─ app
│  ├─ controller
│  │  ├─ auth_controller.py
│  │  ├─ collection_controller.py
│  │  ├─ entry_controller.py
│  │  ├─ mood_controller.py
│  │  ├─ user_controller.py
│  │  └─ __init__.py
│  ├─ core
│  │  ├─ config.py
│  │  ├─ create_app.py
│  │  ├─ extensions.py
│  │  └─ __init__.py
│  ├─ models
│  │  ├─ collections.py
│  │  ├─ collection_analytics.py
│  │  ├─ entries.py
│  │  ├─ moods.py
│  │  ├─ users.py
│  │  ├─ user_analytics.py
│  │  ├─ utils.py
│  │  └─ __init__.py
│  ├─ repository
│  │  ├─ collection_repository.py
│  │  ├─ entry_repository.py
│  │  ├─ mood_repository.py
│  │  ├─ user_repository.py
│  │  └─ __init__.py
│  ├─ service
│  │  ├─ auth_service.py
│  │  ├─ collection_service.py
│  │  ├─ entry_service.py
│  │  ├─ mood_service.py
│  │  ├─ user_service.py
│  │  └─ __init__.py
│  ├─ wsgi.py
│  └─ __init__.py
├─ components.json
├─ docker-compose.yaml
├─ Dockerfile
├─ entrypoint.sh
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ requirements.txt
├─ src
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ Editor.jsx
│  │  ├─ EditorControls.jsx
│  │  ├─ EditorCover.jsx
│  │  ├─ EditorHeader.jsx
│  │  ├─ EditorTitle.jsx
│  │  ├─ Logo.jsx
│  │  ├─ MaxWidthWrapper.jsx
│  │  ├─ Navbar.jsx
│  │  └─ ui
│  │     └─ button.tsx
│  ├─ contexts
│  │  └─ EditorContext.jsx
│  ├─ index.css
│  ├─ lib
│  │  └─ utils.ts
│  ├─ main.jsx
│  └─ pages
│     ├─ Home.jsx
│     └─ Write.jsx
├─ tsconfig.json
└─ vite.config.js

```