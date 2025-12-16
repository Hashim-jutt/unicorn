<script setup>
import { onMounted, ref, computed, defineExpose } from 'vue'
import { fetchUnicorns, createUnicorn, updateUnicorn, deleteUnicorn } from '../services/unicornApi'
import UnicornCard from './unicorn/UnicornCard.vue'
import UnicornFormModal from './unicorn/UnicornFormModal.vue'
import DeleteConfirmModal from './unicorn/DeleteConfirmModal.vue'
import { useToast } from '../composables/useToast'

const unicorns = ref([])
const loading = ref(false)
const error = ref('')
const currentPage = ref(1)
const pageSize = 5

const { showToast } = useToast()

const sortField = ref('name')
const sortDirection = ref('asc')

// Modal + editing state
const showModal = ref(false)
const editingUnicorn = ref(null)
const submitting = ref(false)

// Delete modal state
const showDeleteModal = ref(false)
const deletingUnicorn = ref(null)
const deleting = ref(false)

const sortedUnicorns = computed(() => {
  const list = [...unicorns.value]
  return list.sort((a, b) => {
    const field = sortField.value
    let av = a[field]
    let bv = b[field]

    if (field === 'name') {
      av = (av || '').toLowerCase()
      bv = (bv || '').toLowerCase()
    } else if (field === 'age') {
      av = Number(av) || 0
      bv = Number(bv) || 0
    }

    if (av < bv) return sortDirection.value === 'asc' ? -1 : 1
    if (av > bv) return sortDirection.value === 'asc' ? 1 : -1
    return 0
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(sortedUnicorns.value.length / pageSize)))

const paginatedUnicorns = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return sortedUnicorns.value.slice(start, start + pageSize)
})

function toggleSort(field) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

async function loadUnicorns() {
  loading.value = true
  error.value = ''
  try {
    const data = await fetchUnicorns()
    unicorns.value = data
  } catch (e) {
    console.error(e)
    error.value = 'Failed to load unicorns. Please try again.'
  } finally {
    loading.value = false
  }
}

function openCreateModal() {
  editingUnicorn.value = null
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function startEdit(unicorn) {
  editingUnicorn.value = unicorn
  showModal.value = true
}

async function handleSave(payload) {
  submitting.value = true
  try {
    if (editingUnicorn.value && editingUnicorn.value._id) {
      await updateUnicorn(editingUnicorn.value._id, payload)
      await loadUnicorns()
      showToast({
        type: 'success',
        title: 'Unicorn updated',
        message: `"${payload.name}" saved successfully.`,
      })
    } else {
      const created = await createUnicorn(payload)
      unicorns.value.push(created)
      showToast({
        type: 'success',
        title: 'Unicorn created',
        message: `"${payload.name}" added to the database.`,
      })
    }
    editingUnicorn.value = null
    closeModal()
  } catch (e) {
    console.error(e)
    showToast({
      type: 'error',
      title: 'Save failed',
      message: 'Failed to save unicorn. Please try again.',
    })
  } finally {
    submitting.value = false
  }
}

function handleDelete(unicorn) {
  deletingUnicorn.value = unicorn
  showDeleteModal.value = true
}

function closeDeleteModal() {
  showDeleteModal.value = false
  deletingUnicorn.value = null
}

async function confirmDelete() {
  if (!deletingUnicorn.value) return
  
  deleting.value = true
  try {
    await deleteUnicorn(deletingUnicorn.value._id)
    unicorns.value = unicorns.value.filter((u) => u._id !== deletingUnicorn.value._id)
    showToast({
      type: 'error',
      title: 'Unicorn deleted',
      message: `"${deletingUnicorn.value.name}" deleted from the database.`,
    })
    closeDeleteModal()
  } catch (e) {
    console.error(e)
    showToast({
      type: 'error',
      title: 'Delete failed',
      message: 'Failed to delete unicorn.',
    })
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  loadUnicorns()
})

// Expose method so parent (App.vue) can trigger the create modal
defineExpose({
  openCreateModal,
})
</script>

<template>
  <div>
    <!-- List section styled like the Figma cards -->
    <section class="px-3 py-4 sm:p-5">
      <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div class="ml-auto flex items-center gap-2 text-xs sm:text-sm">
          <span class="text-slate-600">Sort by:</span>
          <button
            type="button"
            class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium"
            :class="sortField === 'name' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-300 text-slate-700'"
            @click="toggleSort('name')"
          >
            Name
            <span class="ml-1" v-if="sortField === 'name'">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium"
            :class="sortField === 'age' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-300 text-slate-700'"
            @click="toggleSort('age')"
          >
            Age
            <span class="ml-1" v-if="sortField === 'age'">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </button>
        </div>
      </div>

      <div v-if="loading" class="py-6 text-center text-sm text-slate-500">
        Loading unicorns...
      </div>

      <div v-else>
        <p v-if="error" class="mb-3 text-sm text-red-600">
          {{ error }}
        </p>
        <p v-if="!paginatedUnicorns.length && !error" class="py-10 text-center text-sm text-slate-500">
          No unicorns yet. Create one to get started!
        </p>

        <div v-if="paginatedUnicorns.length" class="space-y-4">
          <UnicornCard
            v-for="(u, index) in paginatedUnicorns"
            :key="u._id"
            :unicorn="u"
            :index="index"
            :current-page="currentPage"
            :page-size="pageSize"
            @edit="startEdit"
            @delete="handleDelete"
          />
        </div>

        <div v-if="totalPages > 1" class="mt-4 flex justify-center">
          <div class="inline-flex items-center gap-2 text-xs text-slate-700">
            <!-- Previous -->
            <button
              type="button"
              class="flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              ‹
            </button>

            <!-- Page numbers -->
            <button
              v-for="n in totalPages"
              :key="n"
              type="button"
              class="flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium"
              :class="n === currentPage
                ? 'border-violet-600 bg-[#4E46B4] text-white'
                : 'border-slate-300 text-slate-700 hover:bg-slate-100'"
              @click="currentPage = n"
            >
              {{ n }}
            </button>

            <!-- Next -->
            <button
              type="button"
              class="flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Create / Edit modal -->
    <UnicornFormModal
      v-model="showModal"
      :initial-unicorn="editingUnicorn"
      :submitting="submitting"
      @save="handleSave"
    />

    <!-- Delete confirmation modal -->
    <DeleteConfirmModal
      v-model="showDeleteModal"
      :unicorn="deletingUnicorn"
      :deleting="deleting"
      @confirm="confirmDelete"
    />
  </div>
</template>