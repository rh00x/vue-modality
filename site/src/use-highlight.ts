import { ref, watchEffect, type Ref } from 'vue'
import { createHighlighterCore, type HighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

let highlighterPromise: Promise<HighlighterCore> | null = null

function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [import('shiki/themes/github-dark-default.mjs')],
      langs: [import('shiki/langs/typescript.mjs')],
      engine: createOnigurumaEngine(import('shiki/wasm'))
    })
  }
  return highlighterPromise
}

export function useHighlight(code: Ref<string> | string) {
  const html = ref('')

  watchEffect(async () => {
    const source = typeof code === 'string' ? code : code.value
    const hl = await getHighlighter()
    html.value = hl.codeToHtml(source, {
      lang: 'typescript',
      theme: 'github-dark-default'
    })
  })

  return html
}
