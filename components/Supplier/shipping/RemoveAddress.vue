<template>
  <h3 class="font-medium text-2xl mb-6">Remove shipping address</h3>
  <p class="mb-12">Are you sure you want to remove this address?</p>

  <div class="flex items-center gap-x-4">
    <button
      type="button"
      class="text-[13px] uppercase text-matta-black px-2 py-2 hover:text-primary/80 w-full"
    >
      cancel
    </button>
    <button
      type="submit"
      class="border text-[13px] border-primary uppercase w-full text-white bg-primary-500 rounded-lg px-2 py-3 hover:bg-primary/80"
    >
      remove
    </button>
  </div>
</template>

<script setup>
// import { ref, reactive } from "vue";
// import useVuelidate from "@vuelidate/core";
// import { required, helpers, minLength, maxLength } from "@vuelidate/validators";
// import { useToast } from "vue-toastification";
// import { useRoute } from "vue-router";
// import { loginUser } from "~/services/authservices";

// const toast = useToast();
// const route = useRoute();
// const form = reactive({
//   card_number: "",
//   expiry_date: "",
//   cvv: "",
// });
// const isLoading = ref(false);

// const rules = {
//   card_number: {
//     required: helpers.withMessage(
//       "card_number field cannot be empty",
//       required
//     ),
//     maxLength: maxLength(50),
//   },

//   cvv: {
//     required: helpers.withMessage("Cvv field cannot be empty", required),
//     minLength: minLength(3),

//     maxLength: maxLength(3),
//   },
//   expiry_date: {
//     required,
//   },
// };

// const v$ = useVuelidate(rules, form);

// async function handleSubmit() {
//   const validity = await v$.value.$validate();
//   if (!validity) return;
//   isLoading.value = true;
//   loginUser(form)
//     .then((res) => {
//       if (res.status === 200) {
//         localStorage.setItem("loggedUser", JSON.stringify(res.data.data));
//         toast.info("Login successful", {
//           position: "bottom",
//         });
//         if (route.query.redirected_from) {
//           window.location.href = route.query.redirected_from;
//           return;
//         }
//         if (route.query.redirect_to) {
//           window.location.href = route.query.redirect_to;
//           return;
//         }

//         window.location.href = "/";
//       }
//     })

//     .catch((err) => {
//       isLoading.value = false;

//       toast.error(err.response.data.Message, {
//         position: "bottom",
//       });
//     });
// }
</script>
