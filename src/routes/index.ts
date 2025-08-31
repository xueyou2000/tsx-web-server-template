// 主路由模块，用于注册所有路由
import type { FastifyPluginAsync } from 'fastify'
import formbodyTestRoute from './formbody.test'
import pingRoute from './ping'
import sensibleTestRoute from './sensible.test'
import uploadRoute from './upload'
import userRoute from './user'

const routes: FastifyPluginAsync = async (fastify) => {
  // 注册 ping 路由
  await fastify.register(pingRoute, { prefix: '/api' })

  // 注册用户路由
  await fastify.register(userRoute, { prefix: '/api' })

  // 注册 sensible 测试路由
  await fastify.register(sensibleTestRoute, { prefix: '/api/test' })

  // 注册 formbody 测试路由
  await fastify.register(formbodyTestRoute, { prefix: '/api/test' })

  // 注册文件上传路由
  await fastify.register(uploadRoute, { prefix: '/api' })
}

export default routes
