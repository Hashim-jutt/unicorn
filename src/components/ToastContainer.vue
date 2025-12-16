<script setup>
import { computed } from 'vue'
import { useToast } from '../composables/useToast'
import IconTrash from './icons/IconTrash.vue'

const { toasts, removeToast } = useToast()

const hasToasts = computed(() => toasts.value.length > 0)
</script>

<template>
  <div
    v-if="hasToasts"
    class="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3"
  >
    <div class="flex w-full max-w-lg flex-col items-end space-y-3">
      <TransitionGroup
        name="toast"
        tag="div"
        class="flex w-full flex-col items-end space-y-3"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto flex w-full items-start gap-3 rounded-2xl shadow-lg overflow-hidden"
          :class="toast.type === 'error' ? 'bg-[#F0564D]' : 'bg-emerald-500'"
        >
          <div
            class="flex items-start gap-3 px-4 py-3 flex-1"
          >
            <div
              class="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20"
            >
              <IconTrash v-if="toast.type === 'error'" class="h-4 w-4 text-white" />
              <span v-else class="text-white">✅</span>
            </div>

            <div class="flex-1 text-sm">
              <p class="font-semibold text-white">
                {{ toast.title }}
              </p>
              <p class="mt-0.5 text-[13px] text-white/90">
                {{ toast.message }}
              </p>
            </div>

            <button
              type="button"
              class="ml-2 inline-flex rounded-full p-1 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50"
              @click="removeToast(toast.id)"
            >
              <span class="sr-only">Dismiss</span>
              ✕
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(12px) translateX(12px);
}
</style>


