<template>
  <div class="bg-[#222] py-20">
    <div class="container grid grid-cols-4 gap-x-4">
      <div
        class="p-[30px] rounded-[16px] bg-[rgba(255,255,255,0.03)]"
        v-for="n in content"
        :key="n.title"
      >
        <div>
          <span
            class="bg-[rgba(255,255,255,0.08)] h-[60px] w-[60px] rounded-full flex items0center justify-center mb-[30px]"
          >
            <img :src="n.img" :alt="n.title" width="40" height="40" />
          </span>
          <p class="mb-3 text-white text-xl max-w-[200px]">{{ n.title }}</p>
          <p class="mb-2 text-white text-sm">{{ n.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GridImg from "~/assets/images/grid.svg";
import CheckImg from "~/assets/images/check.svg";
import FolderImg from "~/assets/images/folder.svg";
import LayerImg from "~/assets/images/layer.svg";
const content = [
  {
    title: "Product listings from various suppliers",
    text: "Find products and suppliers from millions of global offerings for your business",
    img: GridImg,
  },
  {
    title: "Assured quality and transactions",
    text: "Ensure production grade materials from verified suppliers, with your orders protected from payment to delivery.",
    img: CheckImg,
  },
  {
    title: "One-stop trading solution",
    text: "Order products from suppliers seamlessly, from search to fulfillment.",
    img: FolderImg,
  },
  {
    title: "Personalized trading experience",
    text: "Get personalized benefits, such as free samples and dedicated support, tailored to your business needs.",
    img: LayerImg,
  },
];
</script>
