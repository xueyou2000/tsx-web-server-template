// 配置管理插件

import path from 'node:path'
import env from '@fastify/env'
import type { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'

import { __dirname, IS_DEV, NODE_ENV } from '@/constants'
import { loadEnvFiles } from '@/utils/fs-utils'

const configPlugin: FastifyPluginAsync = async (fastify) => {
  // 定义环境变量的schema验证
  const schema = {
    type: 'object',
    required: [],
    properties: {
      NODE_ENV: {
        type: 'string',
        default: 'development',
        enum: ['development', 'production', 'test'],
      },
      PORT: {
        type: 'string',
        default: '3000',
      },
      HOST: {
        type: 'string',
        default: '0.0.0.0',
      },
      LOG_LEVEL: {
        type: 'string',
        default: 'info',
        enum: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'],
      },
      API_KEY: {
        type: 'string',
        default: '',
      },
    },
  }

  fastify.log.info(`Current environment: ${NODE_ENV}`)

  const basePath = path.join(__dirname, '../../')
  // 定义要尝试加载的文件列表（优先级从高到低）
  const envFiles = [
    `.env.${NODE_ENV}.local`, // 特定环境的本地覆盖
    `.env.${NODE_ENV}`, // 特定环境的配置
    '.env.local', // 本地通用配置
    '.env', // 默认配置
  ]

  // 测试异常情况
  // throw new Error('测试异常')

  // 找到第一个存在的环境文件
  const envFile = loadEnvFiles(envFiles, basePath)
  if (envFile) {
    fastify.log.info(`Loaded environment file: ${envFile}`)
  } else {
    const errorMsg = `No environment configuration files found. Tried: ${envFiles.join(', ')}`
    fastify.log.error(errorMsg)
    throw new Error(errorMsg)
  }

  // 注册@fastify/env插件
  await fastify.register(env, {
    // 允许在环境变量中使用默认值
    dotenv: {
      path: envFile,
      debug: IS_DEV,
    },
    // 插件将配置挂载到 fastify.config
    confKey: 'config',
    // 使用之前定义的schema进行验证
    schema,
  })
}

// 使用fastify-plugin包装插件，确保装饰器在多个注册中只应用一次
export default fp(configPlugin, { name: 'config-plugin' })
