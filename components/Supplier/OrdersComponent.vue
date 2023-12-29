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
            Orders
          </h1>
          <span class="mt-3">/</span>
          <span class="text-primary text-3xl lg:text-[48px]">{{
            queryParams.totalCount || 0
          }}</span>
        </div>
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-y-6 md:gap-y-0">
          <p class="text-sm lg:text-base">
            List of orders received by your storefront.
          </p>
          <router-link to="/markets">
            <button
              class="px-6 py-3 rounded-lg text-white bg-matta-black hover:opacity-70 text-sm"
            >
              Create an order
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="p-6 lg:p-8 rounded-lg bg-white">
      <div class="hidden lg:flex justify-between items-center mb-8">
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
          url="/market"
          buttonText="go to catalog"
          text="No orders have been placed"
        />
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
          <h2 class="font-medium text-2xl">#{{ order.orderId }}</h2>
        </div>

        <hr class="my-3 border-gray-200" />
        <OrderComponent :order="order" />
      </div>
    </template>
  </SideModal>
</template>

<script setup>
import { useRoute } from "vue-router";
import OrderComponent from "./OrderComponent";
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import debounce from "lodash/debounce";
import {
  storefrontorders,
  storefrontorderdetails,
} from "~/services/storefrontservice";
import moment from "moment";
import { useToast } from "vue-toastification";

const toast = useToast();
onMounted(() => {
  getData();
});
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
function getData() {
  isLoading.value = true;
  storefrontorders(queryParams)
    .then((res) => {
      if (res.status) {
        orders.value = res.data.data;
        queryParams.totalCount = res.data.totalCount;
        isLoading.value = false;
      }
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error(err.response.data.Message);
    });
}
const route = useRoute();
defineProps(["title"]);

const order = ref(null);
const isOpen = ref(false);

function openOrder(val) {
  storefrontorderdetails(val.id)
    .then((res) => {
      order.value = { ...res.data, orderId: val.orderNumber };

      isOpen.value = true;
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error(err.response.data.Message);
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
  () => [queryParams.PageNumber, queryParams.PageSize],
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
