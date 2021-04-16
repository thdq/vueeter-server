import { PrismaClientKnownRequestError } from "@prisma/client/runtime"

export const UniqueConstraintFailed = (code: string, field: string): PrismaClientKnownRequestError => {
    
    return new PrismaClientKnownRequestError(`Unique constraint failed on the field: ${field}`, code, "", { target: [field] })
    
}
