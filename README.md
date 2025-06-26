# 📦 lendsqr-fe-test

**Lendsqr Frontend Engineering Test**

---

## 📚 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Development Guidelines](#development-guidelines)
- [Code Style](#code-style)
- [Testing](#testing)
- [API & Data](#api--data)
- [Adding Icons](#adding-icons)
- [Contributing](#contributing)
- [License](#license)

---

## 📝 Overview

This project is a Vue 3 frontend application for the **Lendsqr Engineering Test**.  
It demonstrates best practices in:

- Component architecture
- State management
- API handling
- Type safety
- UI/UX

---

## 📁 Project Structure

The application follows a modular structure with clearly separated concerns for components, composables, types, and styles.

```text
lendsqr-fe-test/
├── src/
│ ├── api/ # API composables (e.g., useFetchApi.ts)
│ ├── assets/ # Static assets (images, icons, etc.)
│ ├── components/ # Reusable Vue components
│ ├── enums/ # TypeScript enums for app data
│ ├── pages/ # Page-level Vue components
│ ├── scss/ # SCSS partials and global styles
│ ├── types/ # TypeScript type definitions
│ ├── utils/ # Utility functions (e.g., formatDate.ts)
│ └── ...
├── scripts/ # Node scripts (e.g., SVG to Vue icon generator)
├── tests/ # Unit and integration tests
├── public/ # Static public files (index.html, favicon, etc.)
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### 📦 Installation

```bash
npm install
# or
yarn install
```

### 🏃 Running the Development Server

```bash
npm run dev
# or
yarn dev
```

The app will be available at:  
👉 `http://localhost:5173`

---

## ⚙️ Scripts

| Command                      | Description                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `npm run dev`                | Start the development server                                                     |
| `npm run build`              | Build the app for production                                                     |
| `npm run preview`            | Preview the production build                                                     |
| `npm run test`               | Run unit tests with Vitest                                                       |
| `npm run generate-vue-icons` | Convert SVGs in `/src/assets/icons` to Vue components in `/src/assets/vue-icons` |

---

## 🛠️ Development Guidelines

- **Component Structure**: This project uses Vue 3 Single File Components (SFCs).
- **Type Safety**: All logic, props, and data structures uses TypeScript.
- **State Management**: Composables and stores are used shared state and data fetching.
- **API Calls**: The `useFetchApi` composable is used for all HTTP interactions.
- **Enums & Types**: Enums are defined in the `src/enums` directory and types in the `types` directory.
- **SCSS**: SCSS modules are used for component styles. Global partials and variables live in the `src/scss` directory.

---

## 🎨 Code Style

- **Linting**: ESLint and Prettier are used for formatting the code.
- **Naming**:
  - PascalCase for components, types and enums
  - camelCase for variables, composables and util functions
- **Imports**: The `@` alias is used to import from `src/`.
- **SCSS**: Partials are imported with the `@use` rule for modular styles.

---

## 🧪 Testing

- **Unit Tests**: Located in `src/tests`, written with [Vitest](https://vitest.dev).
- **Test Coverage**: Ensure all utilities and composables have unit tests.

```bash
npm run test
# or
yarn test
```

---

## 🔌 API & Data

- Use the `useFetchApi` composable for all HTTP requests (`GET`, `POST`, `PUT`, `DELETE`).
- The composable handles error states and loading indicators.
- Mock user data is available in `scripts/users.json` for testing and development.
- Generate the mock data by running the `scripts/generateRandomData.js` file:

```bash
node scripts/generateRandomData.js
```

---

## 🖼️ Adding Icons

1. Place your `.svg` files in the `/icons` directory at the project root.
2. Run:

   ```bash
   npm run generate-vue-icons
   ```

3. This will convert all SVGs to Vue components in `src/assets/icons/`, appending "Icon" to its name. For example:

   ```text
   active-user.svg // ActiveUserIcon.vue
   ```

4. Import and use the generated components in your `.vue` files as needed.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## Cheers 🍷

IBEABUCHI PAUL CHUKWNARU
