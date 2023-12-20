import { defineStore } from "pinia";
import {
  createcart,
  updatecart,
  removecartitem,
  getcart,
} from "~/services/cartservice";
import { useAuthStore } from "./auth";
import {useToast} from "vue-toastification";

export const useCartStore = defineStore("cart", () => {
  const toast = useToast()
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

  function getMyCart() {
    getcart().then((res) => {
      if (res.status === 200) {
        setCart(res.data.data.items);
        setTax(res.data.data.tax);
      }
    });
  }
  function setTax(value) {
    tax.value = value;
  }

  function setCart(data) {
    cartItems.value = data;
  }

  async function addToCart(item, type) {
    if (
      cartItems.value.some((ct) => ct.productId === item.productId) &&
      cartItems.value.some((ct) => ct.packageId === item.packageId)
    ) {
      return { status: false, message: type };
    }

    if (!authStore.isLoggedIn) {
      cartItems.value = [...cartItems.value, item];
      localStorage.setItem("cartItems", JSON.stringify(cartItems.value));
      return { status: true, message: type };
    }

    const cartOperation = cartTotal.value ? updateCartAsync : createCartAsync;

    try {
      const res = await cartOperation(item);
      if (res.status == 200) {
        getMyCart();
        cartItems.value = [...cartItems.value, item];
        return { status: true, message: type };
      }
    } catch (error) {
     
      toast.error(error.response.data.Message)
      return { status: false, message: "Error adding to cart" };
    }
  }

  async function updateCartAsync(item) {
    return await updatecart(item);
  }

  function updateCart(item) {
    if (authStore.isLoggedIn) {
      updatecart(item).then((res) => {
        if (res.status === 200) {
          cartItems.value = cartItems.value.map((dt) => {
            if (item.id === dt.id) {
              dt.quantity = item.quantity;
            }
            return dt;
          });
        }
      });
    } else {
      cartItems.value = cartItems.value.map((dt) => {
        if (item.id === dt.id) {
          dt.quantity = item.quantity;
        }
        return dt;
      });
      localStorage.setItem("cartItems", JSON.stringify(cartItems.value));
    }
  }

  async function createCartAsync(item) {
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
      localStorage.setItem("cartItems", JSON.stringify(cartItems.value));
    }
  }

  function clearCart() {
    cartItems.value = [];
    localStorage.setItem("cartItems", JSON.stringify([]));
  }

  return {
    tax,
    cart,
    setCart,
    getMyCart,
    addToCart,
    clearCart,
    removeFromCart,
    cartTotalAmount,
    cartTotal,
    setTax,
    updateCart,
  };
});
