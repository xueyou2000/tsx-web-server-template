import { dirname } from 'node:path'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)
export const require = createRequire(import.meta.url)
