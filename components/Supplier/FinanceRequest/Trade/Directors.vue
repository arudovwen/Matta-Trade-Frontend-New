<template>
  <div  class="w-full mt-6">
    <form @submit.prevent="onSubmit" class="grid grid-cols-2 gap-x-[25px] gap-y-4 mb-[50px]">
      <Textinput
        placeholder=""
        label="Full Name"
        name="name"
        v-bind="nameAtt"
        v-model="name"
        :error="errors.name"
      />

      <Textinput
        placeholder=""
        label="bvn"
        name="bvn"
        v-bind="bvnAtt"
        v-model="bvn"
        :error="errors.bvn"
      />

      <Textinput
        placeholder=""
        label="Email"
        name="email"
        v-bind="emailAtt"
        v-model="email"
        :error="errors.email"
      />

      <Textinput
        placeholder=""
        label="Phone number"
        name="phoneNumber"
        v-bind="phoneNumberAtt"
        v-model="phoneNumber"
        :error="errors.phoneNumber"
      />

      <div class="md:col-span-2">
        <Textinput
          placeholder=""
          label="Linkedin"
          name="linkedin"
          v-bind="linkedinAtt"
          v-model="linkedin"
          :error="errors.linkedin"
        />
      </div>

      <FormGroup :error="errors.id" class="col-span-2">
        <FileUpload
          label="Upload ID (Passport, Driver’s License, or NIN)"
          id="id"
        />
      </FormGroup>
      <FormGroup :error="errors.signature" class="col-span-2">
        <FileUpload label="Upload Signature" id="signature" />
      </FormGroup>
      <div class="flex itemx-center gap-x-2 mb-6">
        <button
          type="submit"
          class="appearance-none leading-none px-[14px] py-[10px] grid-cols-1 lg:grid-cols-2 gap-4 rounded-lg text-primary-500 border border-primary-500 hover:opacity-70 text-xs"
        >
          <span class=""> + Add another director</span>
        </button>
        <span class="text-[#B9B9B9]">(Optional)</span>
      </div>
      <div
        v-if="directors.length"
        class="w-full rounded-[10px] border border-[#EAECF0] overflow-hidden"
      >
        <table class="w-full">
          <thead>
            <tr>
              <th
                class="capitalize text-[#475467] text-sm text-left font-medium border-b py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
              >
                Name
              </th>
              <th
                class="capitalize text-[#475467] text-sm text-left font-medium border-b py-3 px-6 border-[#EAECF0] whitespace-nowrap bg-[#F9FAFB]"
              ></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(director, id) in directors"
              :key="id"
              class="border-b last:border-none"
            >
              <td
                class="text-matta-black text-sm font-normal py-4 px-6 border-[#EAECF0] whitespace-nowrap"
              >
                {{ director?.name }}
              </td>
              <td
                class="text-matta-black text-sm font-normal py-4 px-6 border-[#EAECF0] whitespace-nowrap"
              >
                <span class="flex gap-x-3 items-center justify-end">
                  <span class="p-1"><i class="uil uil-pen"></i></span>
                  <span class="p-1" @click="handleDelete(id)"
                    ><i class="uil uil-trash text-red-500"></i
                  ></span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
    <div class="flex gap-x-4 items-center justify-between">
      <AppButton
        @click="active--"
        btnClass="bg-white text-white !px-11  !text-sm !py-[10px] disabled:cursor-not-allowed border border-[#BDC0C5] !rounded-lg !text-[#333]"
        type="button"
        text="Previous"
      />
      <AppButton
        :disabled="isLoading || !directors.length"
        :isLoading="isLoading"
        btnClass="bg-primary-500 text-white !px-16  !text-sm !py-[10px] disabled:cursor-not-allowed border  !rounded-lg border-primary-500"
        type="button"
        text="Next"
      />
    </div>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";

const isLoading = ref(false);
const directors = ref([]);
const formValues = reactive({
  name: "",
  bvn: "",
  email: "",
  phoneNumber: "",
  linkedin: "",
  id: "",
  signature: "",
});
const active = inject("active");

const formSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  bvn: yup
    .string()
    .required("BVN is required")
    .matches(/^\d{11}$/, "BVN must be 11 digits"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(/^\d{11}$/, "Phone Number must be 11 digits"),
  linkedin: yup.string().url("Invalid LinkedIn URL"),
  id: yup.string().required("ID is required"),
  signature: yup.string().required("Signature is required"),
});

const { handleSubmit, defineField, errors, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: formValues,
});

const [name, nameAtt] = defineField("name");
const [bvn, bvnAtt] = defineField("bvn");
const [email, emailAtt] = defineField("email");
const [phoneNumber, phoneNumberAtt] = defineField("phoneNumber");
const [linkedin, linkedinAtt] = defineField("linkedin");

function handleChange(id, value) {
  setFieldValue(id, value);
}

const formData = inject("formData")
const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ onSubmit ~ values:", values);
  directors.value = [...directors.value, values]
  formData.directors = directors.value

});
const  handleNext=() => {

  active.value = 4
};

const options = [
  {
    label: "1 month",
    value: 0,
  },
  {
    label: "3 month",
    value: 1,
  },
];
provide("handleChange", handleChange);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
