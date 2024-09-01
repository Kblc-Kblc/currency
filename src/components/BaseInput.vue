<template>
  <el-input
    :model-value="modelValue"
    :maxlength="maxlength"
    :readonly="readonly"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  maxlength: Number,
  readonly: Boolean,
})

const emits = defineEmits(['update:modelValue'])
</script>
