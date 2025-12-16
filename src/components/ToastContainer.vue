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
    class="pointer-events-none fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end space-y-2 sm:space-y-3"
  >
    <div class="flex w-full max-w-xs sm:max-w-lg flex-col items-end space-y-2 sm:space-y-3">
      <TransitionGroup
        name="toast"
        tag="div"
        class="flex w-full flex-col items-end space-y-2 sm:space-y-3"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto flex w-full items-start gap-2 sm:gap-3 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden"
          :class="toast.type === 'error' ? 'bg-[#F0564D]' : 'bg-emerald-500'"
        >
          <div
            class="flex items-start gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 flex-1"
          >
            <div
              class="mt-0.5 inline-flex h-5 w-5 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-white/20 flex-shrink-0"
            >
              <IconTrash v-if="toast.type === 'error'" class="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              <span v-else class="text-white text-xs sm:text-base">✅</span>
            </div>

            <div class="flex-1 text-xs sm:text-sm min-w-0">
              <p class="font-semibold text-white leading-tight">
                {{ toast.title }}
              </p>
              <p class="mt-0.5 text-[11px] sm:text-[13px] text-white/90 leading-tight">
                {{ toast.message }}
              </p>
            </div>

            <button
              type="button"
              class="ml-1 sm:ml-2 inline-flex rounded-full p-0.5 sm:p-1 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 flex-shrink-0 text-sm sm:text-base"
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


