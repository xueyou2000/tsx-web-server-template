# TypeScript ESM 项目模板

一个现代化的基于 ESM (ES Module) 的 TypeScript 项目模板，使用最新的前端开发工具和最佳实践。

## 🚀 特性

- **TypeScript** - 静态类型检查
- **ESM** - 现代 ES 模块系统
- **pnpm** - 高性能包管理器
- **tsx** - 快速运行 TypeScript 源码
- **dotenv** - 环境变量管理
- **Biome** - 快速代码格式化和检查工具（替代 ESLint + Prettier）
- **commitlint + husky** - Git 提交规范和钩子

## 📁 项目结构

```
├── src/                # 源代码目录
│   ├── index.ts        # 主入口文件
│   └── utils/          # 工具函数
│       └── logger.ts   # 日志工具
├── .gitignore          # Git 忽略文件配置
├── tsconfig.json       # TypeScript 配置
├── biome.json          # Biome 配置
├── commitlint.config.js # Commitlint 配置
├── .huskyrc.json       # Husky 配置
├── .env.example        # 环境变量示例文件
├── package.json        # 项目配置和依赖
└── README.md           # 项目说明文档
```

## 🛠️ 快速开始

### 前提条件

- 安装 [Node.js](https://nodejs.org/) (v16+)
- 安装 [pnpm](https://pnpm.io/) (v7+)

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建项目

```bash
pnpm build
```

### 运行构建后的项目

```bash
pnpm start
```

### 代码检查

```bash
pnpm lint
```

### 代码格式化

```bash
pnpm format
```

## ⚙️ 配置说明

### TypeScript 配置

项目使用了严格的 TypeScript 配置，启用了所有严格类型检查选项。详细配置请查看 `tsconfig.json` 文件。

### 环境变量

创建 `.env` 文件，并根据 `.env.example` 文件设置必要的环境变量。

### 提交规范

项目使用 commitlint 规范 Git 提交消息，支持的类型包括：

- `build`: 构建系统或外部依赖项的更改
- `chore`: 不影响代码库含义的更改
- `ci`: CI 配置文件和脚本的更改
- `docs`: 文档更改
- `feat`: 新功能
- `fix`: 修复 bug
- `perf`: 提高性能的代码更改
- `refactor`: 既不修复 bug 也不添加功能的代码更改
- `revert`: 撤销之前的提交
- `style`: 不影响代码含义的更改
- `test`: 添加或修正测试

## 📝 注意事项

- 项目使用 ESM (ES Module)，请确保使用 `import/export` 语法
- 所有源代码都应该放在 `src` 目录下
- 构建后的代码会输出到 `dist` 目录

## 📄 许可证

本项目使用 ISC 许可证。
