<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-40 w-72 md:w-64 flex flex-col border-r bg-white/90 backdrop-blur transition-transform duration-200 md:static overflow-hidden"
    :class="open ? 'translate-x-0' : '-translate-x-full hidden'"
  >
    <!-- Logo / top icon -->
    <div class="flex items-center gap-2 px-6 py-5 mt-5 flex-shrink-0">
      <slot name="logo" />
    </div>

    <nav class="flex-1 px-4 pt-4 text-sm overflow-y-auto md:overflow-y-auto">
      <slot />
    </nav>

    <div class="border-t px-6 py-4 flex-shrink-0 bg-white/90">
      <slot name="profile" />
    </div>
  </aside>
</template>


