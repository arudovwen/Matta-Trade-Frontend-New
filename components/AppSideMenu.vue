<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-[999]" @close="emits('toggleOpen')">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-20 md:pl-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel
                class="pointer-events-auto relative w-screen max-w-md"
              >
                <TransitionChild
                  as="template"
                  enter="ease-in-out duration-500"
                  enter-from="opacity-0"
                  enter-to="opacity-100"
                  leave="ease-in-out duration-500"
                  leave-from="opacity-100"
                  leave-to="opacity-0"
                >
                  <div
                    class="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4"
                  >
                    <button
                      type="button"
                      class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      @click="emits('toggleOpen')"
                    >
                      <span class="sr-only">Close</span>
                      <AppIcon icon="ph:x" class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                <div
                  class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl"
                >
                  <div class="relative flex-1 px-4 sm:px-6">
                    <!-- Replace with your content -->
                    <div class="absolute inset-0 px-4 sm:px-6">
                      <div
                        class="h-full border-2 border-dashed border-gray-200"
                        aria-hidden="true"
                      >
                        <ul class="px-4 py-8">
                          <router-link to="/login">
                            <li
                              class="px-3 py-2 text-base font-medium text-matta-black hover:text-gray-500"
                            >
                              Sign in
                            </li></router-link
                          >
                          <router-link to="/select-role">
                            <li
                              class="px-3 py-2 text-base font-medium text-matta-black hover:text-gray-500"
                            >
                              Get started
                            </li></router-link
                          >
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <ModalsCenterModal
    :isOpen="isSigniningOut"
    @toggleModal="isSigniningOut = false"
    v-if="isSigniningOut"
  >
    <template #content>
      <div
        class="bg-white p-6 lg:p-10 sm:p-6 sm:pb-4 w-[400px] rounded-lg"
        v-if="isSigniningOut"
      >
        <div class="flex justify-between mb-5 items-center">
          <h4 class="font-medium text-matta-black text-xl">Sign Out</h4>
          <i
            class="uil uil-times cursor-pointer text-lg"
            @click="isSigniningOut = false"
          ></i>
        </div>

        <p class="text-sm text-matta-black mb-2">
          Are you sure you want to sign out?
        </p>

        <div class="flex justify-between gap-x-2 items-center mt-8">
          <button
            type="button"
            @click="isSigniningOut = false"
            class="appearance-none border w-1/2 leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 text-[13px] uppercase"
          >
            Cancel
          </button>

          <button
            type="button"
            @click="logOut"
            class="appearance-none border w-1/2 border-primary leading-none px-8 py-3 rounded-lg text-white bg-primary hover:opacity-70 text-[13px] uppercase"
          >
            Yes
          </button>
        </div>
      </div>
    </template>
  </ModalsCenterModal>
</template>
<script setup>
import { defineProps, defineEmits, computed, ref } from "vue";
import {
  Dialog,
  DialogPanel,
  // DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const isSigniningOut = ref(false);


defineProps(["open"]);
const emits = defineEmits(["toggleOpen"]);
</script>
