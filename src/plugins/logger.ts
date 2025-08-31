// 日志增强插件
import type { FastifyPluginAsync } from 'fastify'

const loggerPlugin: FastifyPluginAsync = async (fastify) => {
  // 增强日志功能，可以在这里添加自定义的日志格式化逻辑
  fastify.addHook('preHandler', async (request) => {
    // 记录请求信息
    request.log.info(
      {
        path: request.url,
        method: request.method,
        headers: request.headers,
        query: request.query,
        params: request.params,
      },
      'Request received',
    )
  })

  fastify.addHook('onSend', async (request, reply) => {
    // 记录响应信息
    request.log.info(
      {
        path: request.url,
        method: request.method,
        statusCode: reply.statusCode,
      },
      'Response sent',
    )
  })
}

export default loggerPlugin
