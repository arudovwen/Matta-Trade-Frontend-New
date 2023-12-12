<template>
<div class="mb-8">
  <div class="gap-y-2 flex flex-col mb-4">
    <!-- Top bar   -->
    <div class="p-6 lg:p-8 bg-white rounded-lg bg-img">
      <div class="mb-12"><Breadcrumbs /></div>
      <div class="">
        <div class="flex gap-x-3 items-center mb-3">
          <h1
            class="text-3xl lg:text-[48px] text-matta-black col-span-1 font-medium capitalize"
          >
            Products
          </h1>
          <span class="mt-3">/</span>
          <span class="text-primary text-3xl lg:text-[48px]">{{
            queryParams.totalCount
          }}</span>
        </div>

        <p class="text-sm lg:text-base">
          List of all added storefront products.
        </p>
      </div>
    </div>

    <div class="p-6 lg:p-8 rounded-lg bg-white">
      <div class="flex gap-x-4 mb-8">
        <button
          @click="switchType('')"
          :class="queryParams.Status == '' && 'text-white bg-matta-black'"
          class="flex gap-x-2 items-center uppercase text-matta-black hover:text-white hover:bg-matta-black py-2 px-3 md:py-4 md:px-6 border rounded-lg border-[#E7EBEE] md:leading-5 text-[10px] sm:text-xs shadow-sm"
        >
          <AppIcon icon="uil-box" class="uil hidden md:inline" />
          <span class="hidden md:inline">|</span>
          <span>published</span
          ><span
            class="text-matta-black bg-gray-200 hover:bg-white rounded-full px-2 py-1 text-xs flex items-center justify-center leading-[normal]"
            >{{ counts.published }}</span
          >
        </button>
        <button
          :class="queryParams.Status == 'hidden' && 'text-white bg-matta-black'"
          @click="switchType('hidden')"
          class="flex gap-x-2 items-center uppercase text-matta-black hover:text-white hover:bg-matta-black py-2 px-3 md:py-4 md:px-6 border rounded-lg border-[#E7EBEE] md:leading-5 text-[10px] sm:text-xs shadow-sm"
        >
          <AppIcon icon="uil-eye-slash" class="uil hidden md:inline"></AppIcon>
          <span class="hidden md:inline">|</span>
          <span>hidden </span
          ><span
            class="text-matta-black bg-gray-200 hover:bg-white rounded-full px-2 py-1 text-xs flex items-center justify-center leading-[normal]"
            >{{ counts.hidden }}</span
          >
        </button>
        <button
          :class="
            queryParams.Status == 'archive' && 'text-white bg-matta-black'
          "
          @click="switchType('archive')"
          class="flex gap-x-2 items-center uppercase text-matta-black hover:text-white hover:bg-matta-black py-2 px-2 md:py-4 md:px-6 border rounded-lg border-[#E7EBEE] md:leading-5 text-[10px] sm:text-xs shadow-sm"
        >
          <AppIcon icon="uil-folder" class="uil hidden md:inline"></AppIcon>
          <span class="hidden md:inline">|</span>
          <span>archived</span
          ><span
            class="text-matta-black bg-gray-200 hover:bg-white rounded-full px-2 py-1 text-xs flex items-center justify-center leading-[normal]"
            >{{ counts.archived }}</span
          >
        </button>
      </div>
      <div class="justify-between items-center mb-8 w-full hidden lg:flex">
        <div class="flex gap-x-4 flex-1">
          <div class="relative flex items-center">
            <input
              v-model="queryParams.Search"
              @change="getData()"
              @keyup="debounceSearch"
              :class="
                queryParams.Search.length && 'pl-3 pr-10 rounded-lg w-[250px]'
              "
              class="border focus:pl-3 focus:pr-10 rounded-full focus:rounded-lg h-12 peer focus:w-[280px] focus:outline-matta-black/20 w-12 border-[#E7EBEE] transition ease-in-out duration-300"
              type="search"
            />
            <span
              class="absolute right-4 peer-focus:right-3 pointer-events-none"
              ><AppIcon icon="uil-search" class="uil"
            /></span>
          </div>
          <div class="flex relative items-center">
            <FormsSelectComponent
              @onGetData="onGetMarket"
              :options="marketOptions"
              :showSearch="true"
              :value="queryParams.MarketId"
              placeholder="All Markets"
              classStyles="appearance-none h-[46px] uppercase text-matta-black bg-transparent py-2 px-3 min-w-[150px] cursor-pointer md:py-3 md:px-6 border !rounded-full border-[#ddd] md:leading-5 text-[10px] !sm:text-[13px] shadow-sm focus:outline-gray-200"
            />
          </div>
          <div class="flex relative items-center">
            <FormsSelectComponent
              @onGetData="onGetProducer"
              :options="producerOptions"
              :showSearch="true"
              :value="queryParams.Producer"
              placeholder="All Producers"
              classStyles="appearance-none h-[46px] uppercase text-matta-black bg-transparent py-2 px-3 min-w-[150px] cursor-pointer md:py-3 md:px-6 border !rounded-full border-[#ddd] md:leading-5 text-[10px] !sm:text-[13px] shadow-sm focus:outline-gray-200"
            />
          </div>
          <div class="w-[46px]">
            <button
              @click="refresh"
              class="h-[46px] w-[46px] rounded-full flex items-center justify-center border border-[#E7EBEE]"
            >
              <AppIcon
                icon="uil-refresh"
                class="uil text-gray-400"
              />
            </button>
          </div>
        </div>
        <div class="flex gap-x-3 ml-2">
          <router-link to="/storefront/products/add-product">
            <button
              class="flex gap-x-2 items-center text-sm text-primary hover:text-white hover:bg-matta-black py-2 px-2 md:py-3 md:px-6 border rounded-full border-primary md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
            >
              <AppIcon icon="uil-plus" class="uil hidden md:inline" />
              <span class="hidden md:inline text-gray-200">|</span>
              Add product
            </button></router-link
          >
          <FormsSortFilter>
            <template #content>
              <button
                class="w-[46px] h-[46px] rounded-full flex items-center justify-center text-matta-black bg-transparent hover:text-white hover:bg-matta-black border border-[#ddd] shadow-sm"
              >
                <img
                  src="~/assets/img/sorting.svg"
                  alt="alt"
                /></button></template
          ></FormsSortFilter>
        </div>
      </div>
      <div v-if="!isPageLoading">
        <div class="max-w-[80vw] lg:max-w-full" v-if="products.length">
          <table class="w-full" v-if="products.length">
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
              <tr v-for="item in products" :key="item.id">
                <td
                  class="capitalize text-matta-black text-[13px] border-b py-6 px-3 border-[#E7EBEE] whitespace-nowrap"
                >
                  <div class="flex items-center">
                    <span
                      v-if="item.logo"
                      class="mr-3 h-10 w-10 rounded-lg flex items-center justify-center border border-[#E7EBEE] p-2"
                    >
                      <img class="" alt="alt" :src="item.logo" />
                    </span>
                    <i
                      v-else
                      class="fas fa-image text-[40px] mr-3 text-gray-400"
                    ></i>
                    <span>
                      <span class="text-sm font-medium">
                        {{ item.name }}
                      </span>
                      <br />
                      <span class="text-xs font-normal">
                        {{ item.manufacturer }}
                      </span>
                    </span>
                  </div>
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE] whitespace-nowrap"
                >
                  {{ moment(item.created).format("lll") }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE]"
                >
                  {{ item.views }}
                </td>

                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE]"
                >
                  {{ item.orders || 0 }}
                </td>

                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE] relative"
                >
                  <Popover class="relative">
                    <PopoverButton class="outline-none">
                      <i class="uil uil-ellipsis-h text-lg"></i>
                    </PopoverButton>
                    <PopoverPanel
                      class="absolute z-[99] bg-white shadow right-0 min-w-[150px] rounded-md overflow-hidden pt-4"
                    >
                      <ul class="grid grid-cols-1 pb-2">
                        <router-link
                          :to="`/storefront/products/edit-product?id=${item.id}`"
                        >
                          <li
                            class="px-6 text-sm text-[#333333] cursor-pointer group hover:text-primary py-2 whitespace-nowrap"
                          >
                            <i
                              class="uil uil-pen text-[#666666] group-hover:text-primary"
                            ></i>
                            Edit
                          </li>
                        </router-link>
                        <li
                          @click="isOpenModal(item)"
                          class="px-6 text-sm text-[#333333] cursor-pointer group hover:text-primary py-2 whitespace-nowrap"
                        >
                          <i class="uil uil-trash text-matta-black"></i> Remove
                        </li>
                      </ul>
                    </PopoverPanel>
                  </Popover>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          v-else
          class="h-[310px] rounded-lg w-full flex items-center justify-center bg-[#F1F3F5]"
        >
          <div class="text-center max-w-sm mx-auto">
            <img
              src="~/assets/img/nofound.svg"
              class="w-[52px] h-auto mx-auto mb-4"
            />
            <p class="text-matta-black font-medium text-xl">
              No product available
            </p>
            <p class="text-sm text-matta-black mb-6">
              We did not find the query you requested
            </p>
          </div>
        </div>
      </div>
      <div class="text-center p-6 lg:p-8 my-24" v-else>
        <AppLoader />
      </div>
    </div>
  </div>

  <Pagination
    :total="queryParams.totalCount"
    :current="queryParams.PageNumber"
    :per-page="queryParams.PageSize"
    :pageRange="5"
    @page-changed="queryParams.PageNumber = $event"
    
  />

  <IndexModal :isOpen="isOpen" @toggleModal="isOpen = false">
    <template #content>
      <div
        class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-w-sm"
        v-if="isOpen"
      >
        <div class="flex justify-between mb-5 items-center">
          <h4 class="font-medium text-matta-black text-xl">
            {{ title }}
          </h4>
          <i class="uil uil-times cursor-pointer text-lg" @click="close"></i>
        </div>

        <p class="text-sm text-matta-black mb-2">
          {{ text }}
        </p>
        <input
          class="rounded-lg px-5 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          v-model="deletetext"
        />
        <div class="flex justify-end gap-x-2 items-center mt-8">
          <button
            type="button"
            @click="close"
            class="appearance-none leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 text-[13px] uppercase"
          >
            Cancel
          </button>

          <button
            type="button"
            @click="handleDelete"
            :disabled="deletetext != 'Delete' || isLoading"
            :class="deletetext != 'Delete' && 'opacity-50'"
            class="appearance-none leading-none px-8 py-3 rounded-lg text-white bg-primary-500 hover:bg-priamry/70 text-[13px] uppercase"
          >
            Delete
          </button>
        </div>
      </div>
    </template>
  </IndexModal>
</div>
</template>

<script setup>
import { useRoute } from "vue-router";
import {
  getSupplierProducts,
  getproductcount,
  getMarkets,
  getProducers,
  deleteProduct,
} from "~/services/productservices";
import moment from "moment";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import debounce from "lodash/debounce";
import { useToast } from "vue-toastification";

const queryParams = reactive({
  MarketId: "",
  Search: "",
  PageSize: 10,
  PageNumber: 1,
  ShowSubMenu: true,
  Producer: "",
  pagecount: 0,
  totalCount: 0,
  Status: "",
});
const isLoading = ref(false);
const counts = ref({ published: 0, archived: 0, hidden: 0 });
const isPageLoading = ref(true);
const producers = ref([]);
const markets = ref([]);
const id = ref(null);
const toast = useToast();
onMounted(() => {
  getData();
  getproductcount().then((res) => {
    counts.value = res.data.data
      ? res.data.data
      : { published: 0, archived: 0, hidden: 0 };
  });
  getMarkets({ PageSize: 300000 }).then((res) => {
    markets.value = res.data.data;
  });
  getProducers({ PageSize: 100000 }).then((res) => {
    producers.value = res.data.data.data;
  });
});
function refresh() {
  queryParams.MarketId = queryParams.Producer = queryParams.Search = "";
  getData();
}

function onGetMarket(data) {
  queryParams.MarketId = data.id;
  getData();
}
function onGetProducer(data) {
  queryParams.Producer = data.id;
  getData();
}
const marketOptions = computed(() => {
  if (!markets.value.length) return [];
  return markets.value.map((i) => {
    i.name = i.title;
    return i;
  });
});
const producerOptions = computed(() => {
  if (!producers.value.length) return [];
  return producers.value.map((i) => {
    i.name = i.title;
    return i;
  });
});
function getData() {
  isPageLoading.value = true;
  getSupplierProducts(queryParams)
    .then((res) => {
      products.value = res.data.data.data;
      queryParams.totalCount = res.data.data.totalCount;
      queryParams.pagecount = res.data.data.data.length;
      isPageLoading.value = false;
    })
    .catch(() => {
      isPageLoading.value = false;
    });
}
function next() {
  queryParams.PageNumber++;
  getData();
}
function prev() {
  if (queryParams.PageNumber == 1) return;
  queryParams.PageNumber--;
  getData();
}

const debounceSearch = debounce(() => {
  getData();
}, 1500);

const deletetext = ref("");
const text = ref("");
const isOpen = ref(false);
const products = ref([]);
const route = useRoute();
defineProps(["title"]);
const theads = ["product", "created", "views", "orders", ""];

function close() {
  isOpen.value = false;
}

function isOpenModal(item) {
  text.value = `By deleting ${item.name.toUpperCase()}, you will delete all data. Please, type ‘Delete’  to confirm.`;
  id.value = item.id;
  isOpen.value = true;
}
function switchType(type) {
  queryParams.Status = type;
  getData();
}

function handleDelete() {
  isLoading.value = true;

  deleteProduct(id.value)
    .then((res) => {
      if (res.status == 200) {
        isOpen.value = false;
        isLoading.value = false;
        getData();
        toast.success("Product removed");
      }
    })
    .catch((err) => {
      toast.success(err.response.data.Message);
      isLoading.value = false;
    });
}
watch(
  () => [queryParams.PageNumber],
  () => {
    getData();
  }
);
provide("isPageLoading", isPageLoading);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
