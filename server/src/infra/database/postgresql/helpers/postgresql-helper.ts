import PgMock2 from 'pgmock2'
import { IPGClient } from 'pgmock2/lib/interfaces'

export const PostgreSQLHelper = {
    client: new PgMock2(),
    
    async connect (): Promise<IPGClient> {
        return await this.client.connect()
        
    },
    
    async disconnect (): Promise<void> {
        await this.client.end()
    }
}
