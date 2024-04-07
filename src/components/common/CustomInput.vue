<script setup lang="ts">
import { type CustomInputProps } from '../../type'
import CustomInputFile from './CustomInputFile.vue'

const props = defineProps<CustomInputProps>()
const emit = defineEmits<{
    onInput: [value: string | number]
    onClick: [e: Event]
}>()

const handleOnChangeFile = (url: string) => {
    emit('onInput', url)
}

const handleOnInput = (e: Event) => {
    emit('onInput', (e.target as HTMLInputElement).value)
}
</script>

<template>
    <CustomInputFile
        v-if="props.type === 'file'"
        v-bind="props"
        @onChangeFile="handleOnChangeFile"
    />
    <div v-else class="custom-input-wrapper" :class="{ [props.theme as string]: props.theme }">
        <label v-if="label">{{ label }}</label>
        <input
            :type="type"
            :value="value"
            :name="name"
            @input="handleOnInput"
            @click="$emit('onClick', $event)"
        />
    </div>
</template>

<style scoped lang="scss">
@import '../../assets/variable.scss';

.custom-input-wrapper {
    display: flex;
    flex-direction: column;

    label {
        font-size: 0.75rem;
        padding: 0.5rem 0;
    }

    input {
        border: 1px solid #abb4b9;
        border-radius: 0.25rem;
        font-size: 1rem;
        margin-bottom: 0.5rem;
        padding: 0.5rem;

        &[type='button'] {
            color: white;
            cursor: pointer;
        }
    }

    &.primary {
        input[type='button'] {
            background-color: $button-primary;

            &:hover {
                background-color: $button-primary-hover;
            }
        }
    }
}
</style>
