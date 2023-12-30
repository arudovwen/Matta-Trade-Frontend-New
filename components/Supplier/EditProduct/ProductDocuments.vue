<template>
  <section class="flex flex-col gap-y-3">
    <div class="bg-white p-6 lg:p-8 rounded-lg h-[300px] flex flex-col">
      <p class="mb-5 flex items-center text-sm">
        <InformationCircleIcon class="w-4 h-4 text-matta-black mr-1" /> Please
        attach the manufacturer's MSDS, COA, and TDS here and indicate the
        document type.
      </p>

      <Uploader @onGetFiles="onGetFiles" :isMultiple="true" type="doc" />
    </div>
    <div
      class="bg-white p-6 lg:p-8 rounded-lg"
      v-if="form && form.documents && form.documents.length"
    >
      <div class="w-[85%]">
        <div
          class="flex items-center gap-x-4 mb-3"
          v-for="(n, id) in form.documents"
          :key="id"
        >
          <div class="border rounded-xl p-5 flex flex-1 justify-between">
            <div class="flex gap-x-3 items-center">
              <i class="uil uil-file text-2xl"></i>

              <div>
                <p
                  class="text-sm text-matta-black capitalize truncate max-w-[250px]"
                >
                  {{ n.fileName }}
                </p>
                <p class="text-xs text-[#ABABAB]">{{ n.size }}</p>
              </div>
            </div>
            <div class="flex items-center gap-x-5">
              <div class="flex-1">
                <Listbox v-model="n.category">
                  <div class="relative mt-1">
                    <ListboxButton
                      class="relative text-left flex gap-x-3 items-center rounded-lg px-5 py-3 h-12 placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                    >
                      <span class="mr-2 capitalize" v-if="n.category">{{
                        n.category
                      }}</span>
                      <span class="text-sm text-matta-black mr-2" v-else
                        >Select category</span
                      >
                      <span
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-3 pr-2"
                      >
                        <ChevronUpDownIcon
                          class="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </ListboxButton>

                    <transition
                      leave-active-class="transition duration-100 ease-in"
                      leave-from-class="opacity-100"
                      leave-to-class="opacity-0"
                    >
                      <ListboxOptions
                        class="absolute mt-1 mx-h-60 w-[300px] z-40 overflow-auto rounded-md bg-white py-4 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      >
                        <ListboxOption
                          v-slot="{ selected }"
                          v-for="(p, i) in form.documentproperties"
                          :key="i"
                          :value="p.value"
                          as="template"
                        >
                          <li
                            :class="[
                              selected
                                ? 'text-blue-800 bg-blue-50'
                                : 'font-normal text-matta-black',
                              'relative cursor-pointer capitalize text-matta-black  hover:text-primary select-none py-2 pl-6 pr-4 text-left',
                            ]"
                          >
                            <div class="flex gap-x-4 items-start">
                              <div>
                                <p class="text-sm font-medium">{{ p.text }}</p>
                                <p class="text-xs">{{ p.item }}</p>
                              </div>
                              <i
                                class="uil uil-check text-blue-800"
                                v-if="selected"
                              ></i>
                            </div>
                          </li>
                        </ListboxOption>
                        <p
                          v-if="!form.documentproperties.length"
                          class="text-[#B6B7B9] py-2 pl-6 pr-4 text-sm"
                        >
                          Nothing found
                        </p>
                        <!-- <hr class="my-2" />
                        <div class="py-2 pl-6 pr-4">
                          <button
                            type="button"
                            class="text-primary"
                            @click="openmodal(id)"
                          >
                            <i class="uil uil-plus text-sm"></i> Add new item
                          </button>
                        </div> -->
                      </ListboxOptions>
                    </transition>
                  </div>
                </Listbox>
              </div>
              <span class="text-gray-200 text-3xl font-light">| </span>
              <div class="flex items-center">
                <a :href="n.base64" :download="n.fileName">
                  <span
                    class="border border-gray-300 rounded-full h-8 w-8 flex items-center justify-center"
                    ><i class="uil uil-import"></i></span
                ></a>
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <span
              @click="removeFile(id)"
              class="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center"
              ><i class="uil uil-times"></i
            ></span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-white rounded-lg px-10 py-6 flex justify-between gap-x-10 items-center"
    >
      <button
        type="button"
        @click="togglePreview"
        class="appearance-none leading-none px-10 py-4 rounded-full text-primary border-primary border hover:bg-gray-100 text-[13px] uppercase"
      >
        PREVIEW
      </button>
      <div class="flex justify-center gap-x-4 items-center">
        <button
          type="button"
          @click="toggleNext(2)"
          class="appearance-none leading-none px-10 py-4 rounded-full text-matta-black bg-[#F1F3F5] hover:bg-gray-300 text-[13px] uppercase"
        >
          Back
        </button>
        <button
          type="button"
          @click="handleSubmit"
          :disabled="isLoading"
          class="appearance-none leading-none px-10 py-4 rounded-full text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase"
        >
          Complete
        </button>
      </div>
    </div>
  </section>
  <div>
    <Modal :isOpen="isAdding" @toggleModal="isAdding = false">
      <template #content>
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-[400px]">
          <div class="flex justify-between mb-5 items-center">
            <h4 class="font-medium text-matta-black text-xl">Add new value</h4>
            <i
              class="uil uil-times cursor-pointer text-lg hover:ring-1 w-6 h-6 ring-gray-200 flex items-center justify-center hover:ring-offset-2 rounded-full"
              @click="isAdding = false"
            ></i>
          </div>
          <input
            v-model="category"
            class="rounded-lg px-3 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            autocomplete="off"
            autofocus="on"
            placeholder="Enter package name..."
          />

          <div class="flex justify-end gap-x-2 items-center mt-8">
            <button
              type="button"
              @click="isAdding = false"
              class="appearance-none text-xs leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 uppercase"
            >
              Cancel
            </button>

            <button
              type="button"
              @click="handleAddingPackage"
              class="appearance-none text-xs leading-none px-8 py-3 rounded-lg text-white bg-primary-500 hover:opacity-70 uppercase"
            >
              Save
            </button>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>
<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { ref, inject } from "vue";
import {
  ChevronUpDownIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/solid";
import Uploader from "~/components/UploadComponent";
import Modal from "~/components/IndexModal";
import { updateDocuments } from "~/services/productservices";
import { useRouter } from "vue-router";
import { toast } from 'vue3-toastify';

const router = useRouter();

const category = ref("");
const isAdding = ref(false);
const index = ref(null);
const toggleNext = inject("toggleNext");
const togglePreview = inject("togglePreview");
const form = inject("form");
function onGetFiles(file) {
  form.documents = [
    ...form.documents,
    {
      id: 0,
      category: "",
      fileName: file.fileName,
      file: file.url,
      size: file.size,
      fileSize: file.fileSize,
      documentUrl: file.url,
    },
  ];
}
function removeFile(id) {
  form.documents.splice(id, 1);
}
function handleAddingPackage() {
  form.properties.push(category.value);
  form.documents[index.value].category = category.value;
  isAdding.value = false;
  category.value = "";
}
// function openmodal(id) {
//   index.value = id;
//   isAdding.value = true;
// }
const isLoading = ref(false);
async function handleSubmit() {
  isLoading.value = true;

  updateDocuments(form)
    .then((res) => {
      if (res.status === 200) {
        toast.info("Information saved", {
          position: "bottom",
          duration: 4000,
        });
        router.push(`/storefront/products`);
      }
    })

    .catch((err) => {
      isLoading.value = false;

      toast.error(err.response.data.Message);
    });
}
</script>
