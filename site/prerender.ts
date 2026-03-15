import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderToString } from 'vue/server-renderer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.resolve(__dirname, 'dist')

async function prerender() {
  // Читаем шаблон из билда
  const template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8')

  // Импортируем SSR-бандл (собирается предыдущим шагом)
  // @ts-expect-error — dist-ssr создаётся при билде
  const { createApp } = await import('./dist-ssr/main-ssr.js')
  const { app } = createApp()

  // Рендерим приложение в строку
  const appHtml = await renderToString(app)

  // Заменяем пустой div на пререндеренный контент
  const html = template.replace(
    '<div id="app"></div>',
    `<div id="app">${appHtml}</div>`
  )

  fs.writeFileSync(path.resolve(distPath, 'index.html'), html)
  console.log('Пререндер завершён: dist/index.html')
}

prerender().catch((err) => {
  console.error('Ошибка пререндера:', err)
  process.exit(1)
})
