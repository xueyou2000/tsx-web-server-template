#!/usr/bin/env tsx
// 导入Fastify
import fastify from 'fastify'
import { LOG_CONFIG } from './constants'
// 导入插件
import configPlugin from './plugins/config'
import errorHandlerPlugin from './plugins/errorHandler'
import formbody from '@fastify/formbody'
import loggerPlugin from './plugins/logger'
import sensible from '@fastify/sensible'
import swaggerPlugin from './plugins/swagger'
import cors from '@fastify/cors'
// 导入路由
import routes from './routes'

// 添加全局未捕获异常处理
process.on('uncaughtException', (error) => {
  console.error('❌ 未捕获的异常:', error)
  process.exit(1)
})

// 添加全局未处理的Promise拒绝处理
process.on('unhandledRejection', (reason, _promise) => {
  console.error('❌ 未处理的Promise拒绝:', reason)
  process.exit(1)
})

/**
 * 主函数，项目入口点
 * 创建并启动Fastify服务器
 */
async function main(): Promise<void> {
  try {
    // 创建Fastify服务器实例
    const server = fastify({
      logger: LOG_CONFIG,
      // 启用优雅关闭
      forceCloseConnections: true,
    })

    // 当进程收到终止信号时，优雅关闭服务器
    const signals = ['SIGINT', 'SIGTERM']
    signals.forEach((signal) => {
      process.on(signal, async () => {
        server.log.info(`收到信号 ${signal}，正在关闭服务器...`)
        try {
          await server.close()
          server.log.info('服务器已成功关闭')
          process.exit(0)
        } catch (err) {
          server.log.error({ err }, '服务器关闭失败')
          process.exit(1)
        }
      })
    })

    // 注册配置插件
    await server.register(configPlugin)

    // 注册日志插件
    await server.register(loggerPlugin)

    // 注册错误处理插件
    await server.register(errorHandlerPlugin)

    // 注册@fastify/sensible插件
    await server.register(sensible)

    // 注册@fastify/formbody插件
    await server.register(formbody)

    // 注册CORS插件
    await server.register(cors, {
      origin: true, // 允许所有来源
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的HTTP方法
      allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
      credentials: true, // 允许携带凭证
    })

    // 注册Swagger插件
    await server.register(swaggerPlugin)

    // 注册所有路由
    await server.register(routes)

    // 启动服务器
    const start = async () => {
      try {
        // 使用@fastify/env提供的配置
        const port = Number.parseInt(server.config.PORT || '3000', 10)
        await server.listen({
          port,
          host: server.config.HOST,
        })
        server.log.info(`🚀 服务器启动成功: http://${server.config.HOST}:${port}`)
      } catch (err) {
        server.log.error({ err }, '❌ 服务器启动失败:')
        process.exit(1)
      }
    }

    // 启动服务器
    await start()
  } catch (error) {
    // 确保错误被完整记录
    console.error(
      {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
      },
      '❌ 应用程序启动失败:',
    )
    // 延迟退出，确保日志能够完全写入
    setTimeout(() => {
      process.exit(1)
    }, 100)
  }
}

// 执行主函数
main()
