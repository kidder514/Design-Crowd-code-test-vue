<script setup lang="ts">
import { onMounted } from 'vue'
import { useHCardStore } from '../store/hCardStore'
import HCard from '../components/HCard.vue'
import HCardForm from '../components/HCardForm.vue'

const hCardStore = useHCardStore()

onMounted(() => {
    hCardStore.fetchHCardData()
})
</script>

<template>
    <div class="h-card-page-wrapper">
        <HCardForm :data="hCardStore.hCardData" :update="hCardStore.updateField" />
        <HCard :data="hCardStore.hCardData" />
    </div>
</template>

<style scoped="scss">
.h-card-page-wrapper {
    display: flex;
    width: 100%;
    height: 100vh;
}
</style>
