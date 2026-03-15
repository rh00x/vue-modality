import type { ComponentProps } from '../component-props'
import type { ModalRecord } from '../modal/modal'
import { getQueueByNamespace } from '../modal/state'
import { pushModal } from '../modal/methods/push-modal'
import { watch } from 'vue'

export const TOAST_NAMESPACE = 'toast'
const DURATION = 5_000

// Queue and timers are module-level singletons shared across all useToast() calls
const toasts = getQueueByNamespace(TOAST_NAMESPACE)
const timers = new Map<number, ReturnType<typeof setTimeout>>()

function removeTimer(toastId: number) {
  const timer = timers.get(toastId)
  if (!timer) return

  clearTimeout(timer)
  timers.delete(toastId)
}

function addTimer(toastId: number) {
  if (timers.has(toastId)) return
  const timer = setTimeout(() => closeToast(toastId), DURATION)
  timers.set(toastId, timer)
}

function closeToast(toastId: number) {
  removeTimer(toastId)
  const toast = toasts.find((t) => t.id === toastId)
  toast?.close().catch(() => {})
}

function closeAllToasts() {
  toasts.forEach((t) => closeToast(t.id))
}

// Sync timers with the queue — runs once at module level
watch(
  toasts,
  (nextToasts) => {
    const activeIds = new Set(nextToasts.map((t) => t.id))
    nextToasts.forEach((t) => addTimer(t.id))
    for (const id of timers.keys()) {
      if (!activeIds.has(id)) {
        removeTimer(id)
      }
    }
  },
  { immediate: true }
)

function openToast<C extends new (...args: unknown[]) => unknown>(
  Component: C,
  props?: ComponentProps<C>
): ModalRecord {
  return pushModal(Component, props, { namespace: TOAST_NAMESPACE })
}

/** Composable for managing toast notifications */
export function useToast() {
  return {
    /** Reactive list of active toasts */
    toasts,
    /** Opens a toast with a custom component */
    openToast,
    /** Closes a toast by ID */
    closeToast,
    /** Closes all active toasts */
    closeAllToasts
  }
}
