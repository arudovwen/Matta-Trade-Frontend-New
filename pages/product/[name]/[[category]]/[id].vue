<template>
  <div>
    <div class="flex flex-col w-full container gap-y-5 py-10">
      <div>
        <ProductDetail />
      </div>
      <div>
        <ProductInformation />
      </div>
      <div>
        <ProductSimilar :content="reccomended" />
      </div>
      <div></div>
    </div>
  </div>
</template>
