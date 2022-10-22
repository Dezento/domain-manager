<script setup lang="ts">
import { ref, reactive } from "vue";
import { domainSchema } from "@/utils/schemas";
import type { Domain } from "@/types/domain";

const router = useRouter();


const { handleSubmit, setValues, isSubmitting } = useForm<Domain>({
  validationSchema: domainSchema,
});

let errorMessage = ref("");

const onSubmit = handleSubmit(async (values) => {
  errorMessage.value = "";
  const { data, message } = await addDomain(values);

  if (!data) {
    errorMessage.value = message;
    return;
  }

  router.push({
    name: "dashboard",
  });
});

const addDomain = async (data: Domain) => {
  return fetch("/api/addDomain", {
    body: JSON.stringify(data),
    method: "POST",
  }).then((response) => {
    return response.json();
  });
};
</script>

<template>
  <Navbar />
  <div class="max-w-2xl mx-auto bg-white p-16 font-mono">
    <form @submit="onSubmit">
      <div>
        <p class="my-4">Domain Provider Credentials:</p>
        <div>
          <AppInput type="text" name="domain" label="Domain" placeholder="Enter Domain" />
        </div>
      </div>
      <div class="grid md:gap-6 mb-6 lg:grid-cols-2">
        <div>
          <AppInput
            type="text"
            name="domainUsername"
            label="Username OR Email"
            placeholder="Enter Username or Email"
          />
        </div>
        <div>
          <AppInput
            type="password"
            name="domainPassword"
            label="Password"
            placeholder="Enter Password"
          />
        </div>
      </div>

      <div>
        <p class="my-4">Host Provider Credentials:</p>
        <div>
          <AppInput type="text" name="host" label="Host IP" placeholder="Enter Host IP" />
        </div>
      </div>
      <div class="grid mb-6 md:gap-6 lg:grid-cols-2">
        <div>
          <AppInput
            type="text"
            name="hostUsername"
            label="Username OR Email"
            placeholder="Enter Username or Email"
          />
        </div>
        <div>
          <AppInput
            type="password"
            name="hostPassword"
            label="Password"
            placeholder="Enter Password"
          />
        </div>
      </div>
      <button
        :disabled="isSubmitting"
        type="submit"
        class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:cursor-not-allowed disabled:bg-blue-400"
      >
        Save
      </button>
      <p class="text-xs italic mt-2 text-red-500">
        {{ errorMessage }}
      </p>
    </form>
  </div>
</template>
