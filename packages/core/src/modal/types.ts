export type NamespaceKey = number | string

/**
 * Guard function for a modal.
 * Return `false` to cancel closing, `true` or `void` to allow it.
 * Supports async: `Promise<boolean>`.
 */
export type GuardFunction = () => void | boolean | Promise<boolean>

export interface ModalCloseOptions {
  namespace?: NamespaceKey
}

export interface ModalOptions {
  isRoute: boolean
  namespace: NamespaceKey
}

export type EventCallback = (v: any) => any
