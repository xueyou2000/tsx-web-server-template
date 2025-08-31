// 定义API响应的基础类型
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// 定义服务器配置类型
export interface ServerConfig {
  NODE_ENV: string
  PORT: string
  HOST: string
  LOG_LEVEL: string
  API_KEY: string
}

// 定义路由处理函数的通用类型
// biome-ignore lint/suspicious/noExplicitAny: 路由处理函数的参数类型无法确定，使用any类型
export type RouteHandler<T = any> = (request: any, reply: any) => Promise<T>
