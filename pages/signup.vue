<template>
  <div class="container mx-auto">
    <div class="w-96 mx-auto">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up
        </h2>
        <h3 v-if="errorMsg" class="mt-6 text-center text-red-600">
          {{ errorMsg }}
        </h3>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="signup">
        <div class="rounded-md shadow-sm">
          <input
            type="text"
            v-model="nickName"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Nick Name"
          />
          <input
            type="text"
            v-model="email"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Email"
          />
          <input
            type="password"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            v-model="password"
            placeholder="Password"
          />
          <input
            type="password"
            v-model="confirmPassword"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Confirm Password"
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
            Sign up
          </button>
        </div>
        <div class="text-sm text-center">
          <a href="/" class="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in is here!
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import {
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

@Component({ auth: false })
export default class Signup extends Vue {
  email = "";
  password = "";
  confirmPassword = "";
  nickName = "";
  errorMsg = "";

  async signup(): Promise<void> {
    // 入力チェック
    if (this.password != this.confirmPassword) {
      this.errorMsg = "パスワードと確認用パスワードが一致しません。";
      return;
    }
    // ユーザープールクライアントを初期化
    const userPool = new CognitoUserPool({
      ClientId: process.env.COGNITO_CLIENT_ID || "",
      UserPoolId: process.env.COGNITO_USER_POOL_ID || "",
    });

    // ニックネームを登録用パラメータに整形
    const attributeList: CognitoUserAttribute[] = [];
    const attributeUserNickName = new CognitoUserAttribute({
      Name: "nickname",
      Value: this.nickName,
    });
    attributeList.push(attributeUserNickName);

    // 入力したユーザー情報をもとに登録処理を実施
    const self = this;
    await userPool.signUp(
      this.email,
      this.password,
      attributeList,
      [],
      function (err) {
        // エラー時
        if (err) return;
        // アクティベーション画面に遷移
        self.$router.push("/activate");
      }
    );
  }
}
</script>
