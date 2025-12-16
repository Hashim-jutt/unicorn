<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  initialUnicorn: {
    type: Object,
    default: null,
  },
  submitting: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'save'])

const form = ref({
  name: '',
  age: '',
  color: '',
})

const formError = ref('')
const fieldErrors = ref({
  name: '',
  age: '',
  color: '',
})
const touchedFields = ref({
  name: false,
  age: false,
  color: false,
})

watch(
  () => props.initialUnicorn,
  (unicorn) => {
    if (unicorn) {
      form.value = {
        name: unicorn.name ?? '',
        age: unicorn.age ?? '',
        color: unicorn.color ?? '',
      }
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

watch(
  () => props.modelValue,
  (isOpen) => {
    if (!isOpen) {
      resetForm()
    }
  }
)

function resetForm() {
  form.value = { name: '', age: '', color: '' }
  formError.value = ''
  fieldErrors.value = { name: '', age: '', color: '' }
  touchedFields.value = { name: false, age: false, color: false }
}

function validateName(name) {
  const trimmed = (name || '').trim()
  if (!trimmed) return 'Name is required.'
  if (trimmed.length < 2) return 'Name must be at least 2 characters.'
  if (trimmed.length > 20) return 'Name must not exceed 20 characters.'
  return ''
}

function validateAge(age) {
  const ageStr = String(age || '').trim()
  if (!ageStr) return 'Age is required.'
  const ageNum = Number(ageStr)
  if (Number.isNaN(ageNum)) return 'Age must be a valid number.'
  if (ageNum < 0) return 'Age must be a non-negative number.'
  if (!Number.isInteger(ageNum)) return 'Age must be a whole number.'
  if (ageNum > 200) return 'Age must not exceed 200.'
  return ''
}

function validateColor(color) {
  const trimmed = (color || '').trim()
  if (!trimmed) return 'Color is required.'
  if (trimmed.length > 50) return 'Color must not exceed 50 characters.'
  return ''
}

function validateForm(markAllTouched = false) {
  if (markAllTouched) {
    touchedFields.value = { name: true, age: true, color: true }
  }
  
  fieldErrors.value.name = validateName(form.value.name)
  fieldErrors.value.age = validateAge(form.value.age)
  fieldErrors.value.color = validateColor(form.value.color)

  return !fieldErrors.value.name && !fieldErrors.value.age && !fieldErrors.value.color
}

function clearFieldError(field) {
  if (fieldErrors.value[field]) {
    fieldErrors.value[field] = ''
  }
  formError.value = ''
}

function handleFieldBlur(field) {
  touchedFields.value[field] = true
  if (field === 'name') {
    fieldErrors.value.name = validateName(form.value.name)
  } else if (field === 'age') {
    fieldErrors.value.age = validateAge(form.value.age)
  } else if (field === 'color') {
    fieldErrors.value.color = validateColor(form.value.color)
  }
}

const isFormValid = computed(() => {
  // Only validate for form validity check, don't show errors for untouched fields
  const nameError = validateName(form.value.name)
  const ageError = validateAge(form.value.age)
  const colorError = validateColor(form.value.color)
  return !nameError && !ageError && !colorError
})

function close() {
  emit('update:modelValue', false)
}

function handleSubmit() {
  formError.value = ''

  if (!validateForm(true)) {
    return
  }

  emit('save', {
    name: form.value.name.trim(),
    age: Number(form.value.age),
    color: form.value.color.trim(),
  })
}
</script>

<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/40 px-4 pt-16 sm:pt-24"
  >
    <div class="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl">
      <h2 class="mb-5 text-lg font-semibold text-slate-900">
        {{ initialUnicorn ? 'Edit Unicorn details' : 'Create Unicorn' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-800">Name</label>
          <input
            v-model="form.name"
            type="text"
            :class="[
              'mt-2 w-full rounded-xl border px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2',
              touchedFields.name && fieldErrors.name
                ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-200 focus:border-[#4E46B4] focus:ring-violet-100'
            ]"
            placeholder="Write Name"
            @input="clearFieldError('name')"
            @blur="handleFieldBlur('name')"
          />
          <p v-if="touchedFields.name && fieldErrors.name" class="mt-1 text-xs text-red-600">
            {{ fieldErrors.name }}
          </p>
          <p v-else class="mt-1 text-xs text-slate-400">This is the unicorn name</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-800">Age</label>
          <input
            v-model="form.age"
            type="number"
            min="0"
            :class="[
              'mt-2 w-full rounded-xl border px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2',
              touchedFields.age && fieldErrors.age
                ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-200 focus:border-[#4E46B4] focus:ring-violet-100'
            ]"
            placeholder="Write age"
            @input="clearFieldError('age')"
            @blur="handleFieldBlur('age')"
          />
          <p v-if="touchedFields.age && fieldErrors.age" class="mt-1 text-xs text-red-600">
            {{ fieldErrors.age }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-800">Color</label>
          <input
            v-model="form.color"
            type="text"
            :class="[
              'mt-2 w-full rounded-xl border px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2',
              touchedFields.color && fieldErrors.color
                ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-200 focus:border-[#4E46B4] focus:ring-violet-100'
            ]"
            placeholder="Write color"
            @input="clearFieldError('color')"
            @blur="handleFieldBlur('color')"
          />
          <p v-if="touchedFields.color && fieldErrors.color" class="mt-1 text-xs text-red-600">
            {{ fieldErrors.color }}
          </p>
        </div>

        <p v-if="formError" class="text-xs text-red-600">
          {{ formError }}
        </p>

        <div class="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            class="inline-flex min-w-[104px] items-center justify-center rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
            @click="close"
          >
            Cancel
          </button>
          <div class="relative group">
            <button
              type="submit"
              class="inline-flex min-w-[104px] items-center justify-center rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
              :disabled="submitting || !isFormValid"
            >
              <span
                v-if="submitting"
                class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
              />
              {{ initialUnicorn ? 'Update' : 'Create' }}
            </button>
            <!-- Tooltip -->
            <div
              v-if="!isFormValid && !submitting"
              class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10"
            >
              Fill all the fields
              <!-- Tooltip arrow -->
              <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                <div class="w-2 h-2 bg-slate-900 rotate-45" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


