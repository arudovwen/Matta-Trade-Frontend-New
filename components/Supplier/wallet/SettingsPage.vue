<template>
  <div class="gap-y-2 flex flex-col">
    <!-- Top bar   -->
    <div class="p-6 lg:p-8 bg-white rounded-lg">
      <div class="mb-12"><Breadcrumbs /></div>
      <div class="grid justify-between items-end mb-8">
        <div>
          <h1
            class="text-3xl lg:text-[48px] lg:leading-[56px] text-matta-black col-span-1 font-medium capitalize mb-4"
          >
          Settings
          </h1>
          <p class="text-sm lg:text-base">
            Manage your wallet transactions, withdrawals and top-ups.
          </p>
        </div>
        <div />
      </div>
    </div>

    <div>
      <div class="p-6 lg:p-8 bg-white rounded-lg grid gap-y-20" v-if="details">
        <SupplierWalletSettingsTransactionPin />
        <SupplierWalletSettingsTransactionLimit />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { getWalletDetails } from "~/services/walletservice";

const details = ref(null);
const route = useRoute();
const isPageLoading = ref(true);
const isLoading = ref(false);

function handleWalletDetails() {
  getWalletDetails()
    .then((res) => {
      details.value = res.data.data;
      isPageLoading.value = false;
    })
    .catch(() => {
      isLoading.value = false;
      isPageLoading.value = false;
    });
}
onMounted(() => {
  handleWalletDetails();
});
provide("details", details);
provide("isLoading", isLoading);
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
