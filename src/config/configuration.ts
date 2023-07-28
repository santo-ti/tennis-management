export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST || 'clusterstudy.gypoxeq.mongodb.net',
    name: process.env.DATABASE_NAME || 'tennis-management',
    port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
    user: process.env.DATABASE_USER || 'kalangoti',
    password: process.env.DATABASE_PASSWORD || 'jyo7QTmh0Zj70vRF',
  },
});
