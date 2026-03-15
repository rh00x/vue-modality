# vue-modality

Modal system for Vue 3 with namespace queues, close guards, and prompt pattern.

**[Live demo →](https://rh00x.github.io/vue-modality/)**

## Packages

| Package | Description |
|---|---|
| [`@vue-modality/core`](./packages/core) | The library itself — install this in your project |

## Features

- **Namespace queues** — dialogs, toasts, and sidebars live in isolated stacks
- **Close guards** — async functions that can cancel or delay closing
- **Prompt pattern** — `await` a result directly from a modal
- **Event bus** — `on`/`emit` between the modal and its caller
- **Zero dependencies** — only `vue` as a peer dependency

## Quick start

Install from GitHub (npm release coming soon):

```sh
pnpm add https://github.com/rh00x/vue-modality
```

See [`packages/core/README.md`](./packages/core/README.md) for full API documentation.

## Development

```sh
pnpm install

# Build the library
pnpm build:core

# Start the demo site
pnpm dev:site
```

## Monorepo structure

```
packages/
  core/          # @vue-modality/core — the npm package
site/            # Demo site (Vite + Vue 3 + Tailwind CSS)
```

## License

MIT
