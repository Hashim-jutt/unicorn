<script setup>
import { ref } from 'vue'
import AppSidebar from './AppSidebar.vue'
import SidebarNavigation from '../../components/sidebar/SidebarNavigation.vue'
import SidebarProfile from '../../components/sidebar/SidebarProfile.vue'
import SidebarToggle from '../../components/sidebar/SidebarToggle.vue'
import AppHeader from '../../components/header/AppHeader.vue'
import IconSidebarLogo from '../../components/icons/sidebar/IconSidebarLogo.vue'

const sidebarOpen = ref(true)
const emit = defineEmits(['create'])

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function closeSidebar() {
  sidebarOpen.value = false
}
</script>

<template>
  <div class="relative flex min-h-screen bg-slate-100 text-slate-900">
    <AppSidebar :open="sidebarOpen">
      <template #logo>
        <IconSidebarLogo />
      </template>

      <template #default>
        <SidebarNavigation />
      </template>

      <template #profile>
        <SidebarProfile />
      </template>
    </AppSidebar>

    <SidebarToggle
      :open="sidebarOpen"
      @toggle="toggleSidebar"
    />

    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-30 bg-slate-900/40 md:hidden"
      @click="closeSidebar"
    />

    <div class="flex flex-1 flex-col">
      <AppHeader @create="emit('create')" />
      <main class="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        <slot />
      </main>
    </div>
  </div>
</template>
