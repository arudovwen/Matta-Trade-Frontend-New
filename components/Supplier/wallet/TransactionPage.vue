<!-- eslint-disable no-unused-vars -->
<template>
  <div class="gap-y-2 flex flex-col">
    <!-- Top bar   -->
    <div class="p-6 lg:p-8 bg-white rounded-lg">
      <div class="mb-12"><Breadcrumbs /></div>
      <div class="grid  justify-between items-end mb-8">
        <div>
          <h1
            class="text-3xl lg:text-[48px] lg:leading-[56px] text-matta-black col-span-1 font-medium capitalize mb-4"
          >
          Transactions
          </h1>
          <p class="text-sm lg:text-base">
            Manage your wallet transactions here.
          </p>
        </div>
        <div />
      </div>
      <div class="flex justify-end gap-4">
        <button
          @click="type = '1'"
          :class="
            type === '1' ? 'bg-matta-black text-white' : 'text-matta-black'
          "
          class="border border-matta-black py-3 text-xs md:text-[13px] px-6 flex justify-center rounded-lg items-center hover:bg-matta-black/80 uppercase font-normal leading-[normal] gap-x-1"
        >
          Credit
        </button>
        <button
          @click="type = '2'"
          :class="
            type === '2' ? 'bg-matta-black text-white' : 'text-matta-black'
          "
          class="border border-matta-black py-3 text-xs md:text-[13px] px-6 flex justify-center rounded-lg items-center hover:bg-matta-black/80 uppercase font-normal leading-[normal] gap-x-1"
        >
          Debit
        </button>
      </div>
    </div>

    <div class="p-6 lg:p-8 bg-white rounded-lg">
      <div v-if="!isPageLoading">
        <div v-if="!isEmpty" class="max-w-[80vw]">
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
              <tr v-for="item in tdata" :key="item">
                <td
                   class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                ></td>
                <td
                  class="text-matta-black text-sm font-normal border-b py-6 px-3 border-[#E7EBEE]"
                >
                  {{ item.email }}
                </td>
                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                ></td>

                <td
                  class="capitalize text-matta-black text-sm font-normal border-b py-4 px-6 border-[#EAECF0] whitespace-nowrap"
                >
                  <span
                    v-if="item.invitationStatusText == 'Expired'"
                    class="px-2 py-2 text-xs rounded-lg border text-[#EE5C5C] border-[#EE5C5C]"
                  >
                    {{ item.invitationStatusText }}</span
                  >
                  <span
                    v-if="item.invitationStatusText == 'Invited'"
                    class="px-2 py-2 text-xs rounded-lg border text-primary border-primary"
                  >
                    {{ item.invitationStatusText }}</span
                  >
                  <span
                    v-if="item.invitationStatusText == 'Verified'"
                    class="px-2 py-2 text-xs rounded-lg text-white bg-[#59B221]"
                  >
                    Verified</span
                  >
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
            <p class="text-matta-black font-medium">No transaction available</p>
          </div>
        </div>
      </div>
      <div class="text-center p-6 lg:p-8 my-24" v-else>
         <AppLoader />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { reactive, ref } from "vue";

const route = useRoute();
const type = ref("1");
const theads = [
  "date",
  "transaction ID",
  "amount",
  "Payment method",
  "type",
  "merchant",
  "description",
];
const tdata = [];
const isEmpty = ref(true);
const isPageLoading = ref(false);
// eslint-disable-next-line no-unused-vars
const queryParams = reactive({
  Status: "",
  Role: "",
  PageSize: 10,
  PageNumber: 1,
  pagecount: 0,
  totalCount: 0,
  Search: "",
});
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
