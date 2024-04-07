<script setup lang="ts">
import { computed } from 'vue'
import { type HCardDataResponse } from '../type'

interface Props {
    data?: HCardDataResponse
}

const props = defineProps<Props>()

const fullName = computed(() =>
    `${props.data?.personalDetails?.fields?.givenName?.value || ''} ${
        props.data?.personalDetails?.fields?.surname?.value || ''
    }`.trim()
)
const avatar = computed(() => (props.data?.action?.fields?.uploadAvatar?.value as string) || '')
const email = computed(() => props.data?.personalDetails?.fields?.email?.value || '')
const phone = computed(() => props.data?.personalDetails?.fields?.phone?.value || '')
const addressLine1 = computed(() =>
    `${
        props.data?.address?.fields?.houseNameNumber?.value || ''
    } ${props.data?.address?.fields?.street?.value || ''}`.trim()
)
const addressLine2 = computed(() =>
    `${props.data?.address?.fields?.suburb?.value || ''} ${
        props.data?.address?.fields?.state?.value || ''
    }`.trim()
)
const postcode = computed(() => props.data?.address?.fields.postcode?.value || '')
const country = computed(() => props.data?.address?.fields.country?.value || '')
</script>

<template>
    <div class="h-card-view">
        <div class="h-card-view-container">
            <header class="h-card-view-header">
                {{ fullName }}
                <img class="h-card-view-avatar" :src="avatar" alt="avatar" />
            </header>
            <div class="h-card-view-body">
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <span class="h-card-view-table-row-header">EMAIL</span>
                            </th>
                            <td colspan="3">{{ email }}</td>
                        </tr>
                        <tr>
                            <th>
                                <span class="h-card-view-table-row-header">PHONE</span>
                            </th>
                            <td colspan="3">{{ phone }}</td>
                        </tr>
                        <tr>
                            <th>
                                <span class="h-card-view-table-row-header">ADDRESS</span>
                            </th>
                            <td colspan="3">{{ addressLine1 }}</td>
                        </tr>
                        <tr>
                            <th>
                                <span class="h-card-view-table-row-header"></span>
                            </th>
                            <td colspan="3">{{ addressLine2 }}</td>
                        </tr>
                        <tr class="multi-col">
                            <th>
                                <span class="h-card-view-table-row-header">POSTCODE</span>
                            </th>
                            <td>{{ postcode }}</td>
                            <th>
                                <span class="h-card-view-table-row-header">COUNTRY</span>
                            </th>
                            <td>{{ country }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../assets/variable.scss';
.h-card-view {
    background-color: $background-grey;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem;

    .h-card-view-container {
        background-color: white;
        box-shadow: 0px 3px 0px 0px $grey;
        -webkit-box-shadow: 0px 3px 0px 0px $grey;
        -moz-box-shadow: 0px 3px 0px 0px $grey;

        header.h-card-view-header {
            background-color: #283c50;
            color: white;
            display: flex;
            align-items: center;
            padding: 3rem 2rem 1.5rem;
            font-size: 1.5rem;
            height: 6rem;
            box-sizing: border-box;
            position: relative;

            .h-card-view-avatar {
                width: 6rem;
                height: 6rem;
                position: absolute;
                top: 1rem;
                right: 1rem;
            }
        }

        div.h-card-view-body {
            padding: 2rem;

            table {
                font-size: 0.75rem;
                width: 100%;
                min-width: 400px;
                line-height: 2rem;
                table-layout: auto;

                tr {
                    border-bottom: 1px solid $grey;

                    th {
                        text-align: left;
                        color: $grey;

                        .h-card-view-table-row-header {
                            margin-right: 0.75rem;
                        }

                        &:not(:first-child) .h-card-view-table-row-header {
                            margin-left: 0.75rem;
                        }
                    }

                    td {
                        width: 100%;
                    }

                    &.multi-col {
                        td {
                            width: 50%;
                        }
                    }
                }
            }
        }
    }
}
</style>
