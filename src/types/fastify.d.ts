// 扩展Fastify类型定义
import 'fastify'
import type { ServerConfig } from './common'

// 扩展Fastify实例类型，添加config属性和env属性
declare module 'fastify' {
  interface FastifyInstance {
    config: ServerConfig
  }
}
