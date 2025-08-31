import fs from 'node:fs'
import path from 'node:path'

/**
 * 从指定的环境文件数组中查找并返回第一个存在的文件路径
 * @param envFiles 环境文件名称数组
 * @param basePath 基础路径，环境文件相对于此路径查找
 * @returns 找到的环境文件的绝对路径，如果没有找到则返回null
 */
export function loadEnvFiles(envFiles: string[], basePath: string): string | null {
  for (const file of envFiles) {
    try {
      const fPath = path.join(basePath, file)
      // 检查文件是否存在
      fs.accessSync(fPath, fs.constants.F_OK)
      return fPath
    } catch (_e) {
      // 文件不存在，继续尝试下一个
    }
  }

  return null
}
