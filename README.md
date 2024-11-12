# pern-todo-app-IDWD项目整体预览

# 介绍：

- 这是个运用express、node.js、React、Postgres技术栈构建的简单todo项目
- pern 指---express、node.js、React、Postgres
- todo 指--任务列表
- app  应用
- IDWD ---Independent Development Workflow Demonstration

# 目的：

- 为这个项目构建自动化集成、CI/CD的环境、
- 运用到git、Docker、Jenkins等工具
- 实现对于DDT、独立开发实践整个项目的工作流项目示例    

## 开发部分（已完成）

> Overview Diagram   设计概况图
>
> - ![image-20241112194243183](README.assets/image-20241112194243183.png)

### 一：后端建设

> 1..Build our Server

- 通过express、node.js建构
- ![image-20241112194413151](README.assets/image-20241112194413151.png)

> 2.Create Postgres Database and Table

> 3.Connect Our Postgres Database and Server

- 连接server和Postgres

> 4.构建restful api

- post
- get
- put
- delete

> 5.Build Routes with Postgres Queries  使用 Postgres 查询构建路由

### 二、前端建设

> 1.Set Up Client Side  -创建前端

- npx create-react-app client
- ![image-20241112194439413](README.assets/image-20241112194439413.png)

> 2.创建前端组件

- Build the input Todo Component
- Build the list Todo Component
- Build the Delete Button
- Build the Edit Todo Component

