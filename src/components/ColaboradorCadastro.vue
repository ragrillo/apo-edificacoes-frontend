<template>
  <q-form ref="formComponent" @reset="onReset">
    <div class="q-pb-md">
      <div class="text-bold">Selecione seu cargo</div>
      <CargoSelect @cargoSelecionado="addCargo" />
    </div>
    <q-select v-model="form.edificacao" outlined label="Edificação" behavior="menu" :options="edificacoes" class="q-pb-md"
      :rules="[requiredRules]" />

    <q-input v-model="form.nomeCompleto" outlined label="Nome Completo" ref="nomeRef" :rules="[requiredRules]" />
    <q-input :loading="isEmpresaLoading" v-model="form.cnpj" outlined label="CNPJ da Empresa" type="tel"
      mask="##.###.###/####-##" @keyup=buscaCNPJ(form.cnpj) ref="empresaRef" :rules="[requiredRules]" />
    <q-input v-model="form.razaoSocial" outlined label="Nome da Empresa" disable class="q-pb-md"
      :rules="[requiredRules]" />
    <q-input v-model="form.telefone" outlined label="Telefone" type="tel" mask="(##) # ####-####" class="q-pb-md" />
    <q-input v-model="form.email" outlined label="E-mail" type="email" ref="emailRef" :rules="[requiredRules]" />
    <q-input v-model="form.senha" outlined label="Senha" :type="showPassword ? 'text' : 'password'" ref="senhaRef"
      :rules="[requiredRules]" />

    <q-btn label="Cadastrar" color="primary" @click="onSubmit" />
    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
  </q-form>

  <q-dialog v-model="small">
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-h6">{{ this.message }}</div>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" v-close-popup to="/" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="erro">
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-h6">Empresa não encontrada!!</div>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Voltar" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { api } from '../boot/axios';
import CargoSelect from './CargoSelect.vue';

const edificacoes = ['Escola', 'Residência', 'UBS'];

const formComponent = ref();

const form = ref({
  cargo: '',
  edificacao: '',
  cnpj: '',
  nomeCompleto: '',
  telefone: '',
  email: '',
  senha: '',
});

const requiredRules = (val) => (val && val.length > 0) || 'Obrigatório';

const edificacoesValues = {
  Escola: 'escolas',
  Residência: 'residencias',
  UBS: 'ubs',
};

const cargoValues = {
  'Coordenador da Unidade': 1,
  'Engenheiro Civil ou Arquiteto': 2,
  'Sócio proprietário, Empreendedor, Chefe da Secretaria ou Prefeitura': 3,
  'Diretor do departamento ou Administrador da empresa': 4,
  'Administrador do site ou Equipe de TI': 5,
};

export default defineComponent({
  name: 'ColaboradorCadastro',
  components: {
    CargoSelect,
  },
  emits: ['respostaCadastro'],
  props: {
    tipoCadastro: String,
  },
  setup() {
    return {
      form,
      formComponent,
      requiredRules,
      small: ref(false),
      erro: ref(false),
    };
  },
  data() {
    return {
      edificacoes,
      isEmpresaLoading: false,
      showPassword: false,
    };
  },
  methods: {
    async onSubmit() {
      formComponent.value.validate()
        .then(async (sucess) => {
          if (sucess) {
            this.loading = true;
            this.showPassword = false;

            const payload = {
              ...this.form,
              cargo: cargoValues[this.form.cargo],
              edificacao: edificacoesValues[this.form.edificacao],
            };

            await api.post('/usuarios', payload)
              .then(() => {
                this.message = `Cadastro da ${this.tipoCadastro} solicitado com sucesso`;
                this.loading = false;
                this.small = true;
                this.onReset();
              });
          }
        });
    },
    addCargo(cargoEscolhido) {
      this.form.cargo = cargoEscolhido;
    },
    onReset() {
      this.form.razaoSocial = null;
      this.form.cnpj = null;
      this.form.cargo = null;
      this.form.nomeCompleto = null;
      this.form.senha = null;
      this.form.email = null;
    },
    async buscaCNPJ(buscarCnpj) {
      const sanitizedCnpj = buscarCnpj.replace('/', '').replaceAll('.', '').replace('-', '');

      if (sanitizedCnpj.length === 14) {
        api.get(`/empresas/cnpj/${sanitizedCnpj}`)
          .then((res) => {
            this.form.razaoSocial = res.data.razaoSocial;
          }).catch(() => {
            this.form.cnpj = '';
            this.erro = true;
          });
      }
    },
  },
});

</script>
