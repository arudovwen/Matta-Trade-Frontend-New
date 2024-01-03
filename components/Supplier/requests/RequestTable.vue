<template>
  <div  v-if="!isLoading" class="mb-4">
    <div class="hidden lg:flex justify-between items-center mb-8">
    <div class="flex gap-x-4">
      <div class="relative flex items-center">
        <input
          v-model="queryParams.Search"
          @change="getRequests()"
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
  <div
    v-if="requests.length"
    class="overflow-x-auto max-w-[80vw] lg:max-w-full pb-20"
  >
    <table class="w-full">
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
        <tr v-for="item in requests" :key="item">
          <td
            class="capitalize text-matta-black text-[13px] border-b py-6 px-3 border-[#E7EBEE] whitespace-nowrap"
          >
            <div class="flex items-center">
              <input
                type="checkbox"
                v-model="multi"
                class="accent-matta-black mr-4"
                :value="item.id"
              />
              <span
                v-if="item.inage"
                class="mr-3 h-10 w-10 rounded-lg flex items-center justify-center border border-[#E7EBEE] p-2 whitespace-nowra"
              >
                 <NuxtImg class="" alt="alt" :src="item.image" />
              </span>
              <i v-else class="fas fa-image text-[40px] mr-3 text-gray-400"></i>
              <span :class="item.status == 4 ? 'opacity-25' : ''">
                <span class="text-sm font-medium">
                  {{ item.productName }}
                </span>
                <br />
                <span class="text-xs font-normal">
                  {{ item.producer }}
                </span>
              </span>
            </div>
          </td>
          <td
            :class="item.status == 3 ? 'opacity-25' : ''"
            class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE] whitespace-nowra"
          >
            {{ moment(item.created).format("lll") }}
          </td>
          <td
            class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE] whitespace-nowra"
          >
            <span
              v-if="item.requestStatus == 0"
              class="px-2 py-1 text-xs rounded-lg bg-[#D0C9FF]"
            >
              New</span
            >
            <span
              v-if="item.requestStatus == 1"
              class="px-2 py-1 text-xs rounded-lg bg-[#F9CBE4]"
            >
              In progress</span
            >

            <span
              v-if="item.status == 2"
              class="px-2 py-1 text-xs rounded-lg bg-[#BBE5AC]"
            >
              Shipped</span
            >
            <span
              v-if="item.requestStatus == 3"
              class="px-2 py-1 text-xs rounded-lg border opacity-25"
            >
              Completed</span
            >
          </td>

          <td
            :class="item.status == 3 ? 'opacity-25' : ''"
            class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE] relative"
          >
            <Menu class="relative" as="div">
              <MenuButton class="outline-none">
                <i class="uil uil-ellipsis-h"></i>
              </MenuButton>
              <MenuItems
                class="absolute z-[999] bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] py-2 right-0 min-w-[140px] rounded-xl overflow-hidden"
              >
                <div
                  class="py-2 px-4 hover:bg-gray-50 text-sm whitespace-nowrap cursor-pointer"
                  @click="openRequests(item.id)"
                >
                  <i class="uil uil-box mr-2"></i> Open Request
                </div>

                <div
                  v-if="canCancel"
                  class="py-2 px-4 hover:bg-gray-50 text-sm whitespace-nowrap"
                  @click="handleCancel(item.id)"
                >
                  <i class="uil uil-trash mr-2"></i> Set as Cancelled
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
    text="No sample request have been made"
  />
  </div>
  <div class="text-center p-6 lg:p-8 my-20" v-if="isLoading">
   <AppLoader />
  </div>
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
  <SideModal
    :isOpen="isRequestOpen"
    @togglePopup="isRequestOpen = false"
    v-if="isRequestOpen"
  >
    <template #content>
      <div
        class="h-full w-full bg-white rounded-lg p-6 lg:p-8 overflow-auto max-h-full"
      >
        <div class="mb-3">
          <p class="text-[13px] text-[#B6B7B9] mb-2">Request ID</p>
          <h2 class="font-medium text-2xl">{{ request.requestNumber }}</h2>
        </div>

        <hr class="my-3 border-gray-200" />
        <SupplierRequestsRequestComponent />
      </div>
    </template>
  </SideModal>
</template>

<script setup>
import moment from "moment";
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import {
  samplerequests,
  samplerequestdetails,
} from "~/services/requestservice";
import debounce from "lodash/debounce";

const theads = ["product", "created", "status", ""];
const isRequestOpen = ref(false);

const requests = ref([]);
const multi = ref([]);
defineProps(["title", "canCancel"]);

onMounted(() => {
  getRequests();
});
const request = ref({});
// function cancelRequest() {
//   isOpen.value = true;
// }
function openRequests(val) {
  samplerequestdetails(val).then((res) => {
    request.value = res.data.data;
    isRequestOpen.value = true;
  });
}
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
function getRequests() {
  isLoading.value = true;
  samplerequests(queryParams).then((res) => {
    requests.value = res.data.data.data;
    queryParams.totalCount = res.data.data.totalCount;
    isLoading.value = false;
  });
}
function selectall() {
  multi.value = requests.value.map((i) => i.id);
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
  getRequests();
}, 800);
watch(
  () => ({ ...queryParams }),
  () => {
    debounceSearch();
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
