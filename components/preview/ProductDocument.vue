<template>
  <section class="flex flex-col gap-y-3">
    <div class="bg-white p-6 lg:p-8 rounded-lg">
      <div class="">
        <div
          class="flex items-center gap-x-4 mb-3"
          v-for="(n, id) in product.documentInfoModels"
          :key="id"
        >
          <div class="border rounded-xl p-5 flex flex-1 justify-between">
            <div class="flex gap-x-3 items-center">
              <i class="uil uil-file text-2xl"></i>

              <div>
                <p class="text-sm text-matta-black capitalize">
                  {{ n.fileName }}
                </p>
                <p class="text-xs text-[#ABABAB]">
                  {{ parseInt(n.fileSize / 1000) }}kb
                </p>
              </div>
            </div>
            <div class="flex items-center gap-x-5">
              <div class="flex-1">{{ n.category }}</div>
              <span class="text-gray-200 text-3xl font-light">| </span>
              <div class="flex items-center">
                <a :href="n.documentUrl" :download="n.fileName">
                  <span
                    class="border border-gray-300 rounded-full h-8 w-8 flex items-center justify-center"
                    ><i class="uil uil-import"></i></span
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div></div>
</template>
<script setup>
import { inject } from "vue";

const product = inject("product");
</script>
