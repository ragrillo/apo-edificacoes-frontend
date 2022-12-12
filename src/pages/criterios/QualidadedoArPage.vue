<template>
  <div class="q-ma-md">
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Conforto Visual</div>
      </q-card-section>
      <q-card-section>
          <div class="q-mt-md">
            <q-select
            :label="perguntas[0].enunciado"
            :options="opt1"
            v-model="perguntas[0].resposta"
            outlined
            >
            </q-select>
          </div>
      </q-card-section>
      <q-card-section>
        <div class="q-mt-md">
          <q-select
          :label="perguntas[1].enunciado"
          :options="opt2"
          v-model="perguntas[1].resposta"
          outlined
          >
          </q-select>
        </div>
      </q-card-section>
      <q-card-section>
        <div>
          {{ perguntas[2].enunciado }}
          <q-btn icon="info" class="" @click="alert = true" outlined round flat ></q-btn>
        </div>
          <q-radio v-model="perguntas[2].resposta" :label="opt3[0]" :val="opt3[0]"></q-radio>
          <q-radio v-model="perguntas[2].resposta" :label="opt3[1]" :val="opt3[1]"></q-radio>
        <div>
        </div>
        <q-dialog v-model="alert">
          <q-card>
            <q-card-section>
              <div class="text-h6">Informativo inspeção</div>
            </q-card-section>
            <q-card-section class="q-pt-none text-black">
              A avaliacão da adequacão das aberturas deve ser realizada através da analise do projeto arquitetônico, utilizando a equação a seguir para determinar a relação da área de abertura e área de piso.
            </q-card-section>
            <q-card-section class="q-pt-none text-red" align="center">
              A = 100 * (Aa/Ap)
            </q-card-section>
            <q-card-section class="q-pt-none text-black">
              Aa a area efetiva de abertura de ventilac;ao do ambiente, sendo que para o calculo desta area somente sao consideradas as aberturas que permitam a livre circulac;ao do ar, devendo ser descontadas as areas de perfis, vidros e de qualquer outro obstaculo; nesta area nao sao computadas
              as areas de portas internas. No caso de c6modos dotados de portas-balcao ou semelhantes, na fachada da edificacão, toda a área aberta resultante do deslocamento da folha móvel da porta e computada.
              Ap - a área de piso do ambiente.
            </q-card-section>
            <br>
            <q-card-section class="q-pt-none text-black">
              Para ser considerado adequado a Segundo a NBR 15575-4 (ABNT, 2013d) ambientes de longa permanencia (salas, cozinhas e dormit6rios) devem apresentar aberturas, nas fachadas das habitac;oes, com dimensoes adequadas para proporcionar a ventilac;ao interna dos ambientes. As aberturas para ventilac;ao variam de acordo com a zona bioclimatica:<br>
              ⦁ Zonas bioclimaticas 1 a 7 sao necessarias aberturas com area igual ou maior a 7% da area de piso;<br>
              ⦁ Zona bioclimatica 8 são necessrias aberturas com area  igual ou maior a 12% da area de piso na regiao norte do Brasil, e igual ou maior a 8% da area de piso no nordeste e sudeste do pafs.
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card-section>
    </q-card>
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Umidade do ar</div>
      </q-card-section>
      <q-card-section>
        <div>{{ perguntas[3].enunciado }}</div>
        <q-radio v-model="perguntas[3].resposta" :label="opt3[0]" :val="opt3[0]"></q-radio>
        <q-radio v-model="perguntas[3].resposta" :label="opt3[1]" :val="opt3[1]"></q-radio>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      alert: 'false',
      opt1: ['Péssima', 'Ruim', 'Regular', 'Bom', 'Excelente'],
      opt3: ['Sim', 'Não'],
      opt2: [
        'Muito frequentemente',
        'Frequentemente',
        'Ocasionalmente',
        'Raramente',
        'Nunca',
      ],
      perguntas: [
        {
          enunciado: 'Avalie a ventilação da sua moradia',
          resposta: '',
        },
        {
          enunciado: 'Há presença de odores (mal cheiro) na moradia?',
          resposta: '',
        },
        {
          enunciado: 'Existe ventilaçao cruzada?',
          resposta: '',
        },
        {
          enunciado: 'Há sinais de de umidade nas paredes e superfícies?',
          resposta: '',
        },
      ],
    };
  },
});
</script>
