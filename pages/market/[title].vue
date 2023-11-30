<template>
  <div>
    <div class="flex flex-col w-fll">
      <MarketBanner />

      <div class="flex flex-1 container py-10 w-full gap-x-[22px]">
        <div class="max-w-[250px] w-full hidden lg:block"><MarketSideBar /></div>
        <div class="flex-1 flex flex-col gap-y-10">
          <MarketContent />
          <Pagination
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
const query = reactive({
  pageNumber: 1,
  pageSize: 20,
  searchParameter: "",
});
const total = 200;
const pageRange = 5;
function perPage({ currentPerPage }) {
  query.pageNumber = 1;
  query.pageSize = currentPerPage;
}
</script>
