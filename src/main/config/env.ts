import dotenv from 'dotenv'

dotenv.config()

export default {
    POSTGRES_URL: process.env.POSTGRES_URL,
    PORT: process.env.PORT || 5049,
    JWTSECRET: process.env.JWTSECRET || '089234FKHFA.H!2LHD-2HFAC4//FWFW212EAX@4G$%C=1=='
}
