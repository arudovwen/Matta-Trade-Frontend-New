<template>
  <aside class="px-8 h-full">
    <h3 class="text-lg font-medium mb-12 px-2">Select product category</h3>
    <div class="max-h-[80vh] overflow-y-auto px-2">
      <ul>
        <li v-for="(n, i) in menu" :key="i" class="mb-6">
          <div class="grid grid-cols-3 justify-between items-start">
            <span
              class="col-span-2 text-matta-black font-medium text-xl cursor-pointer"
              >{{ n.title }}</span
            >
            <span
              class="text-right text-lg"
              @click="handleIndex(i)"
              v-if="!openIndex.includes(i)"
              ><i class="uil uil-plus"></i
            ></span>
            <span
              class="text-right text-lg"
              @click="dropIndex(i)"
              v-if="openIndex.includes(i)"
              ><i class="uil uil-minus"></i
            ></span>
          </div>
          <hr class="border-[#DDDDDD] my-4" />
          <!-- subs  -->
          <ul v-if="openIndex.includes(i)">
            <li
              v-for="(subs, id) in n.categorySubMenu"
              :key="id"
              class="mb-1 hover:underline"
            >
              <span class="text-sm text-matta-black font-normal pr-1">{{
                subs.title
              }}</span>
              <!-- <span class="text-sm text-[#B6B7B9] font-normal capitalize">{{
                subs.productCount
              }}</span> -->
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </aside>
</template>
<script setup>
import { ref, inject } from "vue";
const menu = inject("markets");

const openIndex = ref([]);

function handleIndex(val) {
  openIndex.value.push(val);
}
function dropIndex(val) {
  openIndex.value = openIndex.value.filter((i) => i !== val);
}
</script>
