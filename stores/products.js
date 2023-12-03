import { defineStore } from "pinia";

export const useProductStore = defineStore("products", () => {
  const products = ref([]);
  const product = ref([]);
  const total = ref(0);
  const isLoading = ref(false);

  const productsData = computed(() => products.value);
  const productData = computed(() => product.value);


  function setProduct(data) {
    product.value = data;
  }
  function setProducts({ data, totalCount }) {
    products.value = data;
    total.value = totalCount;
  }
  function setLoader(data) {
    isLoading.value = data;
  }

  return {
    total,
    product,
    products,
    productsData,
    productData,
    setProducts,
    setProduct,
    isLoading,
    setLoader
  };
});
