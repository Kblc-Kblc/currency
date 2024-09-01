<template>
  <common-layout>
    <template #header>
      <base-header>
        <template #item>
          <base-select
            v-model="selectedCurrency"
            :options="currencyOptions"
            class="select-currency"
          />
        </template>
      </base-header>
    </template>

    <div class="main">
      <h2>Курсы валют относительно {{ currencyStore.baseCurrency }}</h2>
      <ul>
        <li v-for="(rate, currency) in currencyStore.filteredRates" :key="currency">
          1 {{ currencyStore.baseCurrency }} = {{ rate }} {{ currency }}
        </li>
      </ul>
    </div>
  </common-layout>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import CommonLayout from '@/layouts/CommonLayout.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { useCurrencyStore } from '@/stores/currency.js'

const currencyStore = useCurrencyStore()

const selectedCurrency = ref(currencyStore.baseCurrency)

const currencyOptions = computed(() => {
  return currencyStore.availableCurrencies.map((currency) => ({
    label: currency,
    value: currency,
  }))
})

watch(selectedCurrency, (newCurrency) => {
  currencyStore.setBaseCurrency(newCurrency)
})

onMounted(() => {
  currencyStore.fetchCurrencyRates()
})
</script>

<style scoped>
.main {
  padding: 0 45px;
}

@media (max-width: 767px) {
  .main {
    padding: 35px 25px;
  }
}

.select-currency {
  width: 150px;
}
</style>
