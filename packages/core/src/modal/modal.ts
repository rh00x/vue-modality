import { reactive, ref, type Component, type Ref } from 'vue'
import { guardRegistry, guardToPromiseFn, runGuardQueue } from './guards'
import { DEFAULT_NAMESPACE, getNamespaceState } from './state'
import type { EventCallback, GuardFunction, ModalOptions, NamespaceKey } from './types'

export type ModalID = number

/** Event name used by `promptModal` to receive a result value from the modal component */
export const MODAL_EVENT_PROMPT = 'modal:prompt'

/** Global store of all active modal records, keyed by modal ID */
export const modalStore = new Map<ModalID, ModalRecord>()

let idCounter = 0

export interface ModalRecord {
  readonly id: ModalID
  readonly component: Component
  readonly namespace: NamespaceKey
  readonly isRoute: boolean
  readonly closed: Ref<boolean>
  props: Ref<any>
  readonly events: Record<string, EventCallback[]>
  /** Closes the modal, running all registered close guards first */
  close(): Promise<void>
  /** Emits an event on the modal's internal event bus */
  emit(eventName: string, data?: unknown): void
  /** Subscribes to an event on the modal's internal event bus. Returns an unsubscribe function */
  on<T = unknown>(eventName: string, callback: (v: T) => void): () => void
  /** Registers a guard function that can cancel or delay closing */
  addCloseGuard(fn: GuardFunction): void
  /** Registers a callback invoked after the modal is fully destroyed */
  addDestroyGuard(fn: () => void): void
}

/** Creates a new modal record without mounting it into any queue */
export function createModal(
  component: Component,
  props: any,
  options: Partial<ModalOptions> = {}
): ModalRecord {
  const id = idCounter++
  const namespace = options.namespace ?? DEFAULT_NAMESPACE
  const isRoute = options.isRoute ?? false

  let closing = false

  const propsRef = ref(props)
  const events = reactive<Record<string, EventCallback[]>>({})
  const closed = ref(false)

  const modal: ModalRecord = {
    id,
    component,
    namespace,
    isRoute,
    props: propsRef,
    events,
    closed,

    async close(): Promise<void> {
      // Already closed or close in progress
      if (closing || closed.value) return
      closing = true

      const queue = getNamespaceState(namespace).queue
      const guardFns = guardRegistry.get(id, 'close').map((guard) => guardToPromiseFn(guard))

      try {
        await runGuardQueue(guardFns)
      } catch (error) {
        // Guard rejected the close — reset the flag so the user can retry
        closing = false
        throw error
      }

      // Re-find the index: the queue may have changed during async guards
      const current = queue.findIndex((m) => m.id === id)
      if (current !== -1) {
        queue.splice(current, 1)
      }

      closed.value = true

      for (const runnable of guardRegistry.get(id, 'destroy')) {
        try {
          runnable()
        } catch (error) {
          console.warn('Error running modal destroy guard', error)
        }
      }

      guardRegistry.delete(id)
      modalStore.delete(id)

      for (const key in events) {
        delete events[key]
      }
    },

    emit(eventName: string, data?: unknown): void {
      const handlers = events[eventName]
      if (!handlers) return
      for (const handler of [...handlers]) {
        handler(data)
      }
    },

    on<T = unknown>(eventName: string, callback: (v: T) => void): () => void {
      let handlers = events[eventName]
      if (!Array.isArray(handlers)) {
        handlers = []
        events[eventName] = handlers
      }

      handlers.push(callback as EventCallback)

      return () => {
        const arr = events[eventName]
        if (!arr) return

        const i = arr.indexOf(callback)
        if (i !== -1) {
          arr.splice(i, 1)
        }
      }
    },

    addCloseGuard(fn: GuardFunction): void {
      guardRegistry.add(id, 'close', fn)
    },

    addDestroyGuard(fn: () => void): void {
      guardRegistry.add(id, 'destroy', fn)
    }
  }

  return modal
}
