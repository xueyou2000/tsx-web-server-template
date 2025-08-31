// 定义ping路由的请求和响应schema
import type { FastifySchema } from 'fastify'

// GET /ping 路由的schema
export const pingGetSchema: FastifySchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          description: '请求是否成功',
        },
        data: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: '响应消息',
            },
            timestamp: {
              type: 'number',
              description: '当前时间戳',
            },
          },
        },
      },
    },
  },
}
