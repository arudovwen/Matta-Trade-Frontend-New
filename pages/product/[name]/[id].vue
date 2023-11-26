<template>
  <div>
    <div class="flex flex-col w-fll">
      <MarketBanner />

      <div class="flex flex-1 container py-10 w-full gap-x-[22px]">
        <div class="max-w-[250px] w-full"><MarketSideBar /></div>
        <div class="flex-1">
            <MarketContent />
        </div>
      </div>
    </div>
  </div>
</template>
