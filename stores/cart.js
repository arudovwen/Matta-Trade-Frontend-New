import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref([]);

  const cart = computed(() => cartItems.value);
  const cartTotal = computed(() => cartItems.value.length);
  const cartTotalAmount = computed(() =>
    cartItems.value
      .map((item) => item.packagePrice * item.quantity)
      .reduce((a, b) => {
        return Number(a) + Number(b);
      }, 0)
  );

  function setCart(data) {
    cartItems.value = data;
  }

  function addToCart(item) {
    cartItems.value = [...cartItems.value, item];
  }

  function removeFromCart(packageId) {
    cartItems.value = cartItems.value.filter(
      (item) => item.packageId !== packageId
    );
  }

  function clearCart() {
    cartItems.value = [];
  }

  return {
    cart,
    setCart,
    addToCart,
    clearCart,
    removeFromCart,
    cartTotalAmount,
    cartTotal
  };
});
