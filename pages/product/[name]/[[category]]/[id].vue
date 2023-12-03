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
<script setup>
import { get } from "~/helpers/api_helpers";
import { getProduct } from "~/services/productservices";
import { useProductStore } from "@/stores/products";

const store = useProductStore();

const route = useRoute();
const { id } = route.params;

function getAProduct() {
  store.setLoader(true);
  getProduct(id)
    .then((res) => {
      if (res.status === 200) {
        store.setProduct(res.data.data);
        store.setLoader(false);
      }
    })
    .catch(() => {
      setLoader(false);
    });
}

onMounted(() => {
  getAProduct();
});
</script>
