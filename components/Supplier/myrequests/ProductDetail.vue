<template>
  <div>
    <div class="mb-8">
      <h3 class="font-medium text-xl text-gray-700 capitalize">
        Request Detail
      </h3>
    </div>

    <div class="mb-8">
      <p class="font-medium text-base mb-4">
        <span class="text-gray-500">Date </span> <br />
        {{ moment(request.created).format("l") }}
      </p>

      <p class="font-medium text-base mb-4">
        <span class="text-gray-500">Business name </span> <br />
        {{ request.businessName }}
      </p>
      <p class="font-medium text-base mb-4">
        <span class="text-gray-500">Chemical name </span> <br />
        {{ request.chemicalName }}
      </p>
      <p class="font-medium text-base mb-4 gap-x-2">
        <span class="text-gray-500">Quantity </span> <br />
        {{ request.quantity }}
      </p>
      <p class="font-medium text-base mb-4 gap-x-2">
        <span class="text-gray-500">Unit </span> <br />
        {{ request.unit }}
      </p>

      <div class="bg-[#F1F3F5] rounded-lg p-6 text-matta-black mb-6">
        <div class="flex justify-between mb-4">
          <h3 class="text-lg font-medium">Customer information</h3>
          <span><i class="uil uil-minusext-lg"></i></span>
        </div>
        <div class="">
          <p class="font-medium text-base mb-2 flex items-center gap-x-2">
            <span class="text-gray-500">Full name :</span>
            {{ request.fullName }}
          </p>
          <p class="font-medium text-base mb-2 flex items-center gap-x-2">
            <span class="text-gray-500">Email :</span> {{ request.email }}
          </p>
          <p class="font-medium text-base mb-8 flex items-center gap-x-2">
            <span class="text-gray-500">Phone number :</span>
            {{ request.phoneCode }}-{{ request.phone }}
          </p>
        </div>
      </div>
      <div class="text-right">
        <button
          v-if="request.uploadedDocument"
          @click="downloadUsingFetch()"
          class="text-blue-600 text-base mb-4 flex items-center gap-x-2 font-medium"
        >
          Download Document
          <span
            class="border border-gray-300 rounded-full h-8 w-8 flex items-center justify-center"
            ><i class="uil uil-import"></i
          ></span>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import moment from "moment";

const props = defineProps(["request"]);

async function downloadUsingFetch() {
  const image = await fetch(props.request.uploadedDocument);
  const FILE_NAME = "document";
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const anchor = document.createElement("a");
  anchor.href = imageURL;
  anchor.download = FILE_NAME;

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(imageURL);
}
</script>
