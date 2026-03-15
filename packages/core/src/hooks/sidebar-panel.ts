import type { ComponentProps } from '../component-props'
import { getQueueByNamespace } from '../modal/state'
import { openModal } from '../modal/methods/open-modal'
import { computed } from 'vue'

export const SIDEBAR_NAMESPACE = 'sidebar'

const sidebars = getQueueByNamespace(SIDEBAR_NAMESPACE)
const sidebar = computed(() => sidebars.at(-1))

/**
 * Composable for managing sidebar panels.
 * Provides methods to open and close sidebars within the `sidebar` namespace.
 */
export function useSidebarPanel() {
  function openSidebar<C extends new (...args: unknown[]) => unknown>(
    Component: C,
    props?: ComponentProps<C>
  ) {
    return openModal(Component, props, { namespace: SIDEBAR_NAMESPACE })
  }

  async function closeSidebar(): Promise<void> {
    if (!sidebar.value) return
    await sidebar.value.close()
  }

  return {
    /** Reactive list of active sidebars */
    sidebars,
    /** The topmost (currently active) sidebar */
    sidebar,
    /** Opens a component inside a sidebar panel */
    openSidebar,
    /** Closes the current sidebar */
    closeSidebar
  }
}
