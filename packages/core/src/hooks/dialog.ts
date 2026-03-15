import type { ComponentProps } from '../component-props'
import type { ModalRecord } from '../modal/modal'
import { getQueueByNamespace } from '../modal/state'
import { openModal as openModalFn } from '../modal/methods/open-modal'
import { promptModal as promptModalFn } from '../modal/methods/prompt-modal'

export const DIALOG_NAMESPACE = 'dialog'

const dialogs = getQueueByNamespace(DIALOG_NAMESPACE)

/**
 * Composable for managing dialog modals.
 * Provides methods to open, close, and prompt dialogs within the `dialog` namespace.
 */
export function useDialog() {
  async function closeDialog(dialogId?: number): Promise<void> {
    if (typeof dialogId === 'number') {
      await dialogs.find((d) => d.id === dialogId)?.close()
      return
    }

    const reversed = [...dialogs].reverse()
    for (let i = 0; i < reversed.length; i++) {
      await reversed[i]!.close()
      // Stop before a route-bound dialog
      if (reversed[i + 1]?.isRoute) break
    }
  }

  function promptDialog<
    Result = unknown,
    C extends new (...args: unknown[]) => unknown = new (...args: unknown[]) => unknown
  >(Component: C, props?: ComponentProps<C>): Promise<Result | null> {
    return promptModalFn<Result>(Component, props, { namespace: DIALOG_NAMESPACE })
  }

  function openDialog<C extends new (...args: unknown[]) => unknown>(
    Component: C,
    props?: ComponentProps<C>
  ): Promise<ModalRecord> {
    return openModalFn(Component, props, { namespace: DIALOG_NAMESPACE })
  }

  return {
    /** Reactive list of active dialogs */
    dialogs,
    /** Opens a dialog with the given component and props */
    openDialog,
    /**
     * Closes a dialog.
     * If an ID is provided, closes that specific dialog.
     * Otherwise closes all dialogs, stopping before any route-bound dialog.
     */
    closeDialog,
    /**
     * Opens a dialog in prompt mode and waits for a result.
     * Useful for confirmation flows or data-input dialogs.
     */
    promptDialog
  }
}
