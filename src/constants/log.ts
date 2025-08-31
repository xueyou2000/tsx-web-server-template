import type { PinoLoggerOptions } from 'fastify/types/logger'

/**
 * 日志配置
 */
export const LOG_CONFIG = {
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    targets: [
      // 控制台输出（保持原有格式）
      {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
        level: process.env.LOG_LEVEL || 'info',
      },
      // 文件输出（带日期分割）
      {
        target: 'pino-roll',
        options: {
          // 文件路径模板，包含日期和.log后缀
          file: './logs/app-',
          // 每天凌晨0点生成新文件
          frequency: 'daily',
          // 保留7天的日志文件
          daysToKeep: 7,
          // 使用UTC时间
          utc: false,
          mkdir: true,
          // 可选：指定日期格式
          dateFormat: 'yyyy-MM-dd',
          // 可选：最大文件大小（如果同时设置大小和日期，满足任一条件即滚动）
          // size: '10M' // 例如：10MB
        },
        level: process.env.LOG_LEVEL || 'info',
      },
    ],
  },
} as PinoLoggerOptions
