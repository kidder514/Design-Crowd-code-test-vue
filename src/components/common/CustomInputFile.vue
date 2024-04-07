<script setup lang="ts">
import { ref } from 'vue'
import { type CustomInputProps } from '../../type'

const props = defineProps<CustomInputProps>()
const emit = defineEmits<{
    onChangeFile: [url: string]
}>()

const inputFileRef = ref<HTMLInputElement | null>(null)

const handleClick = () => {
    if (!inputFileRef.value) return
    inputFileRef.value.click()
}

const onChangeLocal = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files) {
        const url = URL.createObjectURL(input.files[0])
        emit('onChangeFile', url)
    }
}
</script>

<template>
    <div class="custom-input-file-wrapper" :class="{ [props.theme as string]: props.theme }">
        <button class="custom-input-file-uploader" @click="handleClick">
            {{ label }}
        </button>
        <input
            type="file"
            ref="inputFileRef"
            @change="onChangeLocal"
            accept="image/png, image/gif, image/jpeg"
        />
    </div>
</template>

<style scoped lang="scss">
@import '../../assets/variable.scss';

.custom-input-file-wrapper {
    display: flex;
    flex-direction: column;

    input[type='file'] {
        display: none;
    }

    button.custom-input-file-uploader {
        border: none;
        border-radius: 0.25rem;
        font-size: 1rem;
        margin-bottom: 0.5rem;
        padding: 0.5rem;
        color: white;
        cursor: pointer;
    }

    &.secondary {
        button.custom-input-file-uploader {
            background-color: $button-secondary;

            &:hover {
                background-color: $button-secondary-hover;
            }
        }
    }
}
</style>
