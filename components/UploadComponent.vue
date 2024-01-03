<template>
  <div
    @drop.prevent="onDrop"
    class="border mb-6 border-dashed flex-1 border-primary bg-[rgba(22,94,240,0.04)] rounded-2xl p-4 flex items-center justify-center text-center"
  >
    <div>
      <div
        class="text-center mb-5 h-10 w-10 flex mx-auto items-center justify-center rounded-full border border-primary"
      >
        <i class="uil uil-paperclip text-primary text-lg"></i>
      </div>

      <p class="text-sm">
        Drag & Drop Files, or
        <label for="file" class="text-primary cursor-pointer ml-1"
          >Browse</label
        >
      </p>
      <p class="text-xs text-[#ABABAB]">Support {{ accepts }} files</p>
    </div>
  </div>
  <input
    type="file"
    id="file"
    class="hidden"
    :accept="accepts"
    @change="handleFile"
    :multiple="isMultiple"
  />
  <div
    class="bg-white flex flex-wrap gap-2 max-h-full overflow-y-auto rounded-lg"
    v-if="type === 'image'"
  >
    <span v-for="(n, i) in gallery" :key="i">
      <span
        class="h-24 w-24 rounded-lg bg-white flex items-center justify-center border relative border-[#E7EBEE]"
        > <NuxtImg :src="n" alt="logo" class="w-full h-full rounded-lg" />
        <span
          class="bg-white text-matta-black h-5 w-5 flex items-center justify-center absolute -top-1 -right-2"
          @click="removeFile(i)"
        >
          <i class="uil uil-times"></i> </span
      ></span>
    </span>
  </div>
  <span
    ><i
      v-if="isLoading"
      class="fa fa-spinner fa-spin text-6xl text-matta-black"
      aria-hidden="true"
    ></i
  ></span>
</template>
<script setup>
import { ref, onMounted, defineProps, defineEmits, computed } from "vue";
import { uploadfile, uploaddocument } from "~/services/onboardingservices";
// import axios from "axios";
const images = ref([]);
const documents = ref([]);
const emits = defineEmits(["onGetFiles", "removeFile"]);
const props = defineProps({
  isMultiple: { default: true },
  type: { default: "image" },
  gallery: { default: [] },
});
const events = ["dragenter", "dragover", "dragleave", "drop"];
onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults);
  });
});
function preventDefaults(e) {
  e.preventDefault();
}
const isLoading = ref(false);
function handleFile(e) {
  const files = [...e.target.files];

  files.forEach((file) => {
    isLoading.value = true;
    // Encode the file using the FileReader API
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // Use a regex to remove data url part
      const base64String = reader.result;
      // .replace("data:", "")
      // .replace(/^.+,/, "");
      let data = {
        fileName: file.name,
        size: `${file.size / 1000}kb`,
        file: file,
        base64: base64String,
        fileSize: file.size,
      };
      const ext = file.name.substring(file.name.lastIndexOf(".") + 1);
      if (props.type == "image") {
        images.value.push(base64String);
      }
      if (props.type == "doc") {
        documents.value.push(data);
      }

      if (props.type == "image") {
        uploadfile({
          base64: base64String.replace("data:", "").replace(/^.+,/, ""),
        }).then((res) => {
          emits("onGetFiles", res.data.message);
          isLoading.value = false;
        });
      } else {
        uploaddocument({
          base64: base64String.replace("data:", "").replace(/^.+,/, ""),
          ext: `.${ext}`,
        }).then((res) => {
          data.url = res.data.message;
          emits("onGetFiles", data);
          isLoading.value = false;
        });
      }
      // uploadfile({
      //   base64: base64String.replace("data:", "").replace(/^.+,/, ""),
      // }).then((res) => {
      //   emits("onGetFiles", props.type == "image" ? res.data.message : data);
      // });
    };
  });
}

function onDrop(e) {
  const files = [...e.dataTransfer.files];
  files.forEach((img) => {
    // Encode the file using the FileReader API
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => {
      // Use a regex to remove data url part
      const base64String = reader.result;
      // .replace("data:", "")
      // .replace(/^.+,/, "");

      images.value.push(base64String);
    };
  });
  emits("onGetFiles", images.value);
}

function removeFile(id) {
  images.value.splice(id, 1);
  emits("removeFile", id);
}
const accepts = computed(() => {
  let val;
  switch (props.type) {
    case "image":
      val = ".png, .jpg, .jpeg";
      break;
    case "doc":
      val = ".pdf";
      break;
  }
  return val;
});
</script>
