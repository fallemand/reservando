# Reservando Frontend

> Monorepo with all the reservando modules, including the frontend and the api.

## Table of content

- [Getting Started](#getting-started)
  - [Install](#install)
  - [Developing](#developing)
  - [Working with mocks](#working-with-mocks)
  - [Testing](#testing)
  - [Useful Commands](#useful-commands)
- [Deployment](#deployment)
- [Contact](#contact)

## Getting Started

#### Install

```sh
npm install
npm build
npm start
```

Browse

```
  https://localhost:3000
```

#### Developing

To compile the app while making changes, run the watcher.

```sh
npm run watch
```

---

### Working with mocks

**Set `useMocks` to `true`:**
Modify: `apps/frontend/config/config.js`:

```sh
useMocks: true,
```

---

### Testing

**Run unit tests:**

```sh
npm run test
```

**Update test unit snapshots:**

```sh
npm run test:update
```

---

### Useful commands

**Fix code lints:**

```sh
npm run lint:fix
```

---

## Deployment

TODO

## Contact

```
IT <it@reservando.club>
```
