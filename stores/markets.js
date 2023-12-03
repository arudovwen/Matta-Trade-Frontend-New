import { defineStore } from "pinia";

export const useMarketStore = defineStore("markets", () => {
  const markets = ref([]);

  const marketsData = computed(() => markets.value);

  function setMarkets(data) {
    markets.value = data;
  }

  return { markets, marketsData, setMarkets };
});
