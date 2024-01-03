<template>
  <div class="flex justify-between items-center mb-8">
    <div class="flex gap-x-4">
      <div class="relative flex items-center">
        <input
          v-model="queryParams.Search"
          @change="getRequestDoc()"
          @keyup="debounceSearch"
          :class="
            queryParams.Search.length && 'pl-3 pr-10 rounded-lg w-[280px]'
          "
          class="border focus:pl-3 focus:pr-10 rounded-full focus:rounded-lg h-12 peer focus:w-[280px] focus:outline-matta-black/20 w-12 border-[#E7EBEE] transition ease-in-out duration-300"
          type="search"
        />
        <span class="absolute right-4 peer-focus:right-3 pointer-events-none"
          ><i class="uil uil-search"></i
        ></span>
      </div>

      <div class="">
        <FormsCustomSelect
          placeholder="Status"
          :options="statusOptions"
          v-model="queryParams.RequestStatus"
          classStyles="px-8 py-3 h-[50px] text-base border-[#E7EBEE] border rounded-full"
        />
      </div>
    </div>
    <span class="flex gap-x-3">
      <span
        @click="toggleOrder"
        class="flex items-center justify-center cursor-pointer border border-[#E7EBEE] rounded-full h-12 w-12"
      >
         <img src="~/assets/img/sorting.svg" alt="alt"
      /></span>
    </span>
  </div>

  <div v-if="requests.length">
    <table class="w-full">
      <thead>
        <tr>
          <th
            v-for="item in theads"
            :key="item"
            class="uppercase text-[#B6B7B9] text-[13px] text-left font-normal border-b py-6 px-3 border-[#E7EBEE]"
          >
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in requests" :key="item">
          <td
            :class="item.status == 3 ? 'opacity-25' : ''"
            class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE]"
          >
            {{ moment(item.created).format("l") }}
          </td>
          <td
            :class="item.status == 3 ? 'opacity-25' : ''"
            class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE]"
          >
            {{ item.requestNumber }}
          </td>

          <td
            class="capitalize text-matta-black text-[13px] border-b py-6 px-3 border-[#E7EBEE] whitespace-nowrap"
          >
            {{ item.businessName }}
          </td>
          <td
            :class="item.status == 3 ? 'opacity-25' : ''"
            class="text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE]"
          >
            {{ item.email }}
          </td>
          <td
            :class="item.status == 3 ? 'opacity-25' : ''"
            class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE]"
          >
            {{ item.chemicalName }}
          </td>

          <td
            :class="item.status == 3 ? 'opacity-25' : ''"
            class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE]"
          >
            <Menu class="relative" as="div">
              <MenuButton class="outline-none">
                <i class="uil uil-ellipsis-h"></i>
              </MenuButton>
              <MenuItems
                class="absolute z-[999] bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] py-2 right-0 min-w-[180px] rounded-xl overflow-hidden"
              >
                <div
                  class="py-2 px-5 hover:bg-gray-50 text-sm whitespace-nowrap cursor-pointer"
                  @click="openRequest(item)"
                >
                  <i class="uil uil-file mr-2"></i> Open Request
                </div>
              </MenuItems>
            </Menu>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <EmptyData
    v-else
    url="/markets"
    buttonText="go to catalog"
    text="No product request have been made"
  />
  <div
    v-if="multi.length"
    class="px-6 py-5 rounded-lg bg-white flex justify-between items-center text-[13px]"
  >
    <span class="flex items-center gap-x-3">
      <span>{{ multi.length }} items selected</span>
      <span class="text-gray-300">|</span>
      <span class="flex gap-x-3 items-center">
        <button class="uppercase px-2" @click="selectall">select all</button>
        <button class="uppercase px-2" @click="multi = []">
          deselect
        </button></span
      ></span
    >
    <span class="flex gap-x-4 items-center">
      <!-- <button
        class="py-4 px-5 uppercase bg-primary-500 text-white rounded-lg hover:bg-primary/80"
      >
        add to card
      </button> -->

      <button
        class="bg-[#E7EBEE] text-matta-black rounded-lg px-5 py-4 uppercase"
      >
        set as cancelled
      </button></span
    >
  </div>
  <Pagination
    :total="queryParams.totalCount"
    :current="queryParams.PageNumber"
    :per-page="queryParams.PageSize"
    :pageRange="5"
    @page-changed="queryParams.PageNumber = $event"
  />
  <SideModal :isOpen="isOpen" @togglePopup="isOpen = false" v-if="isOpen">
    <template #content>
      <div
        class="h-full w-full bg-white rounded-lg p-6 lg:p-8 overflow-auto max-h-full"
      >
        <div class="mb-3">
          <p class="text-[13px] text-[#B6B7B9] mb-2">Request No</p>
          <h2 class="font-medium text-2xl">{{ request.requestNumber }}</h2>
        </div>

        <hr class="my-3 border-gray-200" />
        <SupplierMyrequestsProductDetail :request="request" />
      </div>
    </template>
  </SideModal>
</template>

<script setup>
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import moment from "moment";
import debounce from "lodash/debounce";
import { getproductrequests } from "~/services/productservices";

const multi = ref([]);
const requests = ref([]);
const isOpen = ref(false);
const request = ref({});
const theads = ["date", "request no", "business", "email", "chemical", ""];

function openRequest(item) {
  request.value = item;
  isOpen.value = true;
}

defineProps(["title"]);

onMounted(() => {
  getRequestDoc();
});

const queryParams = reactive({
  SupplierId: "",
  RequestStatus: "",
  ProducerId: "",
  ProductId: "",
  Search: "",
  SortOrder: "",
  PageNumber: 1,
  PageSize: 10,
});
const isLoading = ref(true);

function selectall() {
  multi.value = requests.value.map((i) => i.id);
}
function getRequestDoc() {
  isLoading.value = true;
  getproductrequests(queryParams).then((res) => {
    requests.value = res.data.data.data;
    queryParams.totalCount = res.data.data.totalCount;
    isLoading.value = false;
  });
}
function next() {
  queryParams.PageNumber++;
}
function toggleOrder() {
  queryParams.SortOrder == "A"
    ? (queryParams.SortOrder = "D")
    : (queryParams.SortOrder = "A");
}
function prev() {
  if (queryParams.PageNumber == 1) return;
  queryParams.PageNumber--;
}
const statusOptions = [
  {
    id: 0,
    text1: "New",
  },
  {
    id: 1,
    text1: "In Progress",
  },
];

const debounceSearch = debounce(() => {
  getRequestDoc();
}, 800);
watch(
  () => [queryParams.Search],
  () => {
    debounceSearch();
  }
);
watch(
  () => [queryParams.PageNumber],
  () => {
    getRequestDoc();
  }
);
provide("request", request);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
