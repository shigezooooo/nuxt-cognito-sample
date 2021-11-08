<template>
  <div class="container mx-auto">
    <div class="w-96 mx-auto">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in
        </h2>
        <h3 v-if="errorMsg" class="mt-6 text-center text-red-600">
          {{ errorMsg }}
        </h3>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="signin">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm">
          <input
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            v-model="email"
            placeholder="Email"
          />
          <input
            type="password"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            v-model="password"
            placeholder="Password"
          />
        </div>
        <div>
          <button
            type="submit"
            class="
              group
              relative
              w-full
              flex
              justify-center
              py-2
              px-4
              border border-transparent
              text-sm
              font-medium
              rounded-md
              text-white
              bg-indigo-600
              hover:bg-indigo-700
              focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            "
          >
            Sign in
          </button>
        </div>
        <div class="text-sm text-center">
          <a href="/signup" class="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up is here!
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Index extends Vue {
  email = "";
  password = "";
  errorMsg = "";

  async signin(): Promise<void> {
    try {
      // サインイン
      await this.$auth.loginWith("cognito", {
          data: {
            username: this.email,
            password: this.password,
          }
        });
    } catch (error) {
      console.error(error);
    }
  }
}
</script>