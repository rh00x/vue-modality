# @vue-modality/core

Modal system for Vue 3 with namespace queues, close guards, and prompt pattern.

- **Namespace queues** — dialogs, toasts, and sidebars live in isolated stacks
- **Close guards** — async functions that can cancel or delay closing
- **Prompt pattern** — `await` a result directly from a modal
- **Event bus** — `on`/`emit` between the modal and its caller
- **Zero dependencies** — only `vue` as a peer dependency

## Installation

```sh
pnpm add https://github.com/rh00x/vue-modality
```

## Setup

Mount the renderers once in your root component. They subscribe to the reactive queues and render whatever is currently in them.

```vue
<!-- App.vue -->
<template>
  <RouterView />

  <DialogRenderer />
  <ToastRenderer />
  <SidebarRenderer />
</template>
```

A renderer is just a component that reads the queue and renders `<component :is="...">`. Here is a minimal example:

```vue
<!-- DialogRenderer.vue -->
<script setup lang="ts">
import { useDialog } from '@vue-modality/core'

const { dialogs } = useDialog()
</script>

<template>
  <Teleport to="body">
    <div v-if="dialogs.length" class="overlay" @click.self="dialogs.at(-1)?.close()">
      <component
        v-for="dialog in dialogs"
        :key="dialog.id"
        :is="dialog.component"
        v-bind="dialog.props.value"
        :modal="dialog"
        @close="dialog.close()"
      />
    </div>
  </Teleport>
</template>
```

## Usage

### Dialog

```ts
import { useDialog } from '@vue-modality/core'

const { openDialog, closeDialog, promptDialog, dialogs } = useDialog()

// Open — closes any existing dialogs first
await openDialog(MyDialog, { title: 'Hello' })

// Close the topmost dialog
await closeDialog()

// Close a specific dialog by ID
await closeDialog(dialog.id)
```

### Prompt

Open a dialog and wait for a typed result. The modal resolves by calling `props.modal.emit(MODAL_EVENT_PROMPT, value)`.

```ts
import { useDialog, MODAL_EVENT_PROMPT } from '@vue-modality/core'

const { promptDialog } = useDialog()

const result = await promptDialog<string>(ConfirmDialog, { message: 'Are you sure?' })
// result is the value passed to MODAL_EVENT_PROMPT, or null if closed without a result
```

Inside the modal component:

```vue
<script setup lang="ts">
import { MODAL_EVENT_PROMPT, type ModalRecord } from '@vue-modality/core'

const props = defineProps<{ modal: ModalRecord }>()

function confirm() {
  props.modal.emit(MODAL_EVENT_PROMPT, 'confirmed')
}
</script>
```

### Toast

```ts
import { useToast } from '@vue-modality/core'

const { openToast, closeToast, closeAllToasts, toasts } = useToast()

// Toasts auto-close after 5 seconds
openToast(MyToast, { message: 'Saved!', type: 'success' })
```

### Sidebar

```ts
import { useSidebarPanel } from '@vue-modality/core'

const { openSidebar, closeSidebar, sidebar } = useSidebarPanel()

await openSidebar(MyPanel, { userId: 42 })
```

### Close guards

A close guard is an async function registered on a modal. If it returns `false` (or throws), the close is cancelled.

```ts
import { useDialog } from '@vue-modality/core'

const { openDialog } = useDialog()

const dialog = await openDialog(EditDialog)

dialog.addCloseGuard(async () => {
  const confirmed = await confirm('Discard changes?')
  return confirmed // false cancels close
})
```

### Stack (push / pop)

Use `pushModal` / `popModal` directly to manage a stack without closing other modals.

```ts
import { pushModal, popModal } from '@vue-modality/core'

// Push on top of the current stack
const modal = pushModal(MyModal, { step: 1 }, { namespace: 'dialog' })

// Close only the topmost modal
await popModal({ namespace: 'dialog' })
```

### Event bus

```ts
import { pushModal } from '@vue-modality/core'

const modal = pushModal(MyModal, {})

// Caller subscribes
const unsubscribe = modal.on('result', (value) => {
  console.log('Got:', value)
})

// Inside the modal component
props.modal.emit('result', { foo: 'bar' })
```

### Low-level API

```ts
import {
  openModal,   // close all + push
  pushModal,   // push without closing
  popModal,    // close topmost
  closeModal,  // close all in namespace
  closeById,   // close by modal ID
  getCurrentModal,      // get topmost modal
  getQueueByNamespace,  // get raw reactive queue
} from '@vue-modality/core'
```

## Namespaces

Every hook uses its own namespace constant:

| Hook | Namespace constant | Default value |
|---|---|---|
| `useDialog` | `DIALOG_NAMESPACE` | `'dialog'` |
| `useToast` | `TOAST_NAMESPACE` | `'toast'` |
| `useSidebarPanel` | `SIDEBAR_NAMESPACE` | `'sidebar'` |

You can create custom namespaces by passing `{ namespace: 'my-namespace' }` to any low-level method.

## Types

```ts
import type {
  ModalRecord,       // the modal instance object
  ModalID,           // number alias
  ModalOptions,      // { namespace, isRoute }
  ModalCloseOptions, // { namespace }
  GuardFunction,     // () => void | boolean | Promise<boolean>
  NamespaceKey,      // string | number
  ComponentProps,    // extracts $props type from a component constructor
} from '@vue-modality/core'
```

### `ModalRecord`

```ts
interface ModalRecord {
  readonly id: ModalID
  readonly component: Component
  readonly namespace: NamespaceKey
  readonly isRoute: boolean
  readonly closed: Ref<boolean>
  props: Ref<any>

  close(): Promise<void>
  emit(eventName: string, data?: unknown): void
  on<T>(eventName: string, callback: (v: T) => void): () => void
  addCloseGuard(fn: GuardFunction): void
  addDestroyGuard(fn: () => void): void
}
```

## License

MIT
