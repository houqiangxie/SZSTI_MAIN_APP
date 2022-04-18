import { defineStore } from 'pinia'

export const useTestStore = defineStore('test', () => {
    const testA = ref('0')
    const testC = ref('0')

    const testB = () => {
        console.log('ssss')
    } 
    return {testA, testB,testC}
})