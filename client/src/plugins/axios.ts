import { AxiosRequestConfig, AxiosError } from 'axios'
import { Context } from '@nuxt/types'

export default function ({ $axios, redirect }: Context) {
    $axios.onRequest((config: AxiosRequestConfig) => {
        console.log('Making request to ' + config.url)
    })

    $axios.onError((error: AxiosError) => {

        if (error.response?.status === 400) {
            console.log(error.response.data)
        }
    })
}
