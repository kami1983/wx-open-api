# 使用较小的基础镜像
FROM node:16-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 运行 TypeScript 编译器
RUN npm run build

# 暴露端口 3000
EXPOSE 6010

# 启动应用
CMD ["npm", "start"]
