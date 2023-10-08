import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useUser } from './useUser'
import { useSnackbar } from './useSnackbar'
import { env } from 'src/constants'

export const useApi = () => {
    const { user } = useUser()
    const { createSnack } = useSnackbar()

    const authConfig: AxiosRequestConfig = {
        headers: {
            'Authorization': 'Bearer ' + user?.accessToken
        }
    }

    const successCallback = (response: AxiosResponse<any, any>) => (
        response.data
    )
    
    const errorCallback = (error: any) => {
        console.error(error)

        const errorMsg = error?.response?.data?.message || 'Um erro inesperado aconteceu, tente novamente' 
        createSnack(errorMsg, 'error')

        return Promise.reject(error)
    }

    const get = (url: string, useAuth = true) => {
        return axios.get(`${env.dataApiUrl}${url}`, useAuth ? authConfig : undefined)
            .then(successCallback)
            .catch(errorCallback)
    }

    const getFile = (url: string, useAuth = true) => {
        const headers = useAuth ? authConfig.headers : {}

        const config: AxiosRequestConfig = {
            ...headers,
            responseType: 'arraybuffer'
        }

        return axios.get(`${env.dataApiUrl}${url}`, config)
            .then(successCallback)
            .catch(errorCallback)
    }

    const post = (url: string, payload: any, useAuth = true) => {
        return axios.post(`${env.dataApiUrl}${url}`, payload, useAuth ? authConfig : undefined)
            .then(successCallback)
            .catch(errorCallback)
    }

    const patch = (url: string, payload: any, useAuth = true) => {
        return axios.patch(`${env.dataApiUrl}${url}`, payload, useAuth ? authConfig : undefined)
            .then(successCallback)
            .catch(errorCallback)
    }

    const put = (url: string, payload: any, useAuth = true) => {
        return axios.put(`${env.dataApiUrl}${url}`, payload, useAuth ? authConfig : undefined)
            .then(successCallback)
            .catch(errorCallback)
    }

    const del = (url: string, useAuth = true) => {
        return axios.delete(`${env.dataApiUrl}${url}`, useAuth ? authConfig : undefined)
            .then(successCallback)
            .catch(errorCallback)
    }

    return {
        axios,
        get,
        getFile,
        post,
        patch,
        put,
        del
    }
}