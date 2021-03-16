import dotenv from 'dotenv'
import app from './config/app'

dotenv.config()

const PORT = process.env.PORT || 5049

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})
