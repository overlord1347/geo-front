<template>
  <div class="wrapper">
    <form class="form-signin">
      <h2 class="form-signin-heading">Please login</h2>
      <input
        type="text"
        class="form-control emailAddress"
        name="username"
        v-model="nickName"
        placeholder="Nick name please"
        required
        autofocus
      />
      <button
        type="button"
        class="btn btn-lg btn-primary btn-block btn-login"
        @click="login()"
      >Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Login extends Vue {
  private nickName: string;
  constructor() {
    super();
    this.nickName = '';
  }
  private login() {
    this.$store.dispatch('login', this.nickName);
  }
}
</script>

<style>
.wrapper {
  margin-top: 80px;
  margin-bottom: 80px;
}
.btn-login {
  margin-top: 10px;
}
.form-signin {
  max-width: 380px;
  padding: 15px 35px 45px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.form-control {
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
  @include box-sizing(border-box);
}

.emailAddress {
  margin-bottom: 20px;
}
</style>
