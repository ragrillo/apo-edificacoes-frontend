<template>
    <div class="q-ma-md">
        <q-card class="q-mb-md">
            <q-card-section>
                <div class="text-h6">
                    Materiais e Acabamentos
                </div>
            </q-card-section>
            <q-card-section>
              <div>Avalie a qualidade dos materiais utilizados na construção da moradia</div>
            </q-card-section>
            <q-card-section v-bind:key="index" v-for="(index, p) in perguntas">
                <q-select
                v-show="perguntas[p].enunciado !== 'Outros (inserir)'"
                :label="perguntas[p].enunciado"
                :options="opt1"
                v-model="perguntas[p].resposta"
                outlined
                >
                </q-select>
                    <q-input
                    v-show="perguntas[p].resposta !== '' && perguntas[p].enunciado !== 'Outros (inserir)'"
                    class="q-py-md"
                    v-model="perguntas[p].observacao"
                    autogrow
                    outlined
                    label="Observações:"
                    >
                    </q-input>
                    <q-input
                    v-show="perguntas[p].enunciado === 'Outros (inserir)'"
                    class="q-py-md"
                    v-model="perguntas[9].resposta"
                    autogrow
                    outlined
                    label="Outros:"
                    >
                    </q-input>
            </q-card-section>
            <q-card-section>
            </q-card-section>
            <q-card-section>
                <div>{{ perguntas2[0].enunciado }}</div>
                <q-radio v-model="perguntas2[0].resposta" :label="opt3[0]" :val="opt3[0]"></q-radio>
                <q-radio v-model="perguntas2[0].resposta" :label="opt3[1]" :val="opt3[1]"></q-radio>
            </q-card-section>
            <q-card-section v-show="perguntas2[0].resposta === 'Sim'">
                <div class="q-gutter-sm" v-for="(index, i) in opt2" v-bind:key="index" >
                    <q-checkbox v-model="perguntas2[1].resposta" :val="opt2[i]" :label="opt2[i]"/>
                </div>
                <pre>{{ perguntas2[1].resposta }}</pre>
            </q-card-section>
            <q-card-section v-show="perguntas2[0].resposta === 'Sim'">
                <div>Outros:</div>
                <q-input class="q-py-md"
                v-model="perguntas2[1].observacao"
                autogrow
                outlined
                >
                </q-input>
            </q-card-section>
        </q-card>
    </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      opt3: ['Sim', 'Não'],
      opt1: ['Péssima', 'Ruim', 'Regular', 'Bom', 'Excelente'],
      opt2: ['Vegetação incrustada', 'Fissura na laje', 'Trinca no piso', 'Não adequadas', 'Pintura deficiente', 'Inoperante', 'Oxidação', 'Sem tampa', 'Mancha de umidade', 'Fissuras', 'Lacre rompido', 'Infiltração de água', 'Descolamento da argamassa', 'Peças soltas'],
      perguntas: [
        {
          enunciado: 'Pintura de paredes',
          resposta: '',
          observacao: '',
        },
        {
          enunciado: 'Revestimentos',
          resposta: '',
          observacao: '',
        },
        {
          enunciado: 'Pisos',
          resposta: '',
          observacao: '',
        },
        {
          enunciado: 'Instalações elétricas (tomadas, disjuntores, fios elétricos, etc)',
          resposta: '',
          observacao: '',
        },
        {
          enunciado: 'Instalações telefônicas e internet (tomadas e conectores, cabos telefônicos e de internet, etc)',
          resposta: '',
          observacao: '',
        },
        {
          enunciado: 'Instalações hidráulicas (torneiras, registros, canos de água ou esgoto, etc)',
          resposta: '',
          observacao: '',
        },
        {
          enunciado: 'Esquadrias (portas e janelas)',
          resposta: '',
          observacao: '',
        },
        {
          enunciado: 'Forro',
          resposta: '',
          observacao: '',
        },
        {
          enunciado: 'Louças (vaso sanitário, pia, tanque e bancada)',
          resposta: '',
          observacao: '',
        },
        {
          enunciado: 'Outros (inserir)',
          resposta: '',
          observacao: '',
        },
      ],
      perguntas2: [
        {
          enunciado: 'A moradia apresentou defeitos ou mal funcionamento em algum dos itens descritos abaixo durante a garantia da edificação?',
          resposta: '',
          observacao: '',
        },
        {
          enunciado: 'Qual destes?',
          resposta: [],
          observacao: '',
        },
      ],
    };
  },
});
</script>
