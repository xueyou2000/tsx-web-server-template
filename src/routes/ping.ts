// ping 路由模块
import type { FastifyPluginAsync } from 'fastify'
import { pingGetSchema } from '../schemas/ping'

const pingRoute: FastifyPluginAsync = async (fastify) => {
  // GET /ping 路由
  fastify.get(
    '/ping',
    {
      schema: pingGetSchema,
    },
    async (_request) => {
      // 返回成功响应
      return {
        success: true,
        data: {
          message: 'pong',
          timestamp: Date.now(),
        },
      }
    },
  )

  // GET /ping/:name 路由，展示路径参数
  fastify.get<{
    Params: { name: string }
  }>(
    '/ping/:name',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: '用户名',
            },
          },
          required: ['name'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                  timestamp: { type: 'number' },
                },
              },
            },
          },
        },
      },
    },
    async (request, _reply) => {
      const { name } = request.params

      return {
        success: true,
        data: {
          message: `pong ${name}`,
          timestamp: Date.now(),
        },
      }
    },
  )
}

export default pingRoute
