<template>
  <div>
    <Breadcrumbs
      className="mb-8 !text-[#333] last:!text-[#165EF0]"
      :links="links"
    />
    <div class="p-[30px] bg-white rounded-[10px] flex gap-x-[44px]">
      <div class="flex-1 flex gap-x-[14px]">
        <div class="w-[100px] flex flex-col gap-y-3">
          <img
            src="/images/4.png"
            v-for="n in 4"
            :key="n"
            :alt="n"
            width="100px"
            height="100"
            class="bg-gray-100 w-[100px] h-[100px] rounded-[5px]"
          />
        </div>
        <div class="flex-1">
          <img
            src="/images/4.png"
            alt="cover"
            width="400"
            height="300"
            class="bg-gray-100 w-full h-[460px] rounded-[5px] object-cover"
          />
        </div>
      </div>
      <div class="w-[520px]">
        <h1 class="font-bold text-[32px] mb-6">{{ name }}</h1>
        <p class="text-[#444] text-sm mb-6">
          Styrene-acrylic emulsion polymers are based on a group of chemicals
          that are true workhorses in the field of polymer chemistry.
        </p>
        <p class="text-2xl text-[#165EF0] font-[800] mb-6">
          1,200 <span class="text-sm text-[#444] font-normal">/kg</span>
        </p>
        <p class="text-sm mb-6">
          <span class="font-normal">Producer:</span
          ><span class="font-bold"> A Huber Company</span>
        </p>
        <div class="flex gap-x-[18px] mb-6">
          <AppButton
            link="#n"
            text="Request sample"
            btnClass="!rounded-[5px] !text-[#333] px-[15px] !py-[6px] text-xs sm:text-sm border border-[#DBDBDB]"
          />
          <AppButton
            link="/auth/vendor-register"
            text="Request quote"
            btnClass="!rounded-[5px] !text-[#333] px-[15px] !py-[6px] text-xs sm:text-sm border border-[#DBDBDB]"
          />
          <AppButton
            link="#"
            icon="tdesign:heart"
            text="Save for later"
            btnClass="text-xs sm:text-sm !px-0"
          />
        </div>
        <div class="mb-6">
          <h2 class="font-bold text-sm mb-2">Choose packaging</h2>
          <Select
            :options="options"
            placeholder="Select a package"
            classInput="min-w-[180px] w-full !bg-white !border-[#E7E7E7] !rounded-[4px] !text-[#333] !h-[50px] cursor-pointer bg-[#FCFCFC]"
          />
        </div>
        <div class="flex gap-x-4">
          <div
            class="gap-x-4 rounded p-[2px] bg-[#F4F4F4] flex items-center flex-1"
          >
            <button
              type="button"
              :disabled="counter === 1"
              @click="counter--"
              class="h-11 w-11 rounded flex items-center justify-center bg-white disabled:opacity-60"
            >
              <AppIcon icon="uiw:minus" />
            </button>
            <div class="flex-1">
              <input
                v-model="counter"
                class="h-11 bg-transparent rounded font-medium text-center outline-none w-full"
              />
            </div>
            <button
              type="button"
              @click="counter++"
              class="h-11 w-11 rounded flex items-center justify-center bg-white"
            >
              <AppIcon icon="uiw:plus" />
            </button>
          </div>
          <AppButton
            @click="addToCart"
            text="Add to cart"
            icon="bytesize:cart"
            btnClass="bg-primary-500 text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm !w-[160px]"
          />
          <AppButton
            link="/cart"
            icon="icon-park-outline:mall-bag"
            text="Buy now"
            btnClass="text-white  !px-[15px] !py-[13px] !normal-case bg-[#f90] hidden md:flex !w-[160px]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const router = useRoute();
const { name, id, category } = router.params;

const links = [
  {
    title: "home",
    url: "/",
  },
  {
    title: category,
    url: "#",
  },
  {
    title: name,
    url: "#",
  },
];
const options = [
  {
    label: "Plastic drums",
    value: "lh",
  },
];
const counter = ref(1);
function addToCart() {}
</script>
