<template>
  <div
    class="gap-y-2 flex flex-col bg-white rounded-[10px] pb-10 border border-[#F4F7FE]"
  >
    <HeaderComponent
      title="Customization"
      subtext="Setup the look and feel of your store"
    />
    <!-- Top bar   -->
    <div class="p-[30px]">
      <form @submit.prevent="onSubmit">
        <div class="mb-6 grid grid-cols-1 xl:grid-cols-2 xl:gap-x-6 gap-y-5">
          <Textinput
            placeholder=""
            label="Name of store"
            name="storeName"
            v-bind="storeNameAtt"
            v-model="storeName"
            :error="errors.storeName"
          />
          <Textinput
            placeholder=""
            label="Store url"
            name="storeUrl"
            :modelValue="formValues.storeUrl"
            disabled
            isReadonly
          />
        </div>

        <div class="mb-6">
          <label class="mb-2 font-normal text-sm block"
            >Storefront Banner
            <span class="text-[#B9B9B9]">(Optional)</span></label
          >
          <UploadComponent
            @onGetFiles="onGetFiles"
            @removeFile="removeFile"
            :gallery="formValues.banner"
            support="SVG, PNG, JPG (max. 800x400px)"
          />
        </div>

        <div class="mb-6">
          <label class="mb-1 font-normal text-sm block"
            >Campaign Banner
            <span class="text-[#B9B9B9]">(Optional)</span></label
          >
          <p class="mb-2 text-xs text-[#555555]">
            Campaign banners can be used to show you’re running a discount
            promotion
          </p>
          <UploadComponent
            @onGetFiles="onGetFiles"
            @removeFile="removeFile"
            :gallery="formValues.campaign"
            support="SVG, PNG, JPG (max. 800x400px)"
            recommended="Recommended size: 1000px by 150px"
          />
        </div>

        <div
          class="bg-white flex justify-between gap-x-10 items-center sticky bottom-0 pb-6"
        >
          <router-link to="/company/settings"
            ><button
              type="button"
              class="appearance-none leading-none px-10 py-[10px] rounded-lg text-primary border-primary- border hover:bg-gray-300 text-[13px]"
            >
              Cancel
            </button></router-link
          >
          <div class="flex gap-x-4 items-center">
            <button
              :disabled="isLoading"
              :class="{
                'bg-primary/60 cursor-not-allowed': isLoading,
              }"
              type="submit"
              class="appearance-none leading-none px-10 py-[10px] rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px]"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";

const isLoading = ref(false);
const formValues = {
  storeName: "",
  storeUrl: "https://matta.trade/storename",
  banner: [],
  campaign: [],
};

const schema = yup.object({
  storeUrl: yup.string().required("Name is required"),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
const onGetFiles = (value) => {
  console.log("🚀 ~ onGetFiles ~ value:", value);
};
const removeFile = () => {};
const authStore = useAuthStore();
const [storeName, storeNameAtt] = defineField("storeName");

const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ onSubmit ~ values:", values);
  isLoading.value = true;
});

const togglePreview = () => {};
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
