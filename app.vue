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
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>

<script setup>
import { useMarketStore } from "@/stores/markets";
import { useApplicationStore } from "@/stores/applications";
import { getMarkets, getTechLevels } from "~/services/productservices";

import AOS from "aos";
import "aos/dist/aos.css";

const { setMarkets } = useMarketStore();
const { setApplications } = useApplicationStore();
const query = reactive({
  PageNumber: 1,
  PageSize: 200,
});
const getAllMarkets = () => {
  getMarkets(query).then((res) => {
    if (res.status === 200) {
      setMarkets(res.data.data);
    }
  });
};
const getAllApplications = () => {
  getTechLevels(query).then((res) => {
    if (res.status === 200) {
      setApplications(res.data.data);
    }
  });
};
onMounted(() => {
  AOS.init();
  getAllApplications();
  getAllMarkets();
});
</script>
