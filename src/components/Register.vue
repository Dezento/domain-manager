<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { UserDetails } from '@/types/user'
import { useRegistrationSchema } from '@/utils/schemas'
import type { User } from '@/types/user'


//defineProps<{ msg: string }>()
const router = useRouter();
const route = useRoute();
const state = useGlobalState();

let errorMessage = ref('')

const createUser = (data) => {
    return fetch('/api/register', {
      body: JSON.stringify(data),
      method: 'POST'
    }).then(response => {
      return response.json()
    })
  }

const { handleSubmit, setValues, isSubmitting } = useForm<UserDetails>({
  validationSchema: useRegistrationSchema
})

const onSubmit = handleSubmit(async (values) => {

  const { data, message } = await createUser(values)

  if(!data){
		errorMessage.value = message
		return;
	}

	
	state.saveUser(data)

	router.push({
		name: 'dashboard',
	})
})


 
</script>

<template>
<!-- component -->
<body class="font-mono ">
		<!-- Container -->
		<div class="container mx-auto">
			<div class="flex justify-center px-6 my-12">
				<!-- Row -->
				<div class="w-full xl:w-3/4 lg:w-11/12 flex justify-center">
					<!-- Col -->
					<div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
						<h3 class="pt-4 text-2xl text-center">Create an Account!</h3>
						<form class="px-8 pt-6 pb-8 mb-4 bg-white rounded"  @submit="onSubmit">
							<div class="mb-4 md:flex md:justify-between">
								<div class="mb-4 md:mr-2 md:mb-0">
									<AppInput type="text" name="first_name" label="First Name" placeholder="First Name" />
								</div>
								<div class="md:ml-2">
								
									<AppInput type="text" name="last_name" label="Last Name" placeholder="Last Name" />
								</div>
							</div>
							<div class="mb-4">
								<AppInput type="email" name="email" label="Email" placeholder="Email" />
							</div>
							<div class="mb-4 ">
								<div class="mb-4 md:mr-2 md:mb-0">
									<AppInput type="password" name="password" label="Password" placeholder="Password" />
									<!-- <p class="text-xs italic text-red-500">Please choose a password.</p> -->
								</div>
								
							</div>
							<div class="mb-6 text-center">
								<button
									:disabled="isSubmitting"
									class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:cursor-not-allowed  disabled:bg-blue-400"
									type="submit"
								>
									Register Account
								</button>
								<p class="text-xs italic mt-2 text-red-500">{{ errorMessage }}</p> 
							</div>
							<hr class="mb-6 border-t" />
							<div class="text-center">
								<a
									class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									href="/reset-password"
								>
									Forgot Password?
								</a>
							</div>
							<div class="text-center">
								<a
									class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									href="/"
								>
									Already have an account? Login!
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</body>
</template>


