import app from './config/app'
import env from './config/env'

const PORT = env.PORT

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})
