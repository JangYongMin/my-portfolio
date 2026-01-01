# 1. 빌드 스테이지
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. 실행 스테이지 (용량 최적화)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# 보안을 위해 비루트(non-root) 사용자 권한 사용
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000
CMD ["npm", "start"]