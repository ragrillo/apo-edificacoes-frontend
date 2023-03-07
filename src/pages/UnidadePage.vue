<template>
  <q-page class="flex flex-center">
    <q-card class="q-ma-lg" style="width: 100%">
      <q-card-section>
        <div class="text-h6">Cadastro de Unidade</div>
        Preencha as informações abaixo.
      </q-card-section>
      <q-separator />

      <q-card-section>
        <q-form class="q-gutter-y-md">
          <div class="text-bold">Informações Básicas</div>

          <q-input v-model="form.nome" outlined label="Nome" />
          <q-input v-model="form.responsavel" outlined label="Responsável" />
          <q-input v-model="form.telefone" outlined type="tel" label="Telefone" mask="(##) # ####-####" />

          <div class="text-bold">Horário de Funcionamento</div>
          <div class="row q-gutter-x-md">
            <q-input v-model="form.horarioFuncionamento[0]" outlined class="col" type="time" label="Inicial" />
            <q-input v-model="form.horarioFuncionamento[1]" outlined class="col" type="time" label="Final" />
          </div>

          <div class="text-bold">Endereço</div>
          <q-input :loading="isCepLoading" color="primary" v-model="form.endereco.cep" outlined type="tel" label="CEP"
            mask="##.###-###" @keyup="handleCep(form.endereco)" />
          <q-input v-model="form.endereco.logradouro" outlined label="Logradouro" />
          <q-input v-model="form.endereco.numero" outlined type="number" label="Número" />
          <q-input v-model="form.endereco.bairro" outlined label="Bairro" />
          <q-input v-model="form.endereco.cidade" outlined label="Cidade" />
          <q-input v-model="form.endereco.estado" outlined label="Estado" />

          <div class="text-bold">Informações sobre {{ token.edificacao }}</div>

          <div v-show="token.edificacao === 'escolas'" class="q-gutter-y-md">
            <q-select v-model="form.escola.tipoEscola" outlined label="Tipo de escola" :options="opcoes.tipoEscola" />
            <q-select v-model="form.escola.modalidadeEscola" outlined label="Modalidade de ensino"
              :options="opcoes.modalidadeEscola" />
            <q-input v-model="form.escola.quantidadeAlunos" outlined type="number" label="Quantidade de alunos" />
          </div>

          <div v-show="token.edificacao === 'ubs'" class="q-gutter-md">
            <q-select v-model="form.ubs.tipoUnidade" outlined label="Tipologia da unidade" :options="opcoes.tipoPorte" />
            <q-input v-model="form.ubs.dataEntregaObra" outlined label="Data de entrega da obra" />
            <q-input v-model="form.ubs.descricao" type="textarea" outlined label="Descrição da unidade" />

            <div class="text-bold q-my-md">Informações sobre a construtora</div>

            <q-input v-model="form.ubs.construtora.nome" outlined label="Nome" />
            <q-input v-model="form.ubs.construtora.telefone" outlined label="Telefone" mask="(##) #####-####" />

            <q-input :loading="isCepLoading" color="primary" v-model="form.ubs.construtora.endereco.cep" outlined
              type="tel" label="CEP" mask="##.###-###" @keyup="handleCep(form.ubs.construtora.endereco)" />
            <q-input v-model="form.ubs.construtora.endereco.logradouro" outlined label="Logradouro" />
            <q-input v-model="form.ubs.construtora.endereco.numero" outlined label="Número" />
            <q-input v-model="form.ubs.construtora.endereco.bairro" outlined label="Bairro" />
            <q-input v-model="form.ubs.construtora.endereco.cidade" outlined label="Cidade" />
            <q-input v-model="form.ubs.construtora.endereco.estado" outlined label="Estado" />

          </div>

          <div v-show="token.edificacao === 'residencias'" class="q-gutter-md">
            <q-select outlined v-model="form.habitacao.tipoUnidade" label="Tipologia da unidade"
              :options="opcoes.tipoHabitacao" />
            <q-input outlined v-model="form.habitacao.numeroPavimentos"
              v-show="form.habitacao.tipoUnidade === 'Apartamento'" label="Número de pavimentos" />

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

            <q-input v-model="form.habitacao.blocosExistentes" outlined type="number" label="Blocos existentes" />
            <q-input v-model="form.habitacao.unidadesPorBloco" outlined type="number" label="Unidades por bloco" />
            <q-input v-model="form.habitacao.totalUnidades" outlined type="number" label="Total de unidades" />
            <q-input v-model="form.habitacao.nomeConstrutora" outlined label="Nome da construtora" />
            <q-input v-model="form.habitacao.anoEntregaObra" outlined label="Ano de entrega da obra" mask="####" />
            <q-input v-model="form.habitacao.descricao" type="textarea" outlined label="Descrição" />
          </div>
        </q-form>
      </q-card-section>

      <div class="row justify-between">
        <q-card-actions align="left">
          <q-btn flat color="primary" label="Salvar" @click="handleCadastroUnidade" to="/perfil" />
        </q-card-actions>
        <q-card-actions align="right">
          <q-btn flat color="primary" label="Cadastrar Ambientes" @click="handleCadastroUnidade" to="/ambiente" />
        </q-card-actions>
      </div>
    </q-card>
  </q-page>
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
    const token = localStorage.getItem('apo@session');
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
