import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fp from 'fastify-plugin'

/**
 * Fastify Swagger 插件配置
 * 用于自动生成符合 Swagger（OpenAPI v2 或 v3）规范的文档
 */
export default fp(async (fastify, _opts) => {
  // 注册 Swagger 插件
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Fastify API',
        description: 'API documentation for Fastify application',
        version: '1.0.0',
      },
      servers: [{ url: 'http://localhost:3000' }],
      openapi: '3.0.3', // 明确指定 OpenAPI 版本
    },
  })

  // 注册 Swagger UI 插件
  await fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      deepLinking: false,
      docExpansion: 'full',
    },
    staticCSP: false, // 禁用静态CSP以允许Swagger UI连接到API端点
    transformSpecificationClone: true,
  })
})
