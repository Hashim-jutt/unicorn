<script setup>
defineProps({ open: Boolean })
defineEmits(['toggle'])
</script>

<template>
  <button
    type="button"
    class="absolute top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-md"
    :class="open ? 'left-72 md:left-64 -translate-x-1/2' : '-left-4'"
    @click="$emit('toggle')"
  >
    <span class="transition-transform" :class="open ? 'rotate-180' : ''">
      ›
    </span>
  </button>
</template>
