import type { Component } from 'vue'
import type { ModalOptions } from '../types'
import { closeModal } from './close-modal'
import { pushModal } from './push-modal'

/** Closes all active modals in the namespace and opens a new one */
export async function openModal(
  component: Component,
  props: any = {},
  options: Partial<ModalOptions> = {}
) {
  await closeModal({ namespace: options.namespace })
  return pushModal(component, props, options)
}
