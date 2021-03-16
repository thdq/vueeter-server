import dotenv from 'dotenv'

dotenv.config()

export default {
    POSTGRES_URL: process.env.POSTGRES_URL,
    PORT: process.env.PORT || 5049
}
