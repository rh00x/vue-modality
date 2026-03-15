import { modalStore } from '../modal'

/** Closes a modal by its ID. Throws if no modal with the given ID exists */
export async function closeById(id: number): Promise<void> {
  const modal = modalStore.get(id)
  if (!modal) throw new Error(`Modal with ID ${id} not found`)
  await modal.close()
}
