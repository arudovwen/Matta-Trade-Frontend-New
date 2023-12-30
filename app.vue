<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html {
  scroll-behavior: smooth;
  box-sizing: border-box;
}
body {
  font-family: "Manrope", sans-serif;
  color: #333333;
}

.dark-mode {
  @apply text-white bg-gray-800;
}

.light-mode {
  @apply text-[#333] bg-white;
}

.recommended .carousel__viewport .carousel__track {
  column-gap: 24px;
  @media (max-width: 768px) {
    column-gap: 16px;
  }
  @media (max-width: 465px) {
    column-gap: 10px;
  }
  .carousel__prev {
    left: -26px !important;
  }
  .carousel__next {
    right: -26px !important;
  }
}
.carousel__viewport .carousel__track {
  column-gap: 34px;
  @media (max-width: 768px) {
    column-gap: 16px;
  }
  @media (max-width: 465px) {
    column-gap: 10px;
  }
}
.carousel__prev {
  left: -26px !important;
}
.carousel__next {
  right: -26px !important;
}
 body::-webkit-scrollbar, .no-scrollbar::-webkit-scrollbar {
  display: none;
}

body, .no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* width */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f4f4f4;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #165EF0;
  border-radius: 8px;
  height: 100px;
 
}

::-webkit-scrollbar:horizontal {
  width: 5px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track:horizontal {
  background: #f4f4f4;
}

/* Handle */
::-webkit-scrollbar-thumb:horizontal {
  background: #165EF0;
  width: 50px;
  border-radius: 8px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  opacity: 0.9;
}

</style>

<script setup>
import { useMarketStore } from "~/stores/markets";
import { useApplicationStore } from "~/stores/applications";
import { getMarkets, getTechLevels } from "~/services/productservices";

import AOS from "aos";
import "aos/dist/aos.css";

const store = useMarketStore();
const  appStore = useApplicationStore()
const query = reactive({
  PageNumber: 1,
  PageSize: 200,
});
const getAllMarkets = () => {
  getMarkets(query).then((res) => {
    if (res.status === 200) {
      store.setMarkets(res.data.data);
    }
  });
};
const getAllApplications = () => {
  getTechLevels(query).then((res) => {
    if (res.status === 200) {
      appStore.setApplications(res.data.data);
    }
  });
};
onMounted(() => {
  AOS.init();
  getAllApplications();
  getAllMarkets();
});
</script>
