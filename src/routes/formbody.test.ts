// formbody.test.ts
// 测试 @fastify/formbody 插件功能的路由

import type { FastifyPluginAsync } from 'fastify'

/**
 * formbody 测试路由
 * 用于验证 @fastify/formbody 插件是否正常工作
 */
const formbodyTestRoute: FastifyPluginAsync = async (fastify) => {
  // 测试表单数据解析功能
  /** 解析传统表单 curl -X POST http://127.0.0.1:3000/api/test/urlencoded-test   -H "Content-Type: application/x-www-form-urlencoded"   -d "username=john_doe"   -d "email=john.doe%40example.com"   -d "age=28"   -d "city
=Beijing" */
  /** 解析 json curl -X POST http://127.0.0.1:3000/api/test/form-test \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "age": 30, "email": "alice@example.com", "active": true, "tags": ["user", "premium"]}' */
  fastify.post(
    '/form-test',
    {
      schema: {
        description: '测试 @fastify/formbody 的表单数据解析功能',
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              formData: {
                type: 'object',
                additionalProperties: true,
              },
            },
          },
        },
      },
    },
    async (request) => {
      // 返回解析后的表单数据
      return {
        message: '表单数据解析成功',
        formData: request.body,
      }
    },
  )

  // 测试 URL 编码表单数据解析功能
  /**
   * curl -X POST http://127.0.0.1:3000/api/test/urlencoded-test \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=张%20三%40gmail.com" \
  -d "password=mypass%21%40%23%24%25%5E%26%2A" \
  -d "city=北京&country=China%20Inc." \
  -d "comment=Hello%2C%20World%21%20This%20is%20a%20test%20with%20%26%20and%20%3C%3E%7B%7D%5B%5D%7C%5C%5E%60" \
  -d "empty_field=" \
  -d "space=with+space&encoded_space=with%20space" \
  -d "array%5B0%5D=first&array%5B1%5D=second&array%5B2%5D=third" \
  -d "nested%5Buser%5D%5Bname%5D=Alice&nested%5Buser%5D%5Bage%5D=25"
   */
  fastify.post(
    '/urlencoded-test',
    {
      schema: {
        description: '测试 @fastify/formbody 的 URL 编码表单数据解析功能',
        consumes: ['application/x-www-form-urlencoded'],
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              formData: {
                type: 'object',
                additionalProperties: true,
              },
            },
          },
        },
      },
    },
    async (request) => {
      // 返回解析后的表单数据
      return {
        message: 'URL编码表单数据解析成功',
        formData: request.body,
      }
    },
  )
}

export default formbodyTestRoute
