<template>
  <el-select v-model="selected" class="select">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  options: Array,
})

const emits = defineEmits(['update:modelValue'])

const selected = ref(props.modelValue)

watch(selected, (newValue) => {
  emits('update:modelValue', newValue)
})
</script>

<style scoped>
.select {
  width: 100%;
}
</style>
