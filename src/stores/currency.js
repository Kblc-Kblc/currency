// stores/currency.js
import { defineStore } from 'pinia'
import api from '@/services/api.js'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    rates: {},
    baseCurrency: 'RUB',
    availableCurrencies: [],
  }),
  getters: {
    filteredRates: (state) => {
      const result = {}
      Object.keys(state.rates).forEach((key) => {
        if (key.includes(state.baseCurrency.toLowerCase())) {
          const targetCurrency = key.replace(state.baseCurrency.toLowerCase(), '').replace('-', '')
          result[targetCurrency.toUpperCase()] = state.rates[key]
        }
      })
      return result
    },
  },
  actions: {
    fetchCurrencyRates() {
      return api
        .getCurrency()
        .then((response) => {
          this.rates = response.data
          this.updateAvailableCurrencies()
        })
        .catch((error) => {
          console.error('Ошибка при получении данных о валютах:', error)
        })
    },
    updateAvailableCurrencies() {
      const currencies = new Set()
      Object.keys(this.rates).forEach((key) => {
        key.split('-').forEach((currency) => currencies.add(currency.toUpperCase()))
      })
      this.availableCurrencies = Array.from(currencies)
    },
    setBaseCurrency(currency) {
      this.baseCurrency = currency
    },
  },
})
