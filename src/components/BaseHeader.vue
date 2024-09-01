<template>
  <div class="header">
    <!-- Навигационные ссылки -->
    <div class="header-tools">
      <el-link type="primary"><router-link to="/">Главная</router-link></el-link>
      <el-link type="primary"><router-link to="/convert">Конвертация</router-link></el-link>

      <slot name="item"></slot>
    </div>
    <!-- Переключатель темы -->
    <base-switch
      v-model="isDark"
      active-color="#409EFF"
      inactive-color="#D3DCE6"
      @update:model-value="handleThemeChange"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import BaseSwitch from './BaseSwitch.vue'

const isDark = ref(false)

function handleThemeChange(newTheme) {
  updateHtmlClass(newTheme)
  saveThemePreference(newTheme)
}

function updateHtmlClass(isDark) {
  const html = document.documentElement
  if (isDark) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}

function saveThemePreference(isDark) {
  localStorage.setItem('darkThemeEnabled', isDark ? 'true' : 'false')
}

function loadThemePreference() {
  const storedTheme = localStorage.getItem('darkThemeEnabled')
  return storedTheme === 'true'
}

onMounted(() => {
  isDark.value = loadThemePreference()
})

watch(isDark, (newTheme) => {
  handleThemeChange(newTheme)
})
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  border-bottom: 1px solid var(--border-color);
  padding: 0 45px;
  flex-wrap: wrap;
}

@media (max-width: 767px) {
  .header {
    padding: 0 25px;
    height: 100px;
  }
}

.header-tools {
  display: flex;
  align-items: center;
  gap: 20px;
}

.el-link a {
  color: inherit;
  text-decoration: none;
}
</style>
