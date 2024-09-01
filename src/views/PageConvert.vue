<template>
  <common-layout>
    <template #header>
      <base-header />
    </template>

    <div class="main">
      <div class="conversion-form">
        <div class="currency-input">
          <base-select v-model="currencyFrom" :options="currencyOptions" />
          <base-input
            v-model.number="validatedAmountFrom"
            :maxlength="12"
            @input="convertCurrency"
          />
        </div>
        <div class="currency-input">
          <base-select v-model="currencyTo" :options="currencyOptions" />
          <base-input v-model.number="amountTo" readonly />
        </div>
      </div>
    </div>
  </common-layout>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import BaseHeader from '@/components/BaseHeader.vue'
import CommonLayout from '@/layouts/CommonLayout.vue'
import { useCurrencyStore } from '@/stores/currency.js'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseInput from '@/components/BaseInput.vue'

const currencyStore = useCurrencyStore()

const currencyFrom = ref('RUB')
const currencyTo = ref('USD')
const amountFrom = ref(null)
const amountTo = ref(null)

const currencyOptions = computed(() => {
  return currencyStore.availableCurrencies.map((currency) => ({
    label: currency,
    value: currency,
  }))
})

const validatedAmountFrom = computed({
  get: () => amountFrom.value,
  set: (newValue) => {
    if (newValue === '') {
      amountFrom.value = null
    } else if (!isNaN(parseFloat(newValue)) && isFinite(newValue) && newValue >= 0) {
      amountFrom.value = parseFloat(newValue)
    }
  },
})

const convertCurrency = () => {
  if (amountFrom.value == null || amountFrom.value === '') {
    amountTo.value = ''
    return
  }

  const rateFrom = currencyStore.rates[`${currencyFrom.value.toLowerCase()}-rub`] || 1
  const rateTo = currencyStore.rates[`rub-${currencyTo.value.toLowerCase()}`] || 1

  amountTo.value = ((amountFrom.value / rateFrom) * rateTo).toFixed(2)
}

watch([currencyFrom, currencyTo], () => {
  convertCurrency()
})

onMounted(() => {
  currencyStore.fetchCurrencyRates()
})
</script>

<style scoped>
.main {
  padding: 12px 45px;
}

@media (max-width: 767px) {
  .main {
    padding: 55px 25px;
  }
}
.conversion-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.currency-input {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
