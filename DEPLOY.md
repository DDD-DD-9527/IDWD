# PERN Todo App 本地部署指南

## 一、系统要求 🖥️

### Windows 环境
```bash
# 系统要求
- Windows 10/11 专业版或企业版 (64位)
- 至少 8GB RAM
- 支持虚拟化 (需开启 Hyper-V)
```

### Linux 环境
```bash
# 推荐配置
- Ubuntu 20.04 LTS 或 22.04 LTS
- 至少 4GB RAM
- 20GB 可用磁盘空间
```

## 二、必需软件版本 📦

### 1. Node.js
```bash
# Windows & Linux
Node.js: v16.20.0 LTS
npm: 8.19.4
```

### 2. PostgreSQL
```bash
# Windows & Linux
版本: 13.x
端口: 5432
```

### 3. Docker
```bash
# Windows
Docker Desktop: 4.27.0
Docker Engine: 24.0.7
Docker Compose: 2.23.3

# Linux
Docker Engine: 24.0.7
Docker Compose: 2.23.3
```

### 4. Jenkins
```bash
# Windows & Linux
Jenkins LTS: 2.426.1
Java 要求: OpenJDK 11.0.21
```

## 三、Windows 环境配置步骤 🪟

### 1. 安装基础软件
```powershell
# 1. 安装 Chocolatey (Windows 包管理器)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# 2. 安装 Node.js
choco install nodejs-lts --version=16.20.0

# 3. 安装 PostgreSQL
choco install postgresql13 --params '/Password:postgres'

# 4. 安装 Docker Desktop
choco install docker-desktop
```

### 2. 配置 Docker
```powershell
# 1. 启用 Hyper-V
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All

# 2. 启动 Docker Desktop
# 在系统托盘中右键 Docker 图标，选择 Settings
# 确保启用以下选项：
# - WSL 2
# - Expose daemon on tcp://localhost:2375
```

### 3. 安装 Jenkins
```powershell
# 1. 安装 OpenJDK 11
choco install openjdk11

# 2. 下载并安装 Jenkins
choco install jenkins-lts

# 3. 访问 Jenkins
# 浏览器打开 http://localhost:8080
```

## 四、Linux 环境配置步骤 🐧

### 1. 安装基础软件
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# 安装 PostgreSQL
sudo apt install -y postgresql-13
```

### 2. 安装 Docker
```bash
# 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 安装 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 3. 安装 Jenkins
```bash
# 安装 OpenJDK 11
sudo apt install -y openjdk-11-jdk

# 安装 Jenkins
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install -y jenkins
```

## 五、项目部署步骤 🚀

### 1. 克隆项目
```bash
git clone https://github.com/你的用户名/pern-todo-app-IDWD.git
cd pern-todo-app-IDWD
```

### 2. 配置环境变量
```bash
# 创建 .env 文件
# client/.env
REACT_APP_API_URL=http://localhost:5000

# server/.env
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=perntodo
```

### 3. 初始化数据库
```sql
-- 连接 PostgreSQL
psql -U postgres

-- 创建数据库
CREATE DATABASE perntodo;

-- 执行 SQL 脚本
\i server/database.sql
```

### 4. 启动服务
```bash
# 开发模式
## 前端
cd client
npm install
npm start

## 后端
cd server
npm install
npm run dev

# Docker 模式
docker-compose -f docker-compose.dev.yml up -d
```

### 5. Jenkins 配置
```bash
# 1. 创建新的流水线项目
# 2. 配置 Git 仓库
# 3. 配置构建触发器
# 4. 添加 Jenkinsfile
# 5. 配置邮件通知
```

## 六、测试确认 ✅

```bash
# 1. 访问前端
http://localhost:3000

# 2. 测试 API
curl http://localhost:5000/todos

# 3. 检查 Jenkins
http://localhost:8080

# 4. 验证 Docker 容器
docker ps
```
