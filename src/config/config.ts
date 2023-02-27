export default () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.SERVER_PORT || '3000', 10),
  databaseURL: process.env.DATABASE_URL,
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    expires: process.env.JWT_EXPIRES_TIME,
  },
  mercadoPago: {
    token: process.env.MERCADO_PAGO_TOKEN,
  },
})
