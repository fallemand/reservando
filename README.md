# Reservando Frontend

> This repository contains the new supplier portal, which is the tool suppliers use to add, edit and manage their inventory as well as check their invoices and manage financial matters.

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
If you have `npm` locally (faster):

```sh
npm run watch
```

---

### Working with mocks

> If you want to work without fishfarm you should enable the mocks:

**Set `useMocks` to `true`:**
Modify: `./config/config.js`:

```sh
useMocks: true,
```

Compile the app using the commands above.

---

### Testing

**Run unit tests:**

```sh
npm run test:unit
```

**Update test unit snapshots:**

```sh
npm run test:unit:update
```

---

### Useful commands

**Update translations:**

```sh
npm run build:i18n
```

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
