// 用户相关路由
import type { FastifyPluginAsync } from 'fastify'

// 定义请求和响应类型
interface IUserParams {
  id: string
}

interface IUserBody {
  name: string
  email: string
  age?: number
}

interface IUserQuery {
  page?: number
  limit?: number
}

interface IUserResponse {
  id: string
  name: string
  email: string
  age?: number
  createdAt: string
  updatedAt: string
}

const userRoute: FastifyPluginAsync = async (fastify) => {
  // 获取用户列表
  fastify.get<{
    Querystring: IUserQuery
  }>(
    '/users',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              default: 1,
              description: '页码',
            },
            limit: {
              type: 'number',
              default: 10,
              description: '每页条数',
            },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    email: { type: 'string' },
                    age: { type: 'number' },
                    createdAt: { type: 'string' },
                    updatedAt: { type: 'string' },
                  },
                },
              },
              meta: {
                type: 'object',
                properties: {
                  page: { type: 'number' },
                  limit: { type: 'number' },
                  total: { type: 'number' },
                },
              },
            },
          },
        },
      },
    },
    async (request) => {
      const { page = 1, limit = 10 } = request.query

      // 模拟数据库查询
      const users: IUserResponse[] = []

      return {
        success: true,
        data: users,
        meta: {
          page,
          limit,
          total: 0,
        },
      }
    },
  )

  // 获取单个用户
  fastify.get<{
    Params: IUserParams
  }>(
    '/users/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: '用户ID',
            },
          },
          required: ['id'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  email: { type: 'string' },
                  age: { type: 'number' },
                  createdAt: { type: 'string' },
                  updatedAt: { type: 'string' },
                },
              },
            },
          },
          404: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              error: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      // 模拟数据库查询失败
      reply.status(404).send({
        success: false,
        error: `用户 ${id} 不存在`,
      })
    },
  )

  // 创建用户
  fastify.post<{
    Body: IUserBody
  }>(
    '/users',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: '用户名',
            },
            email: {
              type: 'string',
              format: 'email',
              description: '邮箱',
            },
            age: {
              type: 'number',
              minimum: 0,
              description: '年龄',
            },
          },
          required: ['name', 'email'],
        },
        response: {
          201: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  email: { type: 'string' },
                  age: { type: 'number' },
                  createdAt: { type: 'string' },
                  updatedAt: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { name, email, age } = request.body

      // 模拟创建用户
      const newUser: IUserResponse = {
        id: `user-${Date.now()}`,
        name,
        email,
        age,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      reply.status(201).send({
        success: true,
        data: newUser,
      })
    },
  )
}

export default userRoute
