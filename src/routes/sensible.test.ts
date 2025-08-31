// sensible.test.ts
// 测试 @fastify/sensible 插件功能的路由

import type { FastifyPluginAsync } from 'fastify'

/**
 * sensible 测试路由
 * 用于验证 @fastify/sensible 插件是否正常工作
 */
const sensibleTestRoute: FastifyPluginAsync = async (fastify) => {
  // 测试 httpErrors 功能
  fastify.get(
    '/error-test',
    {
      schema: {
        description: '测试 @fastify/sensible 的 httpErrors 功能',
        response: {
          400: {
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              error: { type: 'string' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (_req, reply) => {
      // 使用 sensible 提供的 httpErrors 工具函数
      // fastify.httpErrors.badRequest 等价 reply.badRequest
      return reply.badRequest('这是一个测试错误')
    },
  )

  fastify.get(
    '/not-found',
    {
      schema: {
        description: '测试 @fastify/sensible 的 notFound 功能',
      },
    },
    async (_req, reply) => {
      return reply.notFound()
    },
  )
}

export default sensibleTestRoute
