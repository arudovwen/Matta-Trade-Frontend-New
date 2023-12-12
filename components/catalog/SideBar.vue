<template>
  <aside class="lg:px-10 h-full max-h-[100vh] overflow-y-auto">
    <ul>
      <li v-for="(n, i) in menu" :key="i" class="mb-6">
        <div class="grid grid-cols-3 justify-between items-start">
          <span
            @click="
              () => {
                queryParams.MarketApplication = n.id;
                emitter.emit('toggleName', n);
                openIndex.push(Number(n.id));
                queryParams.MarketSubApplication = '';
                queryParams.MarketId = '';
                emits('cancel');
                router.push({ query: null });
              }
            "
            class="col-span-2 text-matta-black font-medium lg:text-lg cursor-pointer capitalize"
            >{{ n.title.toLowerCase() }}</span
          >

          <span
            @click="
              () => {
                openIndex.push(Number(n.id));
              }
            "
            class="text-right lg:text-lg"
            v-if="!openIndex.includes(n.id)"
            ><i class="uil uil-plus"></i
          ></span>
          <span
            class="text-right lg:text-lg"
            @click="dropIndex(n.id)"
            v-if="openIndex.includes(n.id)"
            ><i class="uil uil-minus"></i
          ></span>
        </div>
        <hr class="border-[#DDDDDD] my-4" />

        <!-- subs  -->
        <ul v-if="openIndex.includes(n.id)">
          <li
            @click="
              () => {
                queryParams.MarketSubApplication = subs.id;
                emitter.emit('toggleName', n);
                queryParams.MarketApplication = '';
                queryParams.MarketId = '';
                emits('cancel');
                router.push({ query: null });
              }
            "
            v-for="(subs, id) in n.categorySubMenu"
            :key="id"
            class="mb-1 hover:underline cursor-pointer"
          >
            <i
              class="uil uil-corner-down-right mr-2"
              v-show="queryParams.MarketSubApplication == subs.id"
            ></i>
            <span
              :class="`text-sm text-matta-black font-normal pr-1 capitalize ${
                queryParams.MarketSubApplication == subs.id
                  ? 'font-semibold'
                  : ''
              }`"
              >{{ subs.title.toLowerCase() }}</span
            >
            <!-- <span class="text-sm text-[#B6B7B9] font-normal capitalize">{{
              subs.productCount
            }}</span> -->
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>
<script setup>
import { ref, inject, onMounted, defineEmits } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const menu = inject("markets");
const queryParams = inject("queryParams");
const openIndex = ref([]);
const emitter = inject("emitter");
const emits = defineEmits(["cancel"]);
onMounted(() => {
  if (route.query.applicationTitle && route.query.applicationId) {
    openIndex.value.push(parseInt(route.query.applicationId));
  }
});

function dropIndex(val) {
  openIndex.value = openIndex.value.filter((i) => i !== val);
}
</script>
