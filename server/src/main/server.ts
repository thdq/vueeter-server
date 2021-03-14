import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5049

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})
