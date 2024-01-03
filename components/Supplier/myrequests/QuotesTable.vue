<template>
  <div class="flex justify-between items-center mb-8">
    <div class="flex gap-x-4">
      <div class="relative flex items-center">
        <input
          v-model="quoteParams.Search"
          @change="getRequests()"
          @keyup="debounceSearch"
          :class="
            quoteParams.Search.length && 'pl-3 pr-10 rounded-lg w-[280px]'
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
          v-model="quoteParams.Status"
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
  <div v-if="quotes.length">
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
        <tr v-for="item in quotes" :key="item">
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

              <span class="text-sm font-normal">
                {{ item.quoteNo }}
              </span>
            </div>
          </td>
          <td
            class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE]"
          >
            {{ item.product }}
          </td>
          <!-- <td
            :class="item.status == 3 ? 'opacity-25' : ''"
            class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE]"
          >
            {{ item.buyerBusinessName }}
          </td>

          <td
            :class="item.status == 3 ? 'opacity-25' : ''"
            class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE]"
          >
            {{ item.requestedBy }}
          </td> -->
          <td
            :class="item.status == 3 ? 'opacity-25' : ''"
            class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE]"
          >
            {{ moment(item.date).format("lll") }}
          </td>
          <td
            class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE]"
          >
            <span
              v-if="item.status == 0"
              class="px-2 py-1 text-xs rounded-lg bg-[#D0C9FF]"
            >
              {{ item.statusText }}</span
            >
            <span
              v-if="item.status == 1"
              class="px-2 py-1 text-xs rounded-lg bg-[#F9CBE4]"
            >
              {{ item.statusText }}</span
            >

            <span
              v-if="item.status == 2"
              class="px-2 py-1 text-xs rounded-lg bg-[#BBE5AC]"
            >
              {{ item.statusText }}</span
            >
            <span
              v-if="item.status == 3"
              class="px-2 py-1 text-xs rounded-lg border opacity-25"
            >
              {{ item.statusText }}</span
            >
          </td>
          <td
            :class="item.status == 3 ? 'opacity-25' : ''"
            class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE]"
          >
            {{ item.type }}
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
                  <i class="uil uil-file mr-2"></i> Open quote
                </div>

                <!-- <div
                  @click="cancelRequest"
                  class="py-2 px-5 hover:bg-gray-50 text-sm whitespace-nowrap"
                >
                  <i class="uil uil-trash mr-2"></i> Set as Cancelled
                </div> -->
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
    text="No quote have been made"
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
      </button>
    </span>
  </div>
 
  <Pagination
    :total="quoteParams.totalCount"
    :current="quoteParams.PageNumber"
    :per-page="quoteParams.PageSize"
    :pageRange="5"
    @page-changed="quoteParams.PageNumber = $event"
  />
  <SideModal :isOpen="isOpen" @togglePopup="isOpen = false" v-if="isOpen">
    <template #content>
      <div
        class="h-full w-full md:min-w-[50vh] bg-white rounded-lg p-6 lg:py-10 overflow-auto max-h-full"
      >
        <div class="mb-3">
          <p class="text-[13px] text-[#B6B7B9] mb-2">Quote No</p>
          <h2 class="font-medium text-2xl">{{ quote.quoteNo }}</h2>
        </div>

        <hr class="my-3 border-gray-200" />
        <SupplierMyrequestsQuoteDetail />
      </div>
    </template>
  </SideModal>
</template>

<script setup>
import { defineProps, ref, watch, provide, inject } from "vue";
import moment from "moment";;
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import { sellerquotedetail } from "~/services/quoteservice";
import debounce from "lodash/debounce";

const theads = [
  "quote no",
  "product",
  // "business name",
  // "requested by",
  "created",
  "status",
  "",
];

const quotes = inject("quotes");
const multi = ref([]);
defineProps(["title"]);
const quoteParams = inject("quoteParams");

const isOpen = ref(false);

function selectall() {
  multi.value = quotes.value.map((i) => i.id);
}
function openRequest(item) {
  sellerquotedetail(item.id).then((res) => {
    quote.value = res.data.data;
    isOpen.value = true;
  });
}
const quote = ref({});
function next() {
  quoteParams.PageNumber++;
}
function toggleOrder() {
  quoteParams.SortOrder == "A"
    ? (quoteParams.SortOrder = "D")
    : (quoteParams.SortOrder = "A");
}
function prev() {
  if (quoteParams.PageNumber == 1) return;
  quoteParams.PageNumber--;
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
const debounceSearch = debounce(() => {}, 800);
watch(
  () => ({ ...quoteParams }),
  () => {
    debounceSearch();
  }
);
provide("quote", quote);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
