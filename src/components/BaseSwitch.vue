<template>
  <el-switch
    :model-value="modelValue"
    :active-value="activeValue"
    :inactive-value="inactiveValue"
    :active-color="activeColor"
    :inactive-color="inactiveColor"
    @update:model-value="updateModelValue"
  ></el-switch>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  activeValue: {
    type: Boolean,
    default: true,
  },
  inactiveValue: {
    type: Boolean,
    default: false,
  },
  activeColor: {
    type: String,
    default: '#409EFF',
  },
  inactiveColor: {
    type: String,
    default: '#D3DCE6',
  },
})

const emits = defineEmits(['update:modelValue'])

function updateModelValue(value) {
  emits('update:modelValue', value)
}
</script>
