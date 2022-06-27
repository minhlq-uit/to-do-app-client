<template>
  <form id="form-register">
    <h1 class="text-3xl mb-4 uppercase">register</h1>
    <div class="mb-6">
      <label
        for="name"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Name</label
      >
      <input
        type="text"
        id="name"
        class="text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
        v-model="name"
      />
    </div>
    <div class="mb-6">
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Email address</label
      >
      <input
        type="email"
        id="email"
        class="text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
        v-model="email"
      />
    </div>
    <div class="mb-6">
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Password</label
      >
      <input
        type="password"
        id="password"
        class="text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
        v-model="password"
      />
    </div>
    <button
      type="submit"
      class="btn text-white font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click.prevent="submitRegisterForm"
    >
      Register
    </button>
    <hr />
    <p class="text-right mt-4">
      Already a user? <router-link to="/auth/login"><b>Login</b></router-link>
    </p>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const name = ref(null);
    const email = ref(null);
    const password = ref(null);

    const submitRegisterForm = async () => {
      try {
        await store.dispatch('register', {
          email: email.value,
          password: password.value,
          name: name.value
        })
        router.push('/auth/login')
      } catch (err) {
        console.log('err', err.message)
      }
    };

    return { name, email, password, submitRegisterForm}
  },
};
</script>

<style>
#form-register {
  min-width: 500px;
  min-height: 550px;
  border-radius: 0.75rem;
  background: #ffeb94;
  padding: 2.5rem;
}
input {
  background: transparent;
  border: 1px solid #000;
  outline: none;
}
button {
  background: #000 !important;
}
button:hover {
  transform: scale(1.05);
}
</style>
