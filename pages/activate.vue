<template>
  <div class="container mx-auto">
    <div class="w-96 mx-auto">
      <div>
        <h2 class="mt-6 text-center text-2xl font-extrabold text-gray-900">
          Activation
        </h2>
        <h3 v-if="errorMsg" class="mt-6 text-center text-red-600">
          {{ errorMsg }}
        </h3>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="activate">
        <div class="rounded-md shadow-sm">
          <input
            type="text"
            v-model="email"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Email"
          />
          <input
            type="text"
            v-model="confirminationCode"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Confirmination Code"
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
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
            "
          >
            Activate
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";

@Component({ auth: false })
export default class Activate extends Vue {
  email = "";
  confirminationCode = "";
  errorMsg = "";

  async activate(): Promise<void> {
    const userPool = new CognitoUserPool({
      ClientId: process.env.COGNITO_CLIENT_ID || "",
      UserPoolId: process.env.COGNITO_USER_POOL_ID || "",
    });

    const cognitoUser = new CognitoUser({
      Username: this.email,
      Pool: userPool,
    });

    const self = this;
    await cognitoUser.confirmRegistration(
      this.confirminationCode,
      true,
      function (err) {
        // エラー時
        if (err) return;
        // アクティベーション成功時、サインイン画面に遷移
        window.alert(
          "ユーザーのアクティベーションが完了しました。"
        );
        self.$router.push("/");
      }
    );
  }
}
</script>
