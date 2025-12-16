<script setup>
import { computed, ref } from 'vue'
import { getUnicornStatus } from '../../utils/unicornStatus'
import IconTrash from '../icons/IconTrash.vue'
import IconEmptyState from '../icons/IconEmptyState.vue'

const props = defineProps({
  unicorn: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['edit', 'delete'])

const isExpanded = ref(false)

const status = computed(() => getUnicornStatus(props.unicorn.age))

const statusPillClasses = computed(() => {
  if (status.value === 'Baby Unicorn') {
    return 'bg-amber-50 text-amber-700'
  }
  if (status.value === 'Mature Unicorn') {
    return 'bg-emerald-50 text-emerald-700'
  }
  if (status.value === 'Old Unicorn') {
    return 'bg-violet-50 text-violet-700'
  }
  return 'bg-slate-100 text-slate-600'
})

const statusBorderClasses = computed(() => {
  if (status.value === 'Baby Unicorn') {
    return 'bg-amber-400'
  }
  if (status.value === 'Mature Unicorn') {
    return 'bg-emerald-500'
  }
  if (status.value === 'Old Unicorn') {
    return 'bg-[#4E46B4]'
  }
  return 'bg-slate-300'
})

const statusIcon = computed(() => {
  if (status.value === 'Baby Unicorn') return '👶'
  if (status.value === 'Mature Unicorn') return '🦄'
  if (status.value === 'Old Unicorn') return '👴'
  return '🦄'
})

function toggleDetails() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <article class="flex rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
    <!-- Colored left border -->
    <div class="w-1" :class="statusBorderClasses" />

    <div class="flex-1 px-4 py-4 md:px-6 md:py-5">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <!-- Primary info -->
        <div
          class="grid gap-x-4 gap-y-2 text-xs sm:text-[13px] md:gap-x-5 md:gap-y-0
                 grid-cols-2 sm:grid-cols-[auto_minmax(0,1.6fr)_auto_auto_auto]"
        >
          <div class="text-slate-500">
            <p class="text-[11px] uppercase tracking-wide text-slate-400">No</p>
            <p class="font-semibold text-slate-900">
              {{ (currentPage - 1) * pageSize + index + 1 }}
            </p>
          </div>
          <div class="col-span-1 sm:col-auto">
            <p class="text-[11px] uppercase tracking-wide text-slate-400">Doctor Name</p>
            <p class="font-semibold text-slate-900">
              {{ unicorn.name || '—' }}
            </p>
          </div>
          <div>
            <p class="text-[11px] uppercase tracking-wide text-slate-400">Age</p>
            <p class="font-medium text-slate-900">
              {{ unicorn.age }}
            </p>
          </div>
          <div>
            <p class="text-[11px] uppercase tracking-wide text-slate-400">Color</p>
            <p class="font-medium text-slate-900">
              {{ unicorn.color || 'Blue' }}
            </p>
          </div>
          <div>
            <p class="text-[11px] uppercase tracking-wide text-slate-400">Status</p>
            <span
              class="mt-1 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold"
              :class="statusPillClasses"
            >
              <span>{{ statusIcon }}</span>
              {{ status }}
            </span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-3">
          <!-- Edit button -->
          <button
            type="button"
            class="inline-flex items-center rounded-lg border border-slate-400 px-4 py-2 text-xs font-semibold text-slate-900 bg-white shadow-sm hover:bg-slate-50"
            @click="emit('edit', unicorn)"
          >
            Edit
          </button>

          <!-- Delete button -->
          <button
            type="button"
            class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0564D] hover:bg-[#e14a41] shadow-sm"
            @click="emit('delete', unicorn)"
            aria-label="Delete unicorn"
          >
            <IconTrash />
          </button>
        </div>
      </div>

      <div v-if="isExpanded">
        <!-- Top divider -->
        <hr class="mt-3 text-gray-300" />

        <!-- Double-bordered details panel -->
        <div
          class="mt-3 rounded-2xl border border-violet-100 bg-violet-50/80 px-6 py-7 text-center text-[11px] text-violet-700 ring-1 ring-violet-50"
        >
          <!-- Center icon -->
          <div class="mb-3 flex justify-center">
            <IconEmptyState />
          </div>

          <p class="mb-1 font-semibold">The body copy explains the empty state.</p>
          <p>The icon relates to the situation.</p>
        </div>
      </div>

      <!-- Divider between details and toggle (always visible) -->
      <hr class="mt-3 text-gray-300" />

      <!-- Details toggle -->
      <div class="mt-3 flex items-center justify-end text-xs text-slate-500">
        <button
          type="button"
          class="inline-flex items-center gap-2 font-medium text-slate-500 hover:text-slate-900"
          @click="toggleDetails"
        >
          <span>{{ isExpanded ? 'Hide details' : 'Show details' }}</span>
          <span
            class="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-300"
          >
            <span
              class="inline-block text-[10px] transform transition-transform"
              :class="isExpanded ? '-rotate-90' : 'rotate-90'"
            >
              ›
            </span>
          </span>
        </button>
      </div>
    </div>
  </article>
</template>


