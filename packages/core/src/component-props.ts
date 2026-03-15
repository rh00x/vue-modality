/** Extracts the `$props` type from a Vue component constructor, making all props optional */
export type ComponentProps<T> = T extends new (...args: unknown[]) => infer R
  ? R extends { $props: infer P }
    ? Partial<P>
    : Record<string, unknown>
  : never
