import { type InputTypeHTMLAttribute } from 'vue'

export type Field = {
    label: string
    type: InputTypeHTMLAttribute
    value: string | number
}

export type Fields = {
    [key: string]: Field
}

export enum GROUP_TYPE {
    INPUT = 'input',
    ACTION = 'action'
}
export type Group = {
    label: string
    type: GROUP_TYPE
    fields: Fields
}

export interface HCardDataResponse {
    [key: string]: Group
}

export interface CustomInputProps {
    label?: string
    type: InputTypeHTMLAttribute
    value?: string | number
    name?: string
    theme?: 'primary' | 'secondary'
}
