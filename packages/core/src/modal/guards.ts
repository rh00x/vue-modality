import type { GuardFunction } from './types'

type GuardFunctionPromisify = () => Promise<void>

type AvailableKeys = 'close' | 'destroy'

const store = new Map<number, Partial<Record<AvailableKeys, GuardFunction[]>>>()

/** Registry for per-modal guard functions, keyed by modal ID */
export const guardRegistry = {
  add(modalId: number, name: AvailableKeys, func: GuardFunction): void {
    let guard = store.get(modalId)
    if (!guard) {
      guard = {}
      store.set(modalId, guard)
    }

    guard[name] ??= []
    guard[name].push(func)
  },

  get(id: number, name: AvailableKeys): GuardFunction[] {
    return store.get(id)?.[name] ?? []
  },

  delete(id: number): void {
    store.delete(id)
  }
}

/** Runs an array of promisified guard functions sequentially */
export async function runGuardQueue(fns: GuardFunctionPromisify[]): Promise<void> {
  for (const fn of fns) {
    await fn()
  }
}

/** Wraps a guard function so it throws when the guard returns `false` */
export function guardToPromiseFn(guard: GuardFunction): GuardFunctionPromisify {
  return async () => {
    const result = await guard()
    if (result !== false) return
    throw new Error('Guard returned false. Close cancelled.')
  }
}
