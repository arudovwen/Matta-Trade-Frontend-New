<template>
  <div>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="handleclose">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-[#222222]/60 transition-opacity"
          />
        </TransitionChild>

        <div class="fixed z-10 inset-0 overflow-y-auto">
          <div
            class="flex items-center md:items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full"
              >
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="flex justify-between mb-5 items-center">
                    <h4 class="font-medium text-matta-black text-xl">
                      {{ title }}
                    </h4>
                    <i
                      class="uil uil-times cursor-pointer text-lg"
                      @click="handleclose"
                    ></i>
                  </div>

                  <p class="text-sm text-matta-black mb-2">
                    {{ text }}
                  </p>
                  <input
                    class="rounded-lg px-5 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                    v-model="text"
                  />
                  <div class="flex justify-end gap-x-2 items-center mt-8">
                    <button
                      type="button"
                      @click="handleclose"
                      class="appearance-none leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 text-[13px] uppercase"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      @click="deleteItem"
                      :disabled="text != 'Delete'"
                      class="appearance-none leading-none px-8 py-3 rounded-lg text-white bg-primary-500 hover:bg-priamry/70 text-[13px] uppercase"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>

import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const text = ref("");
defineProps(["title", "text", "open"]);
const emits = defineEmits(["deleteItem", "close"]);

function deleteItem() {
  emits("deleteItem");
}
function handleclose() {
  emits("close");
}
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
