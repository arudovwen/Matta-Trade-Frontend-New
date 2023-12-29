<template>
  <div class="gap-y-2 flex flex-col">
    <!-- Top bar   -->
    <div class="p-6 lg:p-8 bg-white rounded-lg bg-img">
      <div class="mb-12"><Breadcrumbs /></div>
      <div class="">
        <div class="flex gap-x-3 items-center mb-3">
          <h1
            class="text-3xl lg:text-[48px] text-matta-black col-span-1 font-medium capitalize"
          >
           Requests
          </h1>
          <span class="mt-3">/</span>
          <span class="text-primary text-3xl lg:text-[48px]">{{
            count?.samples + count?.documents + count?.quotes || 0
          }}</span>
        </div>

        <p class="text-sm lg:text-base">
          List of your requests for samples and documents.
        </p>
      </div>
    </div>
    <div class="p-6 lg:p-8 rounded-lg bg-white">
      <div class="flex gap-x-4 mb-8">
        <button
          @click="active = 'sample'"
          :class="active === 'sample' ? 'bg-matta-black text-white' : ''"
          class="flex gap-x-2 items-center capitalize text-matta-black hover:text-white hover:bg-matta-black py-2 px-3 md:py-4 md:px-6 border rounded-lg border-[#E7EBEE] md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
        >
          <i class="uil uil-temperature-empty hidden md:inline"></i>
          <span class="hidden md:inline">|</span>
          <span>samples</span
          ><span
            :class="active === 'sample' ? 'bg-white' : ''"
            class="text-matta-black bg-gray-200 hover:bg-white rounded-full text-[11px] w-4 h-4 flex items-center justify-center"
            >{{ count?.samples || 0 }}</span
          >
        </button>

        <button
          @click="active = 'documents'"
          :class="active === 'documents' ? 'bg-matta-black text-white' : ''"
          class="flex gap-x-2 items-center capitalize text-matta-black hover:text-white hover:bg-matta-black py-2 px-2 md:py-4 md:px-6 border rounded-lg border-[#E7EBEE] md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
        >
          <i class="uil uil-file hidden md:inline"></i>
          <span class="hidden md:inline">|</span>
          <span>documents</span
          ><span
            :class="active === 'documents' ? 'bg-white' : ''"
            class="text-matta-black bg-gray-200 hover:bg-white rounded-full text-[11px] w-4 h-4 flex items-center justify-center"
            >{{ count?.documents || 0 }}</span
          >
        </button>
        <button
          @click="active = 'quotes'"
          :class="active === 'quotes' ? 'bg-matta-black text-white' : ''"
          class="flex gap-x-2 items-center capitalize text-matta-black hover:text-white hover:bg-matta-black py-2 px-2 md:py-4 md:px-6 border rounded-lg border-[#E7EBEE] md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
        >
          <i class="uil uil-chat hidden md:inline"></i>
          <span class="hidden md:inline">|</span>
          <span>quotes</span
          ><span
            :class="active === 'documents' ? 'bg-white' : ''"
            class="text-matta-black bg-gray-200 hover:bg-white rounded-full text-[11px] w-4 h-4 flex items-center justify-center"
            >{{ count?.quotes || 0 }}</span
          >
        </button>
      </div>

      <div>
        <SupplierRequestsRequestTable v-if="active == 'sample'" :canCancel="false" />
        <SupplierRequestsDocumentsTable v-if="active == 'documents'" />
        <SupplierRequestsQuotesTable v-if="active == 'quotes'" />
      </div>
    </div>
  </div>
  <IndexModal :isOpen="isOpen" @togglePopup="isOpen = false" v-if="isOpen">
    <template #content>
      <div class="w-[400px] bg-white rounded-lg p-6 lg:p-8 relative">
        <span
          @click="isOpen = false"
          class="hover:bg-gray-50 rounded-full h-6 w-6 flex items-center justify-center absolute top-4 right-4"
          ><AppIcon icon="heroicons-solid:x" class="w-4 h-4"
        /></span>
        <h4 class="text-lg font-medium mb-3">Cancel document request</h4>
        <p class="text-sm mb-8">
          Are your sure you want to cancel #DC455-084 document request?
        </p>
        <div class="flex items-center gap-x-4">
          <button
            @click="isOpen = false"
            type="button"
            class="text-[13px] uppercase text-matta-black px-2 py-2 hover:text-primary/80 w-full"
          >
            don’t cancel
          </button>
          <button
            type="submit"
            class="border text-[13px] border-primary uppercase w-full text-white bg-primary-500 rounded-lg px-2 py-3 hover:bg-primary/80"
          >
            cancel request
          </button>
        </div>
      </div>
    </template>
  </IndexModal>
</template>

<script setup>
import { useRoute } from "vue-router";
import {
  samplerequests,
  sellerdoc,
  samplerequestcount,
} from "~/services/requestservice";
import { sellerquotes } from "~/services/quoteservice";

defineProps(["title"]);
const isLoading = ref(true);
const quoteLoading = ref(true);
const docLoading = ref(true);
const documents = ref([]);
const requests = ref([]);
const route = useRoute();
const isOpen = ref(false);
const active = ref("sample");
const quotes = ref([]);
// const products = ref([]);
// const suppliers = ref([]);
const quoteParams = reactive({
  Status: "",
  Search: "",
  SortOrder: "",
  PageNumber: 1,
  PageSize: 10,
  totalCount: 0,
});
const count = reactive({
  documents: 0,
  samples: 0,
  quotes: 0,
});
onMounted(() => {
  getRequests();
  getRequestDoc();
  samplerequestcount().then((res) => {
    count.documents = res.data.documents;
    count.samples = res.data.samples;
  });
  getquotes();
});
function getquotes() {
  quoteLoading.value = true;
  sellerquotes(quoteParams).then((res) => {
    count.quotes = quoteParams.totalCount = res.data.data.totalCount;
    quotes.value = res.data.data.data;
    quoteLoading.value = false;
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

function getRequests() {
  isLoading.value = true;
  samplerequests(queryParams).then((res) => {
    requests.value = res.data.data.data;
    queryParams.totalCount = res.data.data.totalCount;
    isLoading.value = false;
  });
}
function getRequestDoc() {
  docLoading.value = true;
  sellerdoc(queryParams).then((res) => {
    documents.value = res.data.data.data;
    queryParams.totalCount = res.data.data.totalCount;
    docLoading.value = false;
  });
}
watch(
  () => [quoteParams.Status, quoteParams.Search, quoteParams.SortOrder],
  () => {
    getquotes();
  }
);
provide("quotes", quotes);
provide("quoteParams", quoteParams);
provide("quoteLoading", quoteLoading)
provide("docLoading", docLoading)
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
