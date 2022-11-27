<template>
  <q-page class="flex column flex-center justify-center">
    <q-card style="width: 80%; max-width: 400px;">
      <q-card-section>
        <h1 class="text-h5">Entre para continuar</h1>
      </q-card-section>

      <q-card-section>
        <q-form>
          <q-input outlined v-model="email" :error="emailError" no-error-icon type="email" label="E-mail" />
          <q-input outlined v-model="password" :error="passError" no-error-icon :type="isVisible ? 'text' : 'password'"
            label="Senha">
            <template v-slot:append>
              <q-btn dense rounded flat @click="isVisible = !isVisible"
                :icon="isVisible ? 'visibility_off' : 'visibility'" />
            </template>
          </q-input>
        </q-form>
      </q-card-section>

      <q-card-section class="column q-gutter-sm">
        <div v-show="errorMessage">
          <q-banner dense class="bg-red text-white">
            <template v-slot:avatar>
              <q-icon size="1.5em" name="warning" />
            </template>
            {{ errorMessage }}
          </q-banner>
        </div>

        <q-btn unelevated label="Login" color="amber" class="text-black" :loading="isLoading" @click="handleLogin()" />
      </q-card-section>
    </q-card>
    <div class="q-pa-lg">
      <span>Ainda não possui conta? </span>
      <a href="#/signin">Cadastre-se!</a>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { api } from '../boot/axios';

export default defineComponent({
  data() {
    return {
      email: '',
      password: '',
      isVisible: false,
      emailError: false,
      passError: false,
      isLoading: false,
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;
      this.isVisible = false;

      this.emailError = !this.email;
      this.passError = !this.password;

      if (!this.email || !this.password) {
        this.isLoading = false;
        return;
      }

      const body = { email: this.email.trim(), password: this.password.trim() };
      const { data } = await api.post('/usuario/login', body);

      if (data.status === 200) {
        localStorage.setItem('apo@session', data.body);
        window.location.href = '/#/unidade';
      } else {
        this.errorMessage = data.body;
      }

      this.isLoading = false;
    },
  },
});
</script>
