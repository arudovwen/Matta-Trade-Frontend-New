<template>
  <div>
    <label class="block text-sm mb-[5px]">{{ label }}</label>
    <div
      class="flex-1 rounded-lg py-1 pr-[14px] pl-2 h-12 text-sm w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20 flex items-center"
    >
      <input
        ref="fileInputRef"
        type="file"
        class="hidden"
        @change="handleEvent"
        accept="pdf, doc,docx"
      />
      <div class="flex-1 px-4">
        <span class="max-w-max truncate text-[#999999]">{{
          title || "Select a document"
        }}</span>
      </div>
      <button
        type="buton"
        @click="triggerFileInput"
        class="text-xs text-[#165EF0] border border-[#165EF0] rounded px-5 py-[6px] active:scale-[.95] leading-normal w-20 flex justify-center"
      >
        <div
          v-if="loading"
          class="loader border-t-4 border-blue-500 border-solid rounded-full h-3 w-3 animate-spin"
        ></div>
        <span v-else>Upload</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { uploadfile } from "~/services/onboardingservices";
import { defineProps, ref, inject } from "vue";
import { toast } from 'vue3-toastify';

const props = defineProps(["label", "id"]);

const handleChange = inject("handleChange");
const fileInputRef = ref(null);
const title = ref("");
const loading = ref(false)
function handleEvent(e) {
  const file = e.target.files[0];

  if (!file) return;

  const allowedExtensions = ["jpeg", "png", "jpg", "pdf", "doc", "docx", "xlsx", "csv"]; // Add more allowed extensions if needed
  const fileExtension = file.name.split(".").pop().toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    // Show an error message or handle accordingly
    toast.error("Invalid file type. Please upload a document.");
    return;
  }
  title.value = file.name;
  const reader = new FileReader();

  reader.onload = function (event) {
    const base64String = event.target.result.split(",")[1];
    loading.value = true
    // Assuming canvas and uploadfile are available
    uploadfile({ base64: base64String })
      .then((res) => {
        loading.value = false
        handleChange(props.id, res.data.message);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        loading.value = false
      });
  };

  reader.onerror = function (error) {
    console.error("Error reading file:", error);
  };

  reader.readAsDataURL(file);
}
function triggerFileInput() {
  fileInputRef.value.click();
}
</script>
