<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog
      as="div"
      class="fixed z-[999] inset-0 overflow-y-auto"
     
    >
      <div
        class="flex items-center md:items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="div"
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

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
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
            class="inline-block relative align-bottom bg-white rounded-lg text-left invisible-scrollbar shadow-xl transform transition-all sm:my-8 sm:align-middle w-full max-w-[500px] max-h-[95vh] overflow-y-auto"
          >
            <slot> </slot>
            <span
              v-if="canClose"
              class="cursor-pointer hover:border w-8 h-8 absolute top-[30px] right-[30px] rounded-full bg-[#F5F5F5] flex items-center justify-center z-[999]"
              @click="isOpen = false"
            >
              <AppIcon icon="heroicons-solid:x" class="text-lg text-[#8C8C8C]" aria-hidden="true" />
            </span>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
} from "@headlessui/vue";

const isOpen = inject("isOpen");

defineProps({
  canClose: {
    default: true,
  },
});
</script>
