<template>
  <div class="hidden lg:flex justify-between items-center mb-8 px-5">
    <div class="flex gap-x-4">
      <div class="relative flex items-center">
        <input
          v-model="queryParams.Search"
          @change="getRequests()"
          @keyup="debounceSearch"
          :class="
            queryParams.Search.length && 'pl-3 pr-10 rounded-lg w-[280px]'
          "
          class="border focus:pl-3 focus:pr-10 rounded-full focus:rounded-lg h-10 peer focus:w-[280px] focus:outline-matta-black/20 w-12 border-[#EAECF0] transition ease-in-out duration-300"
          type="search"
        />
        <span class="absolute right-4 peer-focus:right-3 pointer-events-none"
          ><i class="uil uil-search"></i
        ></span>
      </div>

      <div class="">
        <FormsCustomSelect
          placeholder="Product"
          :options="products"
          v-model="queryParams.ProductId"
          classStyles="px-8 py-3 h-10 text-base border-[#EAECF0] border rounded-full"
        />
      </div>
      <div class="">
        <FormsCustomSelect
          placeholder="Supplier"
          :options="suppliers"
          v-model="queryParams.Supplier"
          classStyles="px-8 py-3 h-10 text-base border-[#EAECF0] border rounded-full"
        />
      </div>
      <div class="">
        <FormsCustomSelect
          placeholder="Producer"
          :options="[]"
          v-model="queryParams.Producer"
          classStyles="px-8 py-3 h-10 text-base border-[#EAECF0] border rounded-full"
        />
      </div>
      <div class="">
        <FormsCustomSelect
          placeholder="Status"
          :options="statusOptions"
          v-model="queryParams.RequestStatus"
          classStyles="px-8 py-3 h-10 text-base border-[#EAECF0] border rounded-full"
        />
      </div>
    </div>
    <span class="flex gap-x-3">
      <span
        @click="toggleOrder"
        class="flex items-center justify-center cursor-pointer border border-[#EAECF0] rounded-full h-10 w-10"
      >
        <img src="~/assets/img/sorting.svg" alt="alt"
      /></span>
    </span>
  </div>

  <div v-if="!loading">
  
    
  <div
    class="overflow-x-auto max-w-[80vw] lg:max-w-full pb-20"
    v-if="requests.length"
  >
    <table class="w-full">
      <thead>
        <tr>
          <th
            v-for="item in theads"
            :key="item"
            class="capitalize text-[#475467] text-sm text-left font-medium border-b py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
          >
            {{ item }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in requests" :key="item">
          <td
            class="capitalize text-[#101828] text-sm border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
          >
            <span :class="item.status == 4 ? 'opacity-25' : ''">
              <span class="text-sm font-medium">
                {{ item.productName }}
              </span>
            </span>
          </td>
          <td
            :class="item.status == 3 ? 'opacity-25' : ''"
            class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
          >
            {{ item.producer }}
          </td>
          <td
            :class="item.status == 3 ? 'opacity-25' : ''"
            class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
          >
            {{ moment(item.created).format("lll") }}
          </td>
          <td
            class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
          >
            <AppStatusButton :status="item.requestStatus" />
          </td>
          <td
            :class="item.status == 3 ? 'opacity-25' : ''"
            class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] relative"
          >
            <Menu class="relative" as="div">
              <MenuButton class="outline-none">
                <i class="uil uil-ellipsis-v"></i>
              </MenuButton>
              <MenuItems
                class="absolute z-[999] bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] py-2 right-0 min-w-[140px] rounded-xl overflow-hidden"
              >
                <div
                  class="py-2 px-4 hover:bg-gray-50 text-xs whitespace-nowrap cursor-pointer"
                  @click="openRequests(item.id)"
                >
                  <i class="uil uil-box mr-2"></i> Open Request
                </div>

                <div
                  v-if="canCancel"
                  class="py-2 px-4 hover:bg-gray-50 text-xx whitespace-nowrap"
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
  /></div>

  <AppLoader v-if="loading" />

  <div class="p-5">
    <PaginationSimple
      :total="queryParams.totalCount"
      :current="queryParams.PageNumber"
      :per-page="queryParams.PageSize"
      :pageRange="5"
      @page-changed="queryParams.PageNumber = $event"
    />
  </div>
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
          <p class="text-sm text-[#B6B7B9] mb-2">Request ID</p>
          <h2 class="font-medium text-2xl">{{ request.requestNumber }}</h2>
        </div>

        <hr class="my-3 border-gray-200" />
        <SupplierMyrequestsRequestComponent />
      </div>
    </template>
  </SideModal>
</template>

<script setup>
import moment from "moment";
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import {
  procurementrequests,
  procurementproducts,
  procurementsuppliers,
  procurementrequestdetails,
  // setascancelled,
} from "~/services/procurementservice";
import debounce from "lodash/debounce";

defineProps(["title", "canCancel"]);
const theads = ["product", "supplier", "date requested", "status", ""];
const request = ref({});
const isRequestOpen = ref(false);
const requests = ref([]);
const requestId = ref(null);
const multi = ref([]);
const isOpen = ref(false);
const products = ref([]);
const suppliers = ref([]);
const loading = ref(true)

onMounted(() => {
  getRequests();
  procurementproducts().then((res) => {
    products.value = res.data.data.data.map((i) => {
      loading.value = false
      return {
        id: i.productId,
        text1: i.productName,
      };
    });
  });

  procurementsuppliers().then((res) => {
    suppliers.value = res.data.data.data.map((i) => {
      return {
        id: i.supplierId,
        text1: i.supplier,
      };
    });
  });
});
function selectall() {
  multi.value = requests.value.map((i) => i.id);
}
function handleCancel(id) {
  requestId.value = id;
  isOpen.value = true;
}
function openRequests(val) {
  procurementrequestdetails(val).then((res) => {
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
  procurementrequests(queryParams).then((res) => {
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

// function cancelRequest() {
//   setascancelled({ sampleRequestId: requestId.value }).then((res) => {
//     if (res.status === 200) {
//       getRequests();
//     }
//   });
// }
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
