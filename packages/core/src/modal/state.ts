import { reactive } from 'vue'
import type { ModalRecord } from './modal'
import type { NamespaceKey } from './types'

export const DEFAULT_NAMESPACE: NamespaceKey = 'default'

export interface NamespaceState {
  queue: ModalRecord[]
}

const namespaceMap = new Map<NamespaceKey, NamespaceState>()

/** Returns (or lazily creates) the reactive state for the given namespace */
export function getNamespaceState(namespace: NamespaceKey = DEFAULT_NAMESPACE): NamespaceState {
  if (!namespaceMap.has(namespace)) {
    namespaceMap.set(namespace, { queue: reactive([]) })
  }

  return namespaceMap.get(namespace)!
}

/** Returns the reactive modal queue for the given namespace */
export function getQueueByNamespace(namespace?: NamespaceKey) {
  return getNamespaceState(namespace).queue
}
