<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <div class="text-h6">Solicitar cadastro</div>
      Preencha as informações abaixo.
    </q-card-section>
    <q-separator />

    <q-card-section>
      <q-form class="q-gutter-y-md">
        <div class="text-bold">Selecione seu cargo</div>

        <q-select v-model="usuario.cargo" outlined :options="optionsrole" label="Cargo" behavior="menu" emit-value>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" class="fit justify-between">
              <q-item-section>
                <q-item-label>{{ scope.opt.value }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn dense flat rounded style="max-width:50px" icon="info" push>
                  <q-popup-proxy style="width: 50%" context-menu>
                    <q-banner>
                      <span>
                        {{ scope.opt.label }}
                      </span>
                    </q-banner>
                  </q-popup-proxy>
                </q-btn>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <div class="text-bold">Informaçẽs sobre Usuário</div>

        <q-select v-model="usuario.edificacao" outlined v-show="!isAdmin()" label="Edificação" behavior="menu"
          :options="edificacoes" />

        <q-input v-model="usuario.nomeCompleto" outlined label="Nome Completo" />
        <q-input v-model="usuario.telefone" outlined label="Telefone" type="tel" mask="(##) # ####-####" />
        <q-input v-model="usuario.email" outlined label="E-mail" type="email" />

        <q-input v-model="usuario.senha" outlined label="Senha" :type="showPassword ? 'text' : 'password'">
          <template v-slot:append>
            <q-btn dense rounded flat @click="showPassword = !showPassword"
              :icon="showPassword ? 'visibility_off' : 'visibility'" />
          </template>
        </q-input>

        <div v-show="isEmpresa()" class="q-gutter-y-md">
          <div class="text-bold">Informaçẽs sobre Empresa</div>

          <q-input v-model="usuario.cnpj" outlined label="CNPJ" type="tel" mask="##.###.###/####-##" />
          <q-input v-model="usuario.razaoSocial" outlined label="Razão social" />
          <q-input v-model="usuario.telefoneEmpresarial" outlined label="Telefone empresarial" type="tel"
            mask="(##) # ####-####" />
          <q-input v-model="usuario.emailEmpresarial" outlined label="Email empresarial" type="email" />
        </div>
      </q-form>
    </q-card-section>

    <q-card-section class="column">
      <q-banner dense v-show="message" :class="`bg-${success ? 'green' : 'red'} text-white q-mb-md`">
        <template v-slot:avatar>
          <q-icon size="1.5em" :name="success ? 'check' : 'warning'" />
        </template>
        {{ message }}
      </q-banner>

      <q-btn outline @click="handleSignIn()" :loading="loading" :color="success ? 'grey' : 'primary'" :disable="success"
        label="Solicitar cadastro" />
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import { api } from '../boot/axios';
import optionsrole from '../assets/data/cargos.json';

const edificacoes = ['Escola', 'Residencia', 'UBS'];

export default defineComponent({
  name: 'SignInPage',
  data() {
    return {
      edificacoes,
      optionsrole,
      usuario: {
        cargo: '',
        edificacao: '',
        nomeCompleto: '',
        telefone: '',
        email: '',
        senha: '',
        cnpj: '',
        razaoSocial: '',
        telefoneEmpresarial: '',
        emailEmpresarial: '',
      },
      success: false,
      loading: false,
      showPassword: false,
      message: '',
    };
  },
  methods: {
    isEmpresa() {
      return this.usuario.cargo === 'Sócio proprietário, Empreendedor, Chefe da Secretaria ou Prefeitura';
    },
    isAdmin() {
      return this.usuario.cargo === 'Administrador do site ou Equipe de TI';
    },
    getNumericalValueOfCargo() {
      return optionsrole.map((opt) => opt.value).indexOf(this.usuario.cargo) + 1;
    },
    async handleSignIn() {
      this.loading = true;
      this.showPassword = false;

      this.usuario.cargo = this.getNumericalValueOfCargo();
      const { data } = await api.post('/usuarios', this.usuario);

      this.success = data.statusCode === 201;
      this.message = data.body;

      this.loading = false;
    },
  },
});
</script>
