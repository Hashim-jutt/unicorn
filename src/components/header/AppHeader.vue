<script setup>
import IconCreateUnicorn from '../../components/icons/IconCreateUnicorn.vue'
defineEmits(['create'])
</script>

<template>
  <header class="backdrop-blur">
    <div class="mx-auto max-w-6xl pl-8 pr-5 py-3 sm:px-10 sm:py-4">
      <div class="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 class="text-lg font-semibold leading-tight sm:text-2xl">
          Welcome John Doe
        </h1>
        <button
          class="inline-flex items-center gap-2 rounded-md bg-[#4E46B4] px-4 py-2 text-xs font-semibold text-white hover:bg-violet-700 sm:px-5 sm:py-2.5 sm:text-sm"
          @click="$emit('create')"
        >
          <IconCreateUnicorn class="h-4 w-4 sm:h-5 sm:w-5" />
          <span class="whitespace-nowrap">
            Create Unicorn
          </span>
        </button>
      </div>
    </div>
  </header>
</template>
