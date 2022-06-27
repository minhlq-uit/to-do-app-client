<template>
  <form id="form-login">
    <h1 class="text-3xl mb-4 uppercase">login</h1>
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
      @click.prevent="submitLoginForm"
    >
      Login
    </button>
    <hr />
    <p class="text-right mt-4">
      Need an account?
      <router-link to="/auth/register"><b>Sign up</b></router-link>
    </p>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter()
    const email = ref(store.state.user.userDetails.email);
    const password = ref(null);

    const submitLoginForm = async () => {
      try {
        await store.dispatch("login", {
          email: email.value,
          password: password.value,
        });
        router.push('/tasks')
      } catch (err) {
        console.log(err.message);
      }
    };
    return { email, password, submitLoginForm };
  },
};
</script>

<style scoped>
#form-login {
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
  background: #000;
}
button:hover {
  transform: scale(1.05);
}
</style>
