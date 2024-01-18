<template>
  <div class="gap-y-2 flex flex-col bg-white rounded-[10px] pb-10">
    <!-- Top bar   -->
    <!-- <div class="p-6 lg:p-8 bg-white rounded-lg bg-img">
      <div class="mb-12"><Breadcrumbs /></div>
      <div class="">
        <div class="flex gap-x-3 items-center mb-3">
          <h1
            class="text-3xl lg:text-[48px] text-matta-black col-span-1 font-medium capitalize"
          >
           My Requests
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
    </div> -->
    <HeaderComponent title="My requests" />
    <div class="p-8 rounded-lg bg-white">
      <div class="flex gap-x-4 mb-8 max-w-[300px] sm:max-w-max overflow-x-auto">
        <button
          @click="active = 'sample'"
          :class="active === 'sample' ? 'bg-matta-black text-white' : ''"
          class="flex gap-x-2 items-center uppercase text-matta-black hover:text-white hover:bg-matta-black py-2 px-3 md:py-4 md:px-6 border rounded-lg border-[#E7EBEE] md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
        >
          <i class="uil uil-temperature-empty hidden md:inline"></i>
          <span class="hidden md:inline">|</span>
          <span>samples</span
          ><span
            :class="active === 'sample' ? 'bg-white' : ''"
            class="text-matta-black bg-gray-200 hover:bg-white rounded-full px-2 py-1 text-xs"
            >{{ count?.samples || 0 }}</span
          >
        </button>

        <button
          @click="active = 'documents'"
          :class="active === 'documents' ? 'bg-matta-black text-white' : ''"
          class="flex gap-x-2 items-center uppercase text-matta-black hover:text-white hover:bg-matta-black py-2 px-2 md:py-4 md:px-6 border rounded-lg border-[#E7EBEE] md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
        >
          <i class="uil uil-file hidden md:inline"></i>
          <span class="hidden md:inline">|</span>
          <span>documents</span
          ><span
            :class="active === 'documents' ? 'bg-white' : ''"
            class="text-matta-black bg-gray-200 hover:bg-white rounded-full px-2 py-1 text-xs"
            >{{ count?.documents || 0 }}</span
          >
        </button>
        <button
          @click="active = 'quotes'"
          :class="active === 'quotes' ? 'bg-matta-black text-white' : ''"
          class="flex gap-x-2 items-center uppercase text-matta-black hover:text-white hover:bg-matta-black py-2 px-2 md:py-4 md:px-6 border rounded-lg border-[#E7EBEE] md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
        >
          <i class="uil uil-chat hidden md:inline"></i>
          <span class="hidden md:inline">|</span>
          <span>quotes</span
          ><span
            :class="active === 'documents' ? 'bg-white' : ''"
            class="text-matta-black bg-gray-200 hover:bg-white rounded-full px-2 py-1 text-xs"
            >{{ count?.quotes || 0 }}</span
          >
        </button>
        <button
          @click="active = 'products'"
          :class="active === 'products' ? 'bg-matta-black text-white' : ''"
          class="flex gap-x-2 items-center uppercase text-matta-black hover:text-white hover:bg-matta-black py-2 px-2 md:py-4 md:px-6 border rounded-lg border-[#E7EBEE] md:leading-5 text-[10px] sm:text-[13px] shadow-sm"
        >
          <i class="uil uil-box hidden md:inline"></i>
          <span class="hidden md:inline">|</span>
          <span>products</span
          ><span
            :class="active === 'documents' ? 'bg-white' : ''"
            class="text-matta-black bg-gray-200 hover:bg-white rounded-full px-2 py-1 text-xs"
            >{{ count?.productRequest || 0 }}</span
          >
        </button>
      </div>

      <div>
        <SupplierMyrequestsRequestTable v-if="active == 'sample'" :canCancel="false" />
        <SupplierMyrequestsDocumentsTable v-if="active == 'documents'" />
        <SupplierMyrequestsQuotesTable v-if="active == 'quotes'" />
        <SupplierMyrequestsProductTable v-if="active == 'products'" />
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
            type="button"
            @click="cancelRequest"
            class="border text-[13px] border-primary- uppercase w-full text-white bg-primary-500 rounded-lg px-2 py-3 hover:bg-primary/80"
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
import { procurementrequestcount } from "~/services/procurementservice";
import { buyerquotes } from "~/services/quoteservice";

const route = useRoute();
defineProps(["title"]);
const isOpen = ref(false);
const active = ref("sample");
const quotes = ref([]);
const count = reactive({
  documents: 0,
  samples: 0,
  quotes: 0,
  productRequest: 0,
});
const quoteParams = reactive({
  Status: "",
  Search: "",
  SortOrder: "",
  PageNumber: 1,
  PageSize: 10,
  totalCount: 0,
});
onMounted(() => {
  procurementrequestcount().then((res) => {
    count.documents = res.data.documents;
    count.samples = res.data.samples;
    count.productRequest = res.data.productRequest;
  });
  getquotes();
});
function getquotes() {
  buyerquotes(quoteParams).then((res) => {
    count.quotes = quoteParams.totalCount = res.data.data.totalCount;
    quotes.value = res.data.data.data;
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
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
