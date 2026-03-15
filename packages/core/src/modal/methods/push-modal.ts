import { markRaw, type Component } from 'vue'
import { createModal, modalStore } from '../modal'
import { getNamespaceState } from '../state'
import type { ModalOptions } from '../types'

/** Pushes a new modal on top of the current stack. Use `popModal` to close it */
export function pushModal(
  component: Component,
  props: any = {},
  options: Partial<ModalOptions> = {}
) {
  const ns = getNamespaceState(options.namespace)
  const modal = createModal(component, props, options)

  // markRaw prevents Vue from making the modal record itself reactive
  // (individual Ref fields inside remain reactive as intended)
  ns.queue.push(markRaw(modal))

  // Register in modalStore only after the modal has been successfully queued
  modalStore.set(modal.id, modal)

  return modal
}
