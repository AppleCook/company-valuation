/** @type {import('next').NextConfig} */
const nextConfig = {
  // 确保没有禁用 CSS 处理
  reactStrictMode: true,
  // 如果使用了 CSS Modules, 确保配置正确
  cssModules: true,
}

module.exports = nextConfig 