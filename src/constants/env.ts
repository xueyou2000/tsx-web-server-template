import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

/**
 * 是否开发环境
 */
export const IS_DEV = process.env.NODE_ENV === 'development'

/**
 * 当前启动环境
 */
export const NODE_ENV = process.env.NODE_ENV || 'development'
