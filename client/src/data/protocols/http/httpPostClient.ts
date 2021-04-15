export interface HttpPostClient {
    url?: string
    post (url: string): Promise<void>
}
