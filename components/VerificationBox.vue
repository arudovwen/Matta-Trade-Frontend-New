<template>
  <div
    v-if="isOpen && route.path !== '/company-settings'"
    class="p-8 bg-matta-black rounded-xl flex justify-between gap-x-40 relative mb-3"
  >
    <div>
      <p
        class="text-[13px] uppercase text-[#ABABAB] mb-4"
        style="word-spacing: 4px"
      >
        Company verification
      </p>
      <p class="text-white text-base">
        To ensure the high quality of all participants on Matta, we verify each
        company. During the registration process, you didn’t fill in all the
        data required for verification.
      </p>
    </div>
    <div class="flex items-end">
      <!-- <button
        v-if="!showing === 'email'"
        class="px-8 py-4 rounded-full bg-primary-500 hover:bg-primary/80 uppercase text-[13px] text-white whitespace-nowrap"
      >
        validate your email
      </button> -->
      <router-link to="/company/settings"
        ><button
          class="px-8 py-4 rounded-full bg-primary-500 hover:bg-primary/80 uppercase text-white text-[13px] whitespace-nowrap"
        >
          Add Company Info
        </button></router-link
      >
    </div>
    <span
      @click="isOpen = false"
      class="cursor-pointer rounded-full h-6 w-6 flex items-center text-white justify-center absolute top-4 right-4"
      ><AppIcon icon="heroicons-solid:x" class="w-4 h-4 text-white"
    /></span>
  </div>

</template>
<script setup>
import { useRoute } from "vue-router";
import { getCompanyProfile } from "~/services/settingservices";
const route = useRoute();
const isOpen = ref(false);
const detail = ref(null);

onMounted(() => {
  getData();
});
function getData() {
  if (
    detail?.value?.companyName &&
    detail?.value?.email &&
    detail?.value?.phone
  )
    return;
  getCompanyProfile().then((res) => {
    detail.value = res.data.data;
    if (
      !res.data.data.companyName ||
      !res.data.data.email ||
      !res.data.data.phone
    ) {
      isOpen.value = true;
    }
  });
}
watch(route, () => {
  isOpen.value = false;
  getData();
});
</script>
