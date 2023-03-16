<template>
  <q-card class="q-ma-lg">
    <q-card-section>
      <div class="text-h6">Cadastro de Unidade</div>
      Preencha as informações abaixo.
    </q-card-section>
    <q-separator />

    <q-card-section>
      <q-form class="q-gutter-y-sm">
        <div class="text-bold">Informações Básicas</div>

        <q-input v-model="form.nome" filled label="Nome" />
        <q-input v-model="form.responsavel" filled label="Responsável" />
        <q-input v-model="form.telefone" filled type="tel" label="DDD + Telefone" mask="(##) #####-####" />

        <div class="text-bold">Horário de Funcionamento</div>
        <div class="row q-gutter-x-sm">
          <q-input v-model="form.horarioFuncionamento[0]" filled class="col" type="time" label="Inicial" />
          <q-input v-model="form.horarioFuncionamento[1]" filled class="col" type="time" label="Final" />
        </div>

        <div class="text-bold">Endereço</div>
        <q-input :loading="isCepLoading" color="primary" v-model="form.endereco.cep" filled type="tel" label="CEP"
          mask="##.###-###" @keyup="handleCep(form.endereco)" />
        <q-input v-model="form.endereco.logradouro" filled label="Logradouro" />
        <q-input v-model="form.endereco.numero" filled type="number" label="Número" />
        <q-input v-model="form.endereco.bairro" filled label="Bairro" />
        <q-input v-model="form.endereco.cidade" filled label="Cidade" />
        <q-input v-model="form.endereco.estado" filled label="Estado" />

        <div class="text-bold">Informações sobre {{ token.edificacao }}</div>

        <div v-show="token.edificacao === 'escolas'" class="q-gutter-y-sm">
          <q-select v-model="form.escola.tipoEscola" filled label="Tipo de escola" :options="opcoes.tipoEscola" />
          <q-select v-model="form.escola.modalidadeEscola" filled label="Modalidade de ensino"
            :options="opcoes.modalidadeEscola" />
          <q-input v-model="form.escola.quantidadeAlunos" filled type="number" label="Quantidade de alunos" />
        </div>

        <div v-show="token.edificacao === 'ubs'" class="q-gutter-sm">
          <q-select v-model="form.ubs.tipoUnidade" filled label="Tipologia da unidade" :options="opcoes.tipoPorte" />
          <q-input v-model="form.ubs.dataEntregaObra" filled label="Data de entrega da obra" />
          <q-input v-model="form.ubs.descricao" type="textarea" filled label="Descrição da unidade" />

          <div class="text-bold q-my-md">Informações sobre a construtora</div>

          <q-input v-model="form.ubs.construtora.nome" filled label="Nome" />
          <q-input v-model="form.ubs.construtora.telefone" filled label="Telefone" mask="(##) #####-####" />

          <q-input :loading="isCepLoading" color="primary" v-model="form.ubs.construtora.endereco.cep" filled type="tel"
            label="CEP" mask="##.###-###" @keyup="handleCep(form.ubs.construtora.endereco)" />
          <q-input v-model="form.ubs.construtora.endereco.logradouro" filled label="Logradouro" />
          <q-input v-model="form.ubs.construtora.endereco.numero" filled label="Número" />
          <q-input v-model="form.ubs.construtora.endereco.bairro" filled label="Bairro" />
          <q-input v-model="form.ubs.construtora.endereco.cidade" filled label="Cidade" />
          <q-input v-model="form.ubs.construtora.endereco.estado" filled label="Estado" />

        </div>

        <div v-show="token.edificacao === 'residencias'" class="q-gutter-sm">
          <q-select filled v-model="form.habitacao.tipoUnidade" label="Tipologia da unidade"
            :options="opcoes.tipoHabitacao" />
          <q-input filled v-model="form.habitacao.numeroPavimentos" v-show="form.habitacao.tipoUnidade === 'Apartamento'"
            label="Número de pavimentos" />

          <div class="q-py-md" v-show="form.habitacao.tipoUnidade === 'Casa'">
            <div class="text-subtitle2">Selecione as opções abaixo:</div>
            <div>
              <q-radio v-model="form.habitacao.tipoCasa[0]" label="Térrea" val="Térrea" />
              <q-radio v-model="form.habitacao.tipoCasa[0]" label="Sobrado" val="Sobrado" />
            </div>
            <div>
              <q-radio v-model="form.habitacao.tipoCasa[1]" label="Isolado" val="Isolado" />
              <q-radio v-model="form.habitacao.tipoCasa[1]" label="Germinado" val="Germinado" />
            </div>
          </div>

          <q-input v-model="form.habitacao.blocosExistentes" filled type="number" label="Blocos existentes" />
          <q-input v-model="form.habitacao.unidadesPorBloco" filled type="number" label="Unidades por bloco" />
          <q-input v-model="form.habitacao.totalUnidades" filled type="number" label="Total de unidades" />
          <q-input v-model="form.habitacao.nomeConstrutora" filled label="Nome da construtora" />
          <q-input v-model="form.habitacao.anoEntregaObra" filled label="Ano de entrega da obra" mask="####" />
          <q-input v-model="form.habitacao.descricao" type="textarea" filled label="Descrição" />
        </div>
      </q-form>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat color="primary" label="Voltar" to="/perfil" />
      <q-btn flat color="primary" label="Salvar" @click="handleCadastroUnidade" to="/perfil" />
    </q-card-actions>
  </q-card>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode';
import { defineComponent } from 'vue';
import { api } from '../boot/axios';
import estados from '../data/estados.json';

export default defineComponent({
  data() {
    return {
      opcoes: {
        tipoEscola: ['Municipal', 'Estadual', 'Federal', 'Particular'],
        tipoHabitacao: ['Casa', 'Apartamento'],
        modalidadeEscola: ['Infantil', 'Fundamental', 'Médio', 'Jovens e Adultos', 'Fundamental e Médio'],
        horarioFuncionamento: ['Manhã', 'Tarde', 'Noite'],
        tipoPorte: ['Porte I', 'Porte II', 'Porte III', 'Porte IV', 'Porte V'],
      },
      form: {
        proprietario: '',
        nome: '',
        responsavel: '',
        telefone: '',
        horarioFuncionamento: [],
        tipoUnidade: '',
        endereco: {
          cep: '',
          logradouro: '',
          numero: '',
          bairro: '',
          cidade: '',
          estado: '',
        },
        escola: {
          tipoEscola: '',
          modalidadeEscola: '',
          quantidadeAlunos: '',
        },
        habitacao: {
          tipoUnidade: '',
          tipoCasa: ['', ''],
          numeroPavimentos: '',
          blocosExistentes: '',
          unidadesPorBloco: '',
          totalUnidades: '',
          nomeConstrutora: '',
          anoEntregaObra: '',
          descricao: '',
        },
        ubs: {
          tipoUnidade: '',
          dataEntregaObra: '',
          descricao: '',
          construtora: {
            nome: '',
            telefone: '',
            endereco: {
              cep: '',
              logradouro: '',
              numero: '',
              bairro: '',
              cidade: '',
              estado: '',
            },
          },
        },
      },
      token: {},
      isCepLoading: false,
    };
  },
  mounted() {
    const token = localStorage.getItem('apo@usuario_session');
    this.token = VueJwtDecode.decode(token);
  },
  methods: {
    async handleCep(endereco) {
      const { cep } = endereco;

      if (cep.length === 10) {
        this.isCepLoading = true;

        const sanitizedCep = cep.replace('-', '').replace('.', '');
        const url = `https://viacep.com.br/ws/${sanitizedCep}/json`;

        const response = await fetch(url);
        const data = await response.json();

        endereco.logradouro = data.logradouro;
        endereco.bairro = data.bairro;
        endereco.cidade = data.localidade;
        endereco.estado = estados[data.uf];

        this.isCepLoading = false;
      }
    },
    async handleCadastroUnidade() {
      const edificacao = this.token.edificacao.toLowerCase();
      // console.log(edificacao);
      this.form.proprietario = this.token.id;
      const payload = { ...this.form, ...this.form[edificacao] };

      delete payload.escola;
      delete payload.habitacao;
      delete payload.ubs;
      await api.post(`/unidades/${edificacao}`, payload);

      // this.$router.push('ambiente');
    },
  },
});
</script>
