// 错误处理插件

import type { FastifyPluginAsync } from 'fastify'
import { IS_DEV } from '@/constants/env'

const errorHandlerPlugin: FastifyPluginAsync = async (fastify) => {
  // 自定义错误处理函数
  fastify.setErrorHandler((error, request, reply) => {
    // 根据错误类型进行不同的处理
    if (error.validation) {
      // 处理请求验证错误
      request.log.warn(
        {
          error: error.message,
          validation: error.validation,
        },
        'Request validation error',
      )

      return reply.status(400).send({
        success: false,
        error: '请求参数验证失败',
        details: error.validation,
      })
    }

    if (error.statusCode) {
      // 处理有状态码的错误
      request.log.error(
        {
          error: error.message,
          statusCode: error.statusCode,
        },
        'API error',
      )

      return reply.status(error.statusCode).send({
        success: false,
        error: error.message,
      })
    }

    // 处理其他所有错误
    request.log.error(
      {
        error: error.message,
        stack: error.stack,
      },
      'Internal server error',
    )

    // 在开发环境下可以返回详细错误信息
    if (IS_DEV) {
      return reply.status(500).send({
        success: false,
        error: error.message,
        stack: error.stack,
      })
    }

    // 生产环境下返回通用错误信息
    return reply.status(500).send({
      success: false,
      error: '服务器内部错误，请稍后再试',
    })
  })
}

export default errorHandlerPlugin
