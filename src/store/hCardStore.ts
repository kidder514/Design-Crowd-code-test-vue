import type { HCardDataResponse } from '@/type'
import { defineStore } from 'pinia'
import set from 'lodash/set'
import data from './mock.json'

export const useHCardStore = defineStore('hCardStore', {
    state: () => ({
        hCardData: undefined as HCardDataResponse | undefined
    }),
    actions: {
        async fetchHCardData() {
            try {
                const res = await new Promise<HCardDataResponse>((resolve) =>
                    setTimeout(() => resolve(data as HCardDataResponse), 200)
                )
                this.hCardData = res
            } catch (error) {
                console.error('Failed to fetch h-card data:')
            }
        },
        updateField(path: string, value: string | number) {
            set(this.hCardData as object, path, value)
        }
    }
})
