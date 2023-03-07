<template>
  <q-form ref="formComponent" @reset="onReset">
    <div class="text-bold">Informaçẽs sobre Empresa</div>

    <q-input v-model="form.razaoSocial" type="text" placeholder="Nome da Empresa" outlined :rules="[requiredRules]" />

    <q-input v-model="form.cnpj" outlined label="CNPJ" type="tel" mask="##.###.###/####-##" :rules="[requiredRules]" />

    <q-input :loading="isCepLoading" color="primary" v-model="form.cep" outlined type="tel" label="CEP" mask="##.###-###"
      @keyup="handleCep(form.cep)" :rules="[requiredRules]" />

    <q-input v-model="form.logradouro" outlined label="Logradouro" class="q-pb-md" />
    <q-input v-model="form.numero" outlined label="Número" class="q-pb-md" />
    <q-input v-model="form.bairro" outlined label="Bairro" class="q-pb-md" />
    <q-input v-model="form.cidade" outlined label="Cidade" class="q-pb-md" />
    <q-input v-model="form.estado" outlined label="Estado" class="q-pb-md" />

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
</template>

<script>
import { defineComponent, ref } from 'vue';
import { api } from '../boot/axios';
import estados from '../data/estados.json';

const formComponent = ref();

const form = ref({
  razaoSocial: '',
  cnpj: '',
  cep: '',
  logradouro: '',
  bairro: '',
  cidade: '',
  estado: '',
});

const requiredRules = (val) => (val && val.length > 0) || 'Obrigatório';

export default defineComponent({
  name: 'EmpresaCadastro',
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
    };
  },
  data() {
    return {
      isCepLoading: false,
    };
  },
  methods: {
    async handleCep(endereco) {
      const cep = endereco;

      if (cep.length === 10) {
        this.isCepLoading = true;

        const sanitizedCep = cep.replace('-', '').replace('.', '');
        const url = `https://viacep.com.br/ws/${sanitizedCep}/json`;

        const response = await fetch(url);
        const data = await response.json();

        this.form.logradouro = data.logradouro;
        this.form.bairro = data.bairro;
        this.form.cidade = data.localidade;
        this.form.estado = estados[data.uf];

        this.isCepLoading = false;
      }
    },
    async onSubmit() {
      formComponent.value.validate()
        .then(async (sucess) => {
          if (sucess) {
            this.loading = true;
            this.showPassword = false;
            await api.post('/empresas', this.form)
              .then(() => {
                this.message = `Cadastro da ${this.tipoCadastro} solicitado com sucesso`;
                this.loading = false;
                this.$emit('respostaCadastro', this.message);
                this.small = true;
              });
          }
        });
    },
    onReset() {
      this.form.razaoSocial = null;
      this.form.cnpj = null;
      this.form.cep = null;
      this.form.logradouro = null;
      this.form.numero = null;
      this.form.bairro = null;
      this.form.cidade = null;
      this.form.estado = null;
    },
  },
});

</script>
