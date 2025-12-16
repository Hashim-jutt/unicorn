<script setup>
import { ref } from 'vue'
import MainLayout from './components/layout/MainLayout.vue'
import UnicornDashboard from './components/UnicornDashboard.vue'
import ToastContainer from './components/ToastContainer.vue'

const dashboardRef = ref(null)

function openCreateUnicornModal() {
  dashboardRef.value?.openCreateModal?.()
}
</script>

<template>
  <MainLayout @create="openCreateUnicornModal">
    <UnicornDashboard ref="dashboardRef" />
    <ToastContainer />
  </MainLayout>
</template>
