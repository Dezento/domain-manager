<script setup lang="ts">
interface InputProps {
  name: string
  label?: string
  placeholder?: string
  modelValue?: string
}

const props = defineProps<InputProps>()
const id = useId()
const name = toRef(props, 'name')

const { value, errorMessage, handleBlur, handleChange } = useField(
  name,
  undefined,
)



</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block mb-2 text-sm font-bold text-gray-700"
    >
      {{ props.label }}
    </label>

    <input
      v-bind="$attrs"
      :id="id"
      :class="[
        'w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline',
        {
          'disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500':
            $attrs.disabled !== false,
          ' border-red-500':
            !!errorMessage,
        },
      ]"
      :value="value"
      @input="handleChange"
      @blur="handleBlur"
      :aria-invalid="!!errorMessage"
      :aria-describedby="`${id}-error`"
      :placeholder="placeholder"
    />

    <p v-show="errorMessage" class="text-red-700 text-sm my-1">
      {{ errorMessage }}
    </p>
  </div>
</template>
