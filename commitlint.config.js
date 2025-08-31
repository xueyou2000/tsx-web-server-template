// commitlint配置文件
// 用于规范git commit消息格式
/**
 * @type {import('@commitlint/types').UserConfig}
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 允许的类型
    'type-enum': [
      2,
      'always',
      [
        'build', // 构建系统或外部依赖项的更改
        'chore', // 不影响代码库含义的更改（例如构建过程或辅助工具）
        'ci', // CI配置文件和脚本的更改
        'docs', // 文档更改
        'feat', // 新功能
        'fix', // 修复bug
        'perf', // 提高性能的代码更改
        'refactor', // 既不修复bug也不添加功能的代码更改
        'revert', // 撤销之前的提交
        'style', // 不影响代码含义的更改（空白、格式化、缺少分号等）
        'test', // 添加或修正测试
      ],
    ],
    // 类型不能为空
    'type-empty': [2, 'never'],
    // 范围可以为空
    'scope-empty': [0],
    // 主题不能为空
    'subject-empty': [2, 'never'],
    // 主题以句号结尾
    'subject-full-stop': [0, 'never'],
    // 主题使用小写字母开头
    'subject-case': [2, 'always', 'lower-case'],
  },
}
