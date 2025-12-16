import { ref } from 'vue'

const toasts = ref([])
let idCounter = 0

function showToast({ title, message, type = 'success', duration = 4000 }) {
  const id = ++idCounter
  const toast = { id, title, message, type }
  toasts.value.push(toast)

  if (duration > 0) {
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }
}

function removeToast(id) {
  toasts.value = toasts.value.filter((t) => t.id !== id)
}

export function useToast() {
  return {
    toasts,
    showToast,
    removeToast,
  }
}


