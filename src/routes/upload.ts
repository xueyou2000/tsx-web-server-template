import fastifyMultipart from '@fastify/multipart'
import type { FastifyPluginAsync } from 'fastify'

/**
 * 注册 multipart 插件并创建文件上传路由
 * @param fastify Fastify 实例
 * @param opts 插件选项
 */
const uploadRoute: FastifyPluginAsync = async (fastify, opts) => {
  // 注册 multipart 插件
  fastify.register(fastifyMultipart, {
    limits: {
      fileSize: 10485760, // 10MB 文件大小限制
      // fieldSize: 1048576, // 字段大小限制
      // fields: 10,        // 字段数量限制
      // files: 1,          // 文件数量限制
    },
    // 添加自定义处理逻辑 (可选)
    // onFile: (fieldName, stream, filename, encoding, mimetype) => {
    //   // 可以在这里进行文件名验证、类型检查等
    // }
  })

  // 创建文件上传路由
  /**
   * curl -X POST http://localhost:3000/api/upload -H "Content-Type: multipart/form-data" -F "file=@test-upload.txt"
   */
  fastify.post(
    '/upload',
    {
      schema: {
        description: '测试 @fastify/multipart 的文件上传功能',
        consumes: ['multipart/form-data'],
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              filename: { type: 'string' },
              mimetype: { type: 'string' },
              content: { type: 'string' },
            },
          },
          400: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    async (req, reply) => {
      // 获取上传的文件
      const data = await req.file()

      if (!data) {
        return reply.status(400).send({ error: 'No file uploaded' })
      }

      // 读取文件内容
      const fileContent = await data.toBuffer()

      // 返回成功响应
      return reply.send({
        message: 'File uploaded successfully',
        filename: data.filename,
        mimetype: data.mimetype,
        size: fileContent.length,
        content: fileContent.toString(),
      })
    },
  )
}

export default uploadRoute
