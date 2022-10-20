<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { UserLogin } from '@/types/user'
import { userLoginSchema } from '@/utils/schemas'


const router = useRouter();
const route = useRoute();
const state = useGlobalState();

let errorMessage = ref('')

const { handleSubmit, setValues, isSubmitting } = useForm<UserLogin>({
  validationSchema: userLoginSchema,
})

const onSubmit = handleSubmit(async (values) => {
	errorMessage.value = ''	
	const { data, message } = await loginUser(values)
	
	if(!data){
		errorMessage.value = message
		return;
	}

	
	state.saveUser(data)

	router.push({
		name: 'dashboard',
	})
})

const loginUser = (data) => {
	return fetch('/api/login', {
		body: JSON.stringify(data),
		method: 'POST'
	}).then(response => {
		return response.json()
	})
}


</script>

<template>
<!-- component -->
<body class="font-mono ">
		<!-- Container -->
		<div class="container mx-auto">
			<div class="flex justify-center px-6 my-12">
				<!-- Row -->
				<div class="w-full xl:w-3/4 lg:w-11/12 flex">
					<!-- Col -->
					<div
						class="w-full h-96 mt-10 bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
						style="background-image: url('https://images.unsplash.com/photo-1497005367839-6e852de72767?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=800')"
					></div>
					<!-- Col -->
					<div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
						<h3 class="pt-4 text-2xl text-center">Welcome Back!</h3>
						<form class="px-8 pt-6 pb-8 mb-4 bg-white rounded"  @submit="onSubmit">
							<div class="mb-4">
								<AppInput type="email" name="email" label="Email" placeholder="Email" />
								
							</div>
							<div class="mb-4">
								<AppInput type="password" name="password" label="Password" placeholder="Password" />
							</div>
							<div class="mb-4">
								<input class="mr-2 leading-tight" type="checkbox" id="checkbox_id" />
								<label class="text-sm" for="checkbox_id">
									Remember Me
								</label>
							</div>
							<div class="mb-6 text-center">
								<button
									:disabled="isSubmitting"
									class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:cursor-not-allowed  disabled:bg-blue-400"
									type="submit"
								>
									Sign In
								</button>
								<p class="text-xs italic mt-2 text-red-500">{{ errorMessage }}</p> 

							</div>
							<hr class="mb-6 border-t" />
							<div class="text-center">
								<a
									class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									href="/register"
								>
									Create an Account!
								</a>
							</div>
							<div class="text-center">
								<a
									class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									href="/reset-password"
								>
									Forgot Password?
								</a>
							</div>
						
						</form>
					</div>
				</div>
			</div>
		</div>
	</body>
</template>


