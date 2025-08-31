// 主路由模块，用于注册所有路由
import type { FastifyPluginAsync } from 'fastify'
import pingRoute from './ping'
import userRoute from './user'

const routes: FastifyPluginAsync = async (fastify) => {
  // 注册 ping 路由
  await fastify.register(pingRoute, { prefix: '/api' })

  // 注册用户路由
  await fastify.register(userRoute, { prefix: '/api' })

  // 可以在这里注册更多的路由模块
  // await fastify.register(productRoute, { prefix: '/api/products' });
}

export default routes
