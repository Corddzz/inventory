import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const conn = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'password',
  database: process.env.DB_NAME || 'inventory_muidb',
  port: Number(process.env.DB_PORT) || 3307,
  waitForConnections: true,
})

export default conn
