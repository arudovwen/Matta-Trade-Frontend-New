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
          Saved Searches
          </h1>
          <span class="mt-3">/</span>
          <span class="text-primary text-3xl lg:text-[48px]">0</span>
        </div>

        <p class="text-sm lg:text-base">
          The saved searches for product catalog are listed below.
        </p>
      </div>
    </div>

    <div class="p-6 lg:p-8 rounded-lg bg-white">
      <div class="flex justify-between items-center mb-8">
        <div class="flex gap-x-4">
          <div
            class="flex items-center justify-center border border-[#E7EBEE] rounded-full h-12 w-12"
          >
            <i class="uil uil-search"></i>
          </div>

          <div class="flex relative items-center">
            <select
              class="appearance-none border border-[#E7EBEE] rounded-full px-8 py-3 uppercase text-[13px]"
            >
              <option>Created</option>
            </select>
            <i
              class="uil uil-angle-down absolute right-2 pointer-events-none"
            ></i>
          </div>
        </div>
        <span
          class="flex items-center justify-center border border-[#E7EBEE] rounded-full h-12 w-12"
        >
           <img src="~/assets/img/sorting.svg" alt="alt"
        /></span>
      </div>
      <div class="border rounded-lg ">
        <div v-if="!isEmpty">
        <table class="w-full">
          <thead>
            <tr>
              <th
                v-for="item in theads"
                :key="item"
                class="uppercase text-[#B6B7B9] text-[13px] text-left font-normal border-b py-4 px-3 border-[#E7EBEE]"
              >
                {{ item }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tdata" :key="item">
              <td
                class="capitalize text-matta-black text-[13px] border-b py-4 px-3 border-[#E7EBEE] whitespace-nowrap"
              >
                <span class="flex items-center">
                  <input type="checkbox" class="mr-2" />
                  {{ item.name }}
                </span>
              </td>
              <td
                class="capitalize text-matta-black text-sm font-normal border-b py-4 px-3 border-[#E7EBEE]"
              >
                {{ item.created }}
              </td>
              <td
                class="capitalize text-matta-black text-sm font-normal border-b py-4 px-3 border-[#E7EBEE]"
              >
                {{ item.filters }}
              </td>

              <td
                class="capitalize text-matta-black text-sm font-normal border-b py-4 px-3 border-[#E7EBEE]"
              >
                <div class="flex gap-x-8 items-center justify-between">
                  <button
                    class="text-primary border border-primary rounded-full px-6 py-1 text-xs uppercase"
                  >
                    Search
                  </button>
                </div>
              </td>
              <td>
                <Menu class="relative" as="div">
                  <MenuButton class="outline-none">
                    <i class="uil uil-ellipsis-h"></i>
                  </MenuButton>
                  <MenuItems
                    class="absolute z-[999] bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] py-2 right-0 min-w-[140px] rounded-xl overflow-hidden"
                  >
                    <div class="py-2 px-4 hover:bg-gray-50 text-sm">
                      <i class="uil uil-pen mr-2"></i> Edit
                    </div>

                    <div class="py-2 px-4 hover:bg-gray-50 text-sm">
                      <i class="uil uil-trash mr-2"></i> Remove
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
        text="No saved searches found"
      />
      </div>
    </div>
  </div>
  <IndexModal :isOpen="isOpen" @togglePopup="isOpen = false">
    <template #content>
      <div class="w-[400px] p-6 lg:p-8 rounded-lg">
        <form>
          <div class="mb-6">
            <div class="flex justify-between mb-6">
              <label class="font-medium text-lg block">Edit Search</label>
              <span
                @click="isOpen = false"
                class="hover:bg-gray-50 rounded-full h-6 w-6 flex items-center justify-center"
                ><AppIcon icon="heroicons-solid:x" class="w-4 h-4"
              /></span>
            </div>
            <input
              class="rounded-lg px-5 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            />
          </div>

          <div class="flex justify-end items-center gap-x-4">
            <button
              @click="isOpen = false"
              type="button"
              class="text-[13px] uppercase text-matta-black px-6 py-2 hover:text-primary/80"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="border text-[13px] border-primary uppercase text-white bg-primary-500 rounded-lg px-6 py-3 hover:bg-primary/80"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </template>
  </IndexModal>
</template>

<script setup>
import { useRoute } from "vue-router";
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";

const route = useRoute();
const isEmpty = ref(true);
const isOpen = ref(false);
defineProps(["title"]);
const theads = ["name", "created", "filters", ""];
const tdata = [
  {
    name: "Ethanol",
    created: "Mar 15, 11:05 PM",
    filters: "6",
  },
  {
    name: "Chemicals for Kate",
    created: "Mar 15, 11:05 PM",
    filters: "6",
  },
  {
    name: "Ethyl Acetate",
    created: "Mar 15, 11:05 PM",
    filters: "6",
  },
];
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
