<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col h-full overflow-y-auto max-w-[350px]"
  >
    <div class="flex-1">
      <div class="flex justify-between items-center mb-6">
        <h4 class="text-lg sm:text-2xl font-medium">Request a Sample</h4>
      </div>
      <!-- <article class="" v-if="supplier">
        <div class="flex items-center gap-x-4 mb-6">
          <div
            class="w-20 h-20 rounded-xl bg-white flex items-center justify-center"
          >
            <img :src="supplier.logo" class="rounded-xl" alt="alt" />
          </div>
          <div>
            <p class="font-medium text-base text-matta-black capitalize">
              {{ supplier.companyName }}
            </p>
            <p class="font-normal text-sm text-matta-black capitalize">
              <i class="uil uil-map-marker"></i> {{ supplier.city }},
              {{ supplier.country }}
            </p>
          </div>
        </div>
      </article> -->

      <div class="flex justify-between items-center mb-2 text-[13px] uppercase">
        <h4 class="text-[13px] uppercase">{{ product.name }}</h4>
        <span>Step {{ active }}/3</span>
      </div>
      <div class="grid grid-cols-3 border-b border-[#E7EBEE]">
        <span
          v-for="n in 3"
          :key="n"
          :class="`rounded-full pt-1 ${
            active >= n ? 'bg-primary' : 'bg-white'
          }`"
        ></span>
      </div>
      <div>
        <UsageDetails v-if="active === 1" />
        <div v-if="active === 2 && !showAuth">
          <ShippingAddress />
        </div>
        <RequestComplete v-if="active === 3" />
        <RegisterComponent v-if="active === 2 && showAuth" />
      </div>
    </div>
    <div v-if="active !== 3">
      <span
        @click="isOpen = true"
        class="mb-2 text-primary text-xs"
        v-if="!isLoggedIn"
        >Log In to speed up your request
        <i class="uil uil-arrow-up-right text-x"></i
      ></span>
      <div class="flex justify-between gap-x-2 items-center mt-8">
        <button
          @click="emit('togglePopup')"
          type="button"
          class="appearance-none border w-1/2 leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 text-[13px] uppercase"
        >
          Cancel
        </button>
        <button
          v-if="active > 1"
          @click="active--"
          type="button"
          class="appearance-none border w-1/2 leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 text-[13px] uppercase"
        >
          Back
        </button>
        <button
          @click="toggleNext"
          type="button"
          class="appearance-none border w-1/2 border-primary leading-none px-8 py-3 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase"
        >
          Next
        </button>
      </div>
    </div>
    <div v-if="active === 3">
      <div class="flex justify-between gap-x-2 items-center mt-8">
        <router-link to="/procurement/my-requests">
          <button
            type="button"
            class="appearance-none border w-full leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 text-[13px] uppercase"
          >
            My Requests
          </button>
        </router-link>

        <button
          @click="togglePopup"
          type="button"
          class="appearance-none border w-full border-primary leading-none px-8 py-3 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase"
        >
          product page
        </button>
      </div>
    </div>
  </form>
  <LoginModal
    v-if="isOpen"
    :showSignup="false"
    :isOpen="isOpen"
    @close="handleclose"
  />
</template>
<script setup>
import UsageDetails from "./UsageDetails";
import ShippingAddress from "./ShippingAddress";
import RequestComplete from "./RequestComplete";
import LoginModal from "~/components/LoginModal";
import RegisterComponent from "./RegisterComponent";
import { ref, defineEmits, provide, computed, reactive, inject } from "vue";
import { useStore } from "vuex";
import { addrequest } from "~/services/procurementservice";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  numeric,
  // helpers,
  // minLength,
  // maxLength,
} from "@vuelidate/validators";
import { useToast } from "vue-toastification";

const togglePopup = inject("togglePopup");
const product = inject("product");
const supplier = inject("supplier");
const sampleForm = reactive({
  sellerId: product.value?.supplierId,
  seller: supplier.value?.companyName,
  productId: product.value?.id,
  productImg: product.value?.gallery[0],
  productName: product.value?.name,
  producerId: product.value?.producer.id,
  producer: product.value?.producer.title,
  numberofSamples: 1,
  expectedAnualUsage: 1,
  description: "None",
  email: "",
  phone: "",
  shippingAddressId: null,
  addressDescription: "",
});

const toast = useToast();
const store = useStore();
const showAuth = ref(false);
const isOpen = ref(false);
const active = ref(1);
const emit = defineEmits(["togglePopup"]);
const isLoading = ref(false);
const authType = ref("login");
const myrules1 = {
  numberofSamples: { required },
  expectedAnualUsage: { required },
  description: {},
};
const myrules2 = {
  email: { required, email },
  phone: { required, numeric },
  shippingAddressId: { required },
  addressDescription: { required },
};

const request1$ = useVuelidate(myrules1, sampleForm);
const request2$ = useVuelidate(myrules2, sampleForm);
async function handleSubmit() {
  const validity1 = await request1$.value.$validate();
  const validity2 = await request2$.value.$validate();
  if (!validity1 || !validity2) return;
  isLoading.value = true;
  addrequest(sampleForm)
    .then((res) => {
      if (res.status === 200) {
        active.value = 3;
      }
    })

    .catch((err) => {
      isLoading.value = false;

      toast.error(err.response.data.Message);
    });
}
function toggleAuth() {
  isOpen.value = true;
}
function toggleModal(val) {
  authType.value = val;
}
const isLoggedIn = computed(() => {
  return store.getters.isLoggedIn;
});
async function toggleNext() {
  if (active.value == 1) {
    const validity = await request1$.value.$validate();
    if (!validity) {
      return;
    }
  }
  if (active.value == 2) {
    const validity1 = await request2$.value.$validate();
    if (!validity1) {
      return;
    }
  }
  if (active.value == 2 && !isLoggedIn.value) {
    showAuth.value = true;
    return;
  }
  if (active.value == 2 && isLoggedIn.value) {
    handleSubmit();
    return;
  }
  active.value++;
}
function handleclose() {
  isOpen.value = false;
  if (active.value == 2) {
    handleSubmit();
  } else {
    showAuth.value = false;
  }
}
provide("handleSubmit", handleSubmit);
provide("toggleModal", toggleModal);
provide("toggleAuth", toggleAuth);
provide("request1$", request1$);
provide("request2$", request2$);
provide("sampleForm", sampleForm);
</script>
