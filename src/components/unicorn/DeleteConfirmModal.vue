<script setup>
import IconTrash from '../icons/IconTrash.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  unicorn: {
    type: Object,
    default: null,
  },
  deleting: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'confirm'])

function close() {
  emit('update:modelValue', false)
}

function handleConfirm() {
  emit('confirm')
}
</script>

<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
    @click.self="close"
  >
    <div class="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl">
      <div class="mb-5 flex flex-col items-center text-center">
        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <IconTrash class="h-6 w-6 text-red-600" />
        </div>
        <h2 class="mb-2 text-lg font-semibold text-slate-900">
          Delete Unicorn
        </h2>
        <p class="text-sm text-slate-600">
          Are you sure you want to delete
          <span v-if="unicorn" class="font-semibold text-slate-900">
            "{{ unicorn.name }}"
          </span>?
          This action cannot be undone.
        </p>
      </div>

      <div class="flex items-center justify-center gap-3">
        <button
          type="button"
          class="inline-flex min-w-[104px] items-center justify-center rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="deleting"
          @click="close"
        >
          Cancel
        </button>
        <button
          type="button"
          class="inline-flex min-w-[104px] items-center justify-center rounded-full bg-[#F0564D] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#e14a41] disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="deleting"
          @click="handleConfirm"
        >
          <span
            v-if="deleting"
            class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
          />
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

