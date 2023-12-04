import { defineStore } from "pinia";
import { createcart, updatecart, removecartitem } from "~/services/cartservice"; // Make sure to import updatecart
import { useAuthStore } from "./auth";

export const useCartStore = defineStore("cart", () => {
  const authStore = useAuthStore();
  const cartItems = ref([]);
  const tax = ref(0);

  const cart = computed(() => cartItems.value);
  const cartTotal = computed(() => cartItems.value.length);
  const cartTotalAmount = computed(() =>
    cartItems.value
      .map((item) => item.packagePrice * item.quantity)
      .reduce((a, b) => Number(a) + Number(b), 0)
  );
  function setTax(value) {
    tax.value = value;
  }

  function setCart(data) {
    cartItems.value = data;
  }

  async function addToCart(item, type) {
    if (
      cartItems.value.some((ct) => ct.productId == item.productId) &&
      cartItems.value.some((ct) => ct.packageId == item.packageId)
    ) {
      return { status: false, message: type };
    }
    if (!authStore.isLoggedIn) {
      cartItems.value = [...cartItems.value, item];
      localStorage.setItem("cartItems", JSON.parse(cartItems.value))
      return;
    }
    // Use async/await for cleaner code
    const cartOperation = cartTotal.value ? updateCartAsync : createCartAsync;

    // Assuming updatecart and createcart are async functions
    const res = await cartOperation(item);

    if (res) {
      cartItems.value = [...cartItems.value, item];
      return { status: true, message: type };
      // Handle success if needed
    } else {
      // Handle error if needed
    }
  }
  async function updateCartAsync(item, type) {
    // Assuming updatecart is an async function
    return await updatecart(item);
  }
  async function updateCart(item) {
    if (authStore.isLoggedIn) {
      updatecart(item).then((res) => {
        if (res.status == 200) {
          cartItems.value = cartItems.value.map((dt) => {
            if (item.id == dt.id) {
              dt.quantity = item.quantity;
            }
            return dt;
          });
        }
      });
    } else {
      cartItems.value = cartItems.value.map((dt) => {
        if (item.id == dt.id) {
          dt.quantity = item.quantity;
        }
        return dt;
      });
      localStorage.setItem("cartItems", JSON.parse(cartItems.value))
    }
  }

  async function createCartAsync(item) {
    // Assuming createcart is an async function
    return await createcart({ items: [item] });
  }
  function removeFromCart(id) {
    if (authStore.isLoggedIn) {
      removecartitem(id).then((res) => {
        if (res.status === 200) {
          cartItems.value = cartItems.value.filter((item) => item.id !== id);
        }
      });
    } else {
      cartItems.value = cartItems.value.filter((item) => item.id !== id);
      localStorage.setItem("cartItems", JSON.parse(cartItems.value))
    }
  }

  function clearCart() {
    cartItems.value = [];
    localStorage.removeItem("cartItems")
  }

  return {
    tax,
    cart,
    setCart,
    addToCart,
    clearCart,
    removeFromCart,
    cartTotalAmount,
    cartTotal,
    setTax,
    updateCart,
  };
});
