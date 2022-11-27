<template>
  <div class="q-ma-md">
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Iluminação artificial</div>
      </q-card-section>

      <q-card-section>
        <div>{{ perguntas[0].enunciado }}</div>
        <div class="q-mt-md">
          <q-radio v-model="perguntas[0].resposta" label="Sim" val="Sim" />
          <q-radio v-model="perguntas[0].resposta" label="Não" val="Não" />
        </div>
      </q-card-section>

      <q-separator />
      <q-card-section v-show="perguntas[0].resposta === 'Sim'">
        <div>{{ perguntas[1].enunciado }}</div>
        <div class="q-mt-md">
          <q-select v-model="perguntas[1].resposta" outlined :options="modelosLampadas" behavior="menu"
            label="Selecione a lâmpada" />
        </div>
      </q-card-section>

      <q-img
        v-show="perguntas[1].resposta"
        class="q-my-md"
        src="~assets/lampadas/0.webp"
        fit="contain"
        :ratio="16/9"
      />

      <q-card-section v-show="perguntas[1].resposta">
        <div>{{ perguntas[2].enunciado }}</div>
        <div class="q-mt-md">
          <q-select v-model="perguntas[2].resposta" outlined :options="potenciaLampadas[perguntas[1].resposta]"
            label="Selecione a potência" behavior="menu" />
        </div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn flat color="primary" label="Concluir" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

const modelosLampadas = [
  'Incandescente Tradicional',
  'Incandescente Halógena',
  'Incandescente Halógena - Dicróico',
  'Fluorescente Tubular',
  'Fluorescente Compacta',
  'Lâmpada de Vapor de Mercúrio',
  'Lâmpada de Vapor de Sódio',
  'Lâmpada Mista',
  'LED Bulbo',
  'LED Tubular',
  'LED Milho',
  'LED Espiral',
  'LED Vela',
  'LED com Filamentos',
  'LED Dicróica e PAR',
  'LED Bolinha',
  'Placa de LED',
];

const potenciaLampadas = {
  'Incandescente Tradicional': ['20 W', '35 W', '40 W', '50 W', '60 W', '70 W', '80 W', '100 W', '110 W', '120 W', '140 W', '150 W', '200 W', '250 W', '300 W', '350 W', '400 W', '500 W', '550 W', '700 W'],
  'Incandescente Halógena': ['20 W', '35 W', '40 W', '50 W', '60 W', '70 W', '80 W', '100 W', '110 W', '120 W', '140 W', '150 W', '200 W', '250 W', '300 W', '350 W', '400 W', '500 W', '550 W', '700 W'],
  'Incandescente Halógena - Dicróico': ['20 W', '35 W', '40 W', '50 W', '60 W', '70 W', '80 W', '100 W', '110 W', '120 W', '140 W', '150 W', '200 W', '250 W', '300 W', '350 W', '400 W', '500 W', '550 W', '700 W'],
  'Fluorescente Tubular': ['12 W', '14 W', '18 W', '20 W', '25 W', '28 W', '32 W', '26 W', '44 W', '58 W', '70 W'],
  'Fluorescente Compacta': [],
  'Lâmpada de Vapor de Mercúrio': [],
  'Lâmpada de Vapor de Sódio': ['100 W', '150 W', '250 W', '300 W', '400 W'],
  'Lâmpada Mista': [],
  'LED Bulbo': ['2 W', '3 W', '5 W', '6 W', '7 W', '9 W', '10 W', '12 W', '13 W', '15 W', '18 W', '20 W', '25 W', '30 W', '35 W', '50 W', '80 W', '100 W', '120 W', '150 W'],
  'LED Tubular': ['2 W', '3 W', '5 W', '6 W', '7 W', '9 W', '10 W', '12 W', '13 W', '15 W', '18 W', '20 W', '25 W', '30 W', '35 W', '50 W', '80 W', '100 W', '120 W', '150 W'],
  'LED Milho': ['2 W', '3 W', '5 W', '6 W', '7 W', '9 W', '10 W', '12 W', '13 W', '15 W', '18 W', '20 W', '25 W', '30 W', '35 W', '50 W', '80 W', '100 W', '120 W', '150 W'],
  'LED Espiral': ['2 W', '3 W', '5 W', '6 W', '7 W', '9 W', '10 W', '12 W', '13 W', '15 W', '18 W', '20 W', '25 W', '30 W', '35 W', '50 W', '80 W', '100 W', '120 W', '150 W'],
  'LED Vela': ['2 W', '3 W', '5 W', '6 W', '7 W', '9 W', '10 W', '12 W', '13 W', '15 W', '18 W', '20 W', '25 W', '30 W', '35 W', '50 W', '80 W', '100 W', '120 W', '150 W'],
  'LED com Filamentos': ['2 W', '3 W', '5 W', '6 W', '7 W', '9 W', '10 W', '12 W', '13 W', '15 W', '18 W', '20 W', '25 W', '30 W', '35 W', '50 W', '80 W', '100 W', '120 W', '150 W'],
  'LED Dicróica e PAR': ['2 W', '3 W', '5 W', '6 W', '7 W', '9 W', '10 W', '12 W', '13 W', '15 W', '18 W', '20 W', '25 W', '30 W', '35 W', '50 W', '80 W', '100 W', '120 W', '150 W'],
  'LED Bolinha': ['2 W', '3 W', '5 W', '6 W', '7 W', '9 W', '10 W', '12 W', '13 W', '15 W', '18 W', '20 W', '25 W', '30 W', '35 W', '50 W', '80 W', '100 W', '120 W', '150 W'],
  'Placa de LED': ['2 W', '3 W', '5 W', '6 W', '7 W', '9 W', '10 W', '12 W', '13 W', '15 W', '18 W', '20 W', '25 W', '30 W', '35 W', '50 W', '80 W', '100 W', '120 W', '150 W'],
};

const perguntas = [
  {
    enunciado: 'O ambiente possui luminárias?',
    resposta: '',
  },
  {
    enunciado: 'Selecione o modelo de lâmpada similar ao existente no ambiente:',
    resposta: '',
  },
  {
    enunciado: 'Qual a potência da lâmpada?',
    resposta: '',
  },
];

export default defineComponent({
  name: 'IluminacaoArtificialPage',
  data() {
    return {
      perguntas,
      modelosLampadas,
      potenciaLampadas,
    };
  },
});
</script>
