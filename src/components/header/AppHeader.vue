<script setup>
import IconCreateUnicorn from '../../components/icons/IconCreateUnicorn.vue'
defineEmits(['create'])
</script>

<template>
  <header class="backdrop-blur">
    <div class="mx-auto max-w-6xl px-10 py-4">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold">Welcome John Doe</h1>
        <button
          class="inline-flex items-center gap-2 rounded-md bg-[#4E46B4] px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
          @click="$emit('create')"
        >
          <IconCreateUnicorn />
          Create Unicorn
        </button>
      </div>
    </div>
  </header>
</template>
