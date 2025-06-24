<script setup lang="ts">
import LoginImage from "@/assets/images/login-image.png";
import Logo from "@/assets/images/logo.svg";
import BaseButton from "@/components/base-button/BaseButton.vue";
import InputPassword from "@/components/base-input/InputPassword.vue";
import InputText from "@/components/base-input/InputText.vue";
import CenterPage from "@/components/CenterPage.vue";
</script>

<template>
  <CenterPage>
    <div :class="$style.wrap">
      <div :class="$style.imageWrap">
        <img :src="Logo" :class="$style.logo" alt="Logo" />
        <img :src="LoginImage" :class="$style.image" alt="Login Image" />
      </div>
      <div :class="$style.formWrap">
        <img :src="Logo" :class="$style.mobileLogo" alt="Logo" />
        <h1 :class="$style.title">Welcome!</h1>
        <p :class="$style.subtitle">Enter details to login.</p>
        <form
          :class="$style.form"
          @submit.prevent="$router.push({ path: '/users' })"
        >
          <InputText placeholder="Email" type="email" required />
          <InputPassword placeholder="Password" required />
          <p :class="$style.footerText">
            <a href="#">Forgot Password?</a>
          </p>
          <BaseButton value="Log in" type="submit"> Login </BaseButton>
        </form>
      </div>
    </div>
  </CenterPage>
</template>

<style module lang="scss">
@use "@/scss/colors";
@use "@/scss/styles";

.wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  height: 100vh;
}

.imageWrap {
  height: 100%;
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 64px;

  .logo {
    height: 36px;
    position: absolute;
    top: 64px;
    left: 64px;
  }

  .image {
    max-width: 600px;
    width: 100%;
    filter: contrast(0.97);
  }
}
.mobileLogo {
  display: none;
}

.formWrap {
  width: 50%;
  background: colors.use(bg-primary);
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: calc(styles.$padding-xl + styles.$padding-lg);
  color: colors.use(text);

  .title {
    color: colors.use(text-dark);
    margin-bottom: styles.$margin-sm-1;
    font-weight: 700;
  }
  .subtitle {
    margin-bottom: styles.$margin-xl;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: styles.$padding-md-1;
}

@media screen and (max-width: 1024px) {
  .formWrap {
    padding: styles.$padding-lg-1;
  }
}

@media screen and (max-width: 768px) {
  .imageWrap {
    display: none;
  }
  .formWrap {
    width: 100%;
    padding: styles.$padding-md-1;

    .mobileLogo {
      display: block;
      height: 36px;
      margin-bottom: styles.$margin-lg-1;
    }
  }
}
</style>
