export default () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.SERVER_PORT || '3000', 10),
  databaseURL: process.env.DATABASE_URL,
})
