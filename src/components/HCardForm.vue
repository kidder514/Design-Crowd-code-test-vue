<script setup lang="ts">
import { defineProps } from 'vue'
import CustomInput from './common/CustomInput.vue'
import { GROUP_TYPE, type HCardDataResponse } from '../type'

interface Props {
    data?: HCardDataResponse
    update: (path: string, value: string | number) => {}
}
const props = defineProps<Props>()

const onFieldInput = (path: string, value: string | number) => {
    props.update(path, value)
}
</script>

<template>
    <div class="h-card-form">
        <h1 class="h-card-form-title">HCard Builder</h1>
        <div v-for="(group, key, index) in data" :key="`group-${index}-${key}`">
            <section v-if="group.type === GROUP_TYPE.INPUT" class="h-card-form-input-group-wrapper">
                <h3 class="h-card-form-input-group-header">
                    {{ group.label }}
                </h3>
                <div class="h-card-form-input-group">
                    <CustomInput
                        v-for="(field, fieldKey) in group.fields"
                        :key="`field-${fieldKey}`"
                        :class="'h-card-form-input'"
                        :label="field.label"
                        :type="field.type"
                        :value="field.value"
                        :name="field.label.replace(' ', '-')"
                        @onInput="(value) => onFieldInput(`${key}.fields.${fieldKey}.value`, value)"
                    />
                </div>
            </section>
            <section
                v-else-if="group.type === GROUP_TYPE.ACTION"
                class="h-card-form-button-group-wrapper"
            >
                <div class="h-card-form-button-group">
                    <template v-for="(field, fieldKey) in group.fields">
                        <CustomInput
                            v-if="field.type === 'file'"
                            :key="`field-file-${fieldKey}`"
                            :class="'h-card-form-button'"
                            :label="field.label"
                            :type="field.type"
                            :theme="'secondary'"
                            :name="field.label.replace(' ', '-')"
                            @onInput="
                                (value) => onFieldInput(`${key}.fields.${fieldKey}.value`, value)
                            "
                        />
                        <CustomInput
                            v-else-if="field.type === 'button'"
                            :key="`field-button-${fieldKey}`"
                            :class="'h-card-form-button'"
                            :type="field.type"
                            :theme="'primary'"
                            :value="field.label"
                            @onClick="
                                () => {
                                    console.log('save state to DB', data)
                                }
                            "
                        />
                    </template>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../assets/variable.scss';

.h-card-form {
    width: 60%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .h-card-form-title {
        font-size: 1.5rem;
        padding-bottom: 1.5rem;
    }

    section.h-card-form-input-group-wrapper {
        h3.h-card-form-input-group-header {
            color: $grey;
            font-size: 0.75rem;
            font-weight: 700;
            margin: 0.25rem 0 0.75rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid $grey;
        }

        .h-card-form-input-group {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;

            .h-card-form-input {
                width: 50%;
                padding-right: 2%;
                box-sizing: border-box;
            }
        }
    }

    section.h-card-form-button-group-wrapper {
        .h-card-form-button-group {
            display: flex;
            flex-wrap: wrap;

            .h-card-form-button {
                width: 50%;
                padding-right: 2%;
                box-sizing: border-box;
            }
        }
    }
}
</style>
