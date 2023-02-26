<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <div class="text-h6">Solicitar cadastro</div>
      <p>Cadastrar uma Empresa ou um Usuário.</p>
    </q-card-section>
    <q-separator />

    <q-card-section>
      <div class="text-bold">Selecione o tipo de cadastro</div>
      <CadastroSelect @usuarioSelecionado="addUsuario" />
      <div v-show="!isTelaInicial()">
        <q-form class="q-gutter-y-md" v-show="!isCadastroEmpresa()">
          <div v-show="!isMorador()">
            <div class="text-bold">Selecione seu cargo</div>
            <CargoSelect @cargoSelecionado="addCargo" />
          </div>

          <div class="text-bold">{{ `Informaçẽs sobre ${this.cadastro}` }}</div>
          <q-select v-model="usuario.edificacao" outlined v-show="!isMorador()" label="Edificação" behavior="menu"
            :options="edificacoes" />
          <q-select v-model="usuario.edificacao" outlined v-show="isMorador()" readonly label="Edificação" behavior="menu"
            :options="edificacoes" />

          <q-input v-model="usuario.nomeCompleto" outlined label="Nome Completo" />
          <q-input v-model="usuario.razaoSocial" outlined label="Nome da Empresa" v-show="!isMorador()" />
          <q-input v-model="usuario.telefone" outlined label="Telefone" type="tel" mask="(##) # ####-####" />
          <q-input v-model="usuario.email" outlined label="E-mail" type="email" />
          <q-input v-model="usuario.senha" outlined label="Senha" :type="showPassword ? 'text' : 'password'">
            <template v-slot:append>
              <q-btn dense rounded flat @click="showPassword = !showPassword"
                :icon="showPassword ? 'visibility_off' : 'visibility'" />
            </template>
          </q-input>
        </q-form>
        <q-form class="q-gutter-y-md" v-show="isCadastroEmpresa()">
          <div class="q-gutter-y-md">
            <div class="text-bold">Informaçẽs sobre Empresa</div>

            <q-input v-model="usuario.cnpj" outlined label="CNPJ" type="tel" mask="##.###.###/####-##" />
            <q-input v-model="usuario.razaoSocial" outlined label="Razão social" />
            <q-input v-model="usuario.telefoneEmpresarial" outlined label="Telefone empresarial" type="tel"
              mask="(##) # ####-####" />
            <q-input v-model="usuario.emailEmpresarial" outlined label="Email empresarial" type="email" />
          </div>

        </q-form>
      </div>
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
import CargoSelect from 'src/components/CargoSelect.vue';
import CadastroSelect from 'src/components/CadastroSelect.vue';
import { api } from '../boot/axios';
import optionsrole from '../assets/data/cargos.json';

const edificacoes = ['Escola', 'Residência', 'UBS'];

export default defineComponent({
  name: 'SignInPage',
  components: {
    CargoSelect,
    CadastroSelect,
  },
  data() {
    return {
      edificacoes,
      optionsrole,
      cadastro: '',
      empresa: {
        nome: '',
        cnpj: '',
        endereço: '',
        telefone: '',
      },
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
    isCadastroEmpresa() {
      return this.cadastro === 'Empresa';
    },
    isMorador() {
      if (this.cadastro === 'Morador') {
        this.usuario.edificacao = 'Residência';
        return this.cadastro === 'Morador';
      }
      return false;
    },
    isTelaInicial() {
      return this.cadastro === '';
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
    addCargo(cargoEscolhido) {
      this.usuario.cargo = cargoEscolhido;
      this.usuario.edificacao = '';
    },
    addUsuario(usuarioEscolhido) {
      this.cadastro = usuarioEscolhido;
    },
  },
});
</script>
