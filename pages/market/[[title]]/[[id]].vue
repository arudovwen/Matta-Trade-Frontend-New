<template>
  <div>
    <div class="flex flex-col w-fll">
      <MarketBanner />

      <div class="flex flex-1 container py-10 w-full gap-x-[22px]">
        <div class="max-w-[250px] w-full hidden lg:block">
          <MarketSideBar />
        </div>
        <div class="flex-1 flex flex-col gap-y-10">
          <MarketContent />
          <Pagination
            v-if="!isLoading && productsData.length"
            :total="total"
            :current="query.pageNumber"
            :per-page="query.pageSize"
            :pageRange="pageRange"
            @page-changed="query.pageNumber = $event"
            :perPageChanged="perPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getProducts } from "~/services/productservices";
import { useProductStore } from "@/stores/products";

const { setProducts, productsData, isLoading } = useProductStore();
const route = useRoute();
const query = reactive({
  PageNumber: 1,
  PageSize: 20,
  searchParameter: "",
  MarketApplication: "",
  Status: "",
  MarketId: route.params.id,
  MarketSubApplication: "",
  productId: "",
  Search: "",
  ShowSubMenu: true,
  Producer: route.query.producer,
  pagecount: 0,
  totalData: 0,
  SortOrder: "A",
  Pricefilter: "",
});
const total = 200;
const pageRange = 5;

function getAllProducts() {
  getProducts(query).then((res) => {
    if (res.status === 200) {
      setProducts(res.data.data);
    }
  });
}

function perPage({ currentPerPage }) {
  query.pageNumber = 1;
  query.pageSize = currentPerPage;
}

onMounted(() => {
  getAllProducts();
});
</script>
