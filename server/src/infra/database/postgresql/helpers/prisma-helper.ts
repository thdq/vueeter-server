import { PrismaClient } from "@prisma/client"

export const PrismaHelper = {
    client: new PrismaClient(),
    
    async disconnect (): Promise<void> {
        await this.client.disconnect()
    }
    
}
