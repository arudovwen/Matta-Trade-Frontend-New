<template>
  <div class="gap-y-2 flex flex-col mb-4">
    <!-- Top bar   -->
    <div class="p-6 lg:p-8 bg-white rounded-lg bg-img">
      <div class="mb-12"><Breadcrumbs /></div>
      <div class="">
        <div class="flex gap-x-3 items-center mb-3">
          <h1
            class="text-3xl lg:text-[48px] text-matta-black col-span-1 font-medium capitalize"
          >
           My orders
          </h1>
          <span class="mt-3">/</span>
          <span class="text-primary text-3xl lg:text-[48px]">{{
            queryParams.totalCount || 0
          }}</span>
        </div>

        <div class="">
          <p class="text-sm lg:text-base mb-6">
            Manage your recent orders and invoices.
          </p>

          <div class="flex gap-x-4 justify-end">
            <button
              @click="isShowing = 'all'"
              :class="`px-6 py-3 border border-matta-black rounded-lg text-[13px] capitalize hover:opacity-60 ${
                isShowing === 'all'
                  ? 'bg-matta-black text-white'
                  : 'text-matta-black'
              }
            `"
            >
              All orders
            </button>
            <button
              @click="isShowing = 'pending'"
              :class="`px-6 py-3 border border-matta-black rounded-lg text-[13px] capitalize hover:opacity-60 flex gap-x-2 ${
                isShowing === 'pending'
                  ? 'bg-matta-black text-white'
                  : 'text-matta-black'
              }
           `"
            >
              Pending checkout
              <span
                class="h-4 w-4 text-[11px] rounded-full border border-matta-black flex items-center justify-center"
                :class="
                  isShowing === 'pending'
                    ? 'text-matta-black bg-white'
                    : 'bg-matta-black text-white'
                "
                v-if="pendingCheckout && pendingCheckout?.items?.length"
                >{{ pendingCheckout?.items?.length }}</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="p-6 lg:p-8 rounded-lg bg-white" v-if="isShowing === 'all'">
      <div
        class="hidden lg:flex justify-between items-center mb-8"
        v="!isEmpty"
      >
        <div class="flex gap-x-4">
          <div class="relative flex items-center">
            <input
              v-model="queryParams.Search"
              @change="getData()"
              @keyup="debounceSearch"
              :class="
                queryParams.Search.length && 'pl-3 pr-10 rounded-lg w-[280px]'
              "
              class="border focus:pl-3 focus:pr-10 rounded-full focus:rounded-lg h-12 peer focus:w-[280px] focus:outline-matta-black/20 w-12 border-[#E7EBEE] transition ease-in-out duration-300"
              type="search"
            />
            <span
              class="absolute right-4 peer-focus:right-3 pointer-events-none"
              ><i class="uil uil-search"></i
            ></span>
          </div>
          <div class="flex relative items-center">
            <select
              @change="getData()"
              v-model="queryParams.Status"
              class="appearance-none border border-[#E7EBEE] rounded-full px-8 py-3 focus:outline-matta-black/20"
            >
              <option value="">Status</option>
              <option value="0">Pending</option>
              <option value="1">Completed</option>
            </select>
            <i
              class="uil uil-angle-down absolute right-2 pointer-events-none"
            ></i>
          </div>
          <!-- <div class="flex relative items-center">
            <select
              class="appearance-none border border-[#E7EBEE] rounded-full px-8 py-3"
            >
              <option>Payment Type</option>
            </select>
            <i
              class="uil uil-angle-down absolute right-2 pointer-events-none"
            ></i>
          </div> -->
          <div class="flex relative items-center">
            <select
              v-model="queryParams.PageSize"
              class="appearance-none border border-[#E7EBEE] rounded-full px-8 py-3 focus:outline-matta-black/20"
            >
              <option value="" disabled>Total</option>
              <option value="5">5 records</option>
              <option value="10">10 records</option>
              <option value="20">20 records</option>
              <option value="30">30 records</option>
              <option value="40">40 records</option>
            </select>
            <i
              class="uil uil-angle-down absolute right-2 pointer-events-none"
            ></i>
          </div>
        </div>
        <span class="flex gap-x-3" @click="toggleOrder">
          <span
            class="flex items-center justify-center border border-[#E7EBEE] rounded-full h-12 w-12"
          >
             <img src="~/assets/img/sorting.svg" alt="alt"
          /></span>
        </span>
      </div>
      <div v-if="!isLoading">
        <div
          class="overflow-x-auto max-w-[80vw] lg:max-w-full"
          v-if="orders.length"
        >
          <table class="w-full" v-if="orders.length">
            <thead>
              <tr>
                <th
                  v-for="item in theads"
                  :key="item"
                  class="uppercase text-[#B6B7B9] text-[13px] text-left font-normal border-b py-6 px-3 border-[#E7EBEE] whitespace-nowrap"
                >
                  {{ item }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in orders" :key="item">
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE] whitespace-nowrap"
                >
                  {{ item.orderNumber }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE] whitespace-nowrap"
                >
                  {{ moment(item.orderDate).format("lll") }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE] whitespace-nowrap"
                >
                  <span
                    v-if="item.statusText == 'invoiced'"
                    class="px-2 py-1 text-xs rounded-lg bg-[#E0F7B0]"
                  >
                    Completed</span
                  >
                  <span
                    v-if="item.statusText !== 'invoiced'"
                    class="px-2 py-1 text-xs rounded-lg bg-[#FDD0AF]"
                  >
                    In progress</span
                  >
                </td>

                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE] whitespace-nowrap"
                >
                  {{
                    item.scheduleDeilverDate
                      ? moment(item.scheduleDeilverDate)?.format("lll")
                      : moment()?.format("lll")
                  }}
                </td>

                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE]"
                >
                  <Menu class="relative" as="div">
                    <MenuButton class="outline-none">
                      <i class="uil uil-ellipsis-h"></i>
                    </MenuButton>
                    <MenuItems
                      class="absolute z-[999] bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] py-2 right-0 min-w-[140px] rounded-xl overflow-hidden"
                    >
                      <div
                        class="py-2 px-4 hover:bg-gray-50 text-sm whitespace-nowrap"
                        @click="openOrder(item)"
                      >
                        <i class="uil uil-box mr-2"></i> Open order
                      </div>
                    </MenuItems>
                  </Menu>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <EmptyData
          v-if="!orders.length"
          url="/markets"
          buttonText="go to catalog"
          text="No orders have been placed"
        />
      </div>
    </div>
    <div class="p-6 lg:p-8 rounded-lg bg-white" v-if="isShowing === 'pending'">
      <div
        v-for="(item, idx) in pendingCheckout.items"
        :key="idx"
        class="p-6 relative rounded-lg bg-white border mb-4"
      >
        <p class="mb-1 text-[13px] uppercase">
          {{ item.producer }}
        </p>
        <p class="mb-2 text-lg lg:text-xl font-medium">
          {{ item.product }}
        </p>
        <!-- <p class="mb-6">
          <i class="uil uil-store mr-1"></i>
        </p> -->

        <span
          class="top-3 right-3 absolute cursor-pointer"
          @click="removeItem(item.id)"
          ><i class="uil uil-times text-2xl text-matta-black"></i
        ></span>
        <div class="flex flex-col lg:flex-row items-center gap-3 mb-4 w-full">
          <div
            class="flex items-center bg-[#F1F3F5] rounded-lg relative flex-1 w-full lg:w-auto pr-4"
          >
            <div class="relative w-full flex justify-between items-center">
              <div
                class="py-4 text-[13px] px-6 bg-transparent capitlize md:uppercase text-matta-black w-full text-left"
              >
                <span class="text-[#101828] text-[13px]">{{
                  item.selectedPackage
                }}</span>
              </div>

              <div
                :class="[
                  'relative text-matta-black flex items-center justify-between py-4 gap-x-4',
                ]"
              >
                <span class="text-gray-700 whitespace-nowrap">
                  <span class="text-[13px] whitespace-nowrap">
                    {{ currencyFormat(item.packagePrice) }}</span
                  >
                  <!-- /<span class="text-[13px] whitespace-nowrap">
                      {{ cartItem.selectedPackageData.unit }}</span
                    > -->
                </span>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col lg:flex-row gap-3 items-center w-full lg:w-auto"
          >
            <div
              class="flex items-center justify-between lg:w-[250px] lg:justify-center gap-x-8 lg:gap-x-16 w-full rounded-lg bg-[#F1F3F5] relative py-4 text-[13px] px-6 uppercase text-matta-black"
            >
              <div class="w-[50px] text-center">x {{ item.quantity }}</div>
            </div>
            <div
              class="font-medium text-xl text-center lg:text-right whitespace-nowrap w-[200px]"
            >
              {{ currencyFormat(item.subTotal) }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex justify-end gap-x-10 mb-10 items-center"
        v-if="pendingCheckout?.items?.length"
      >
        <div class="text-[#ABABAB] text-sm uppercase">Item total</div>
        <div class="text-2xl text-right font-medium">
          {{ currencyFormat(pendingCheckout.cartTotal) }}
        </div>
      </div>
      <div class="flex justify-end mt-4" v-if="pendingCheckout?.items?.length">
        <router-link to="/checkout">
          <button
            class="uppercase text-white bg-primary-500 py-4 px-6 rounded-lg text-[13px] mb-6 disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
          >
            Proceed to checkout
          </button>
        </router-link>
      </div>
      <div
        v-if="!pendingCheckout?.items?.length"
        class="text-center py-20 text-lg"
      >
        No pending checkout
      </div>
    </div>
  </div>
  <div class="text-center p-6 lg:p-8 my-20" v-if="isLoading">
     <AppLoader />
  </div>
  <Pagination
    :total="queryParams.totalCount"
    :current="queryParams.PageNumber"
    :per-page="queryParams.PageSize"
    :pageRange="5"
    @page-changed="queryParams.PageNumber = $event"
  />
  <SideModal :isOpen="isOpen" @togglePopup="openModal">
    <template #content>
      <div
        class="h-full w-full bg-white rounded-lg p-6 lg:p-8 overflow-auto max-h-full"
      >
        <div class="mb-3">
          <p class="text-[13px] text-[#B6B7B9] mb-2">Order ID</p>
          <h2 class="font-medium text-2xl" v-if="order">
            #{{ order.orderId }}
          </h2>
        </div>

        <hr class="my-3 border-gray-200" />
        <SupplierOrderComponent :order="order" :timeline="timeline" />
      </div>
    </template>
  </SideModal>
</template>

<script setup>
import { useRoute } from "vue-router";
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import debounce from "lodash/debounce";
import {
  procurementorders,
  procurementorderdetails,
  buyerordertimeline,
} from "~/services/orderservice";
import moment from "moment";
import { toast } from 'vue3-toastify';
import { getcart, removecartitem } from "~/services/cartservice";


onMounted(() => {
  getData();
  fetchCart();
});
const isShowing = ref("all");
const pendingCheckout = ref({});

const timeline = ref([]);
const orders = ref([]);
const queryParams = reactive({
  Status: "",
  SortOrder: "",
  Role: "",
  PageSize: 10,
  PageNumber: 1,
  pagecount: 0,
  totalCount: 0,
  Search: "",
});
const isLoading = ref(true);
function fetchCart() {
  getcart().then((res) => {
    if (res.status === 200) {
      pendingCheckout.value = res.data.data;
    }
  });
}
function removeItem(id) {
  removecartitem(id).then((res) => {
    if (res.status === 200) {
      fetchCart();
    }
  });
}
function getData() {
  isLoading.value = true;
  procurementorders(queryParams)
    .then((res) => {
      if (res.status) {
        orders.value = res.data.data;
        queryParams.totalCount = res.data.totalCount;
        isLoading.value = false;
      }
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error((err.response.data.message || err.response.data.Message));
    });
}
const route = useRoute();
defineProps(["title"]);

const order = ref(null);
const isOpen = ref(false);

function openOrder(val) {
  procurementorderdetails(val.salesorderId)
    .then((res) => {
      order.value = { ...res.data, orderId: val.orderNumber };

      isOpen.value = true;
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error((err.response.data.message || err.response.data.Message));
    });
  buyerordertimeline(val.salesorderId)
    .then((res) => {
      timeline.value = res.data.data.reverse();
      isOpen.value = true;
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error((err.response.data.message || err.response.data.Message));
    });
}

function openModal() {
  isOpen.value = !isOpen.value;
}

const theads = ["order id", "created", "status", "scheduled delivery date", ""];

function next() {
  queryParams.PageNumber++;
  getData();
}
function toggleOrder() {
  queryParams.SortOrder == "A"
    ? (queryParams.SortOrder = "D")
    : (queryParams.SortOrder = "A");
  getData();
}
function prev() {
  if (queryParams.PageNumber == 1) return;
  queryParams.PageNumber--;
  getData();
}

const debounceSearch = debounce(() => {
  getData();
}, 800);
watch(
  () => queryParams.PageSize,
  () => {
    getData();
  }
);
watch(
  () => queryParams.PageNumber,
  () => {
    getData();
  }
);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
