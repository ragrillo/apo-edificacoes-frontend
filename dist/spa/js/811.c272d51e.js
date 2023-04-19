"use strict";(globalThis["webpackChunkapo_edificacoes_client"]=globalThis["webpackChunkapo_edificacoes_client"]||[]).push([[811],{8811:(e,o,t)=>{t.r(o),t.d(o,{default:()=>W});var a=t(9835),r=t(6970);const i={class:"q-my-md text-bold text-uppercase"};function s(e,o,t,s,n,l){const u=(0,a.up)("q-linear-progress"),c=(0,a.up)("q-card-title"),m=(0,a.up)("q-card-section"),p=(0,a.up)("q-separator"),d=(0,a.up)("QuestionarioComponent"),h=(0,a.up)("q-btn"),g=(0,a.up)("q-card-actions"),f=(0,a.up)("q-card");return(0,a.wg)(),(0,a.j4)(f,{class:"q-ma-lg"},{default:(0,a.w5)((()=>[n.isLoading?((0,a.wg)(),(0,a.j4)(u,{key:0,indeterminate:"",color:"primary"})):(0,a.kq)("",!0),(0,a.Wm)(m,null,{default:(0,a.w5)((()=>[(0,a.Wm)(c,{class:"text-h6"},{default:(0,a.w5)((()=>[(0,a.Uk)((0,r.zw)(n.nomeDimensao),1)])),_:1})])),_:1}),(0,a.Wm)(p),(0,a.Wm)(m,null,{default:(0,a.w5)((()=>[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(l.prepareQuestionario(),((e,o)=>((0,a.wg)(),(0,a.iD)("div",{key:o},[(0,a._)("div",i,(0,r.zw)(e.categoria),1),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.perguntas,(e=>((0,a.wg)(),(0,a.iD)("div",{key:e.codigo},[(0,a.Wm)(d,{criterio:e,onResposta:l.addResposta},null,8,["criterio","onResposta"])])))),128))])))),128))])),_:1}),(0,a.Wm)(p),(0,a.Wm)(g,{align:"right"},{default:(0,a.w5)((()=>[(0,a.Wm)(h,{flat:"",color:"primary",label:"Fechar",to:"/ambiente"}),(0,a.Wm)(h,{flat:"",color:"primary",label:"Anterior",onClick:o[0]||(o[0]=e=>l.irParaAnterior())}),(0,a.Wm)(h,{flat:"",color:"primary",label:"Próximo",onClick:o[1]||(o[1]=e=>l.irParaProximo())}),(0,a.Wm)(h,{flat:"",color:"primary",label:n.hasSubmitted?"Salvo":"Salvar",disable:n.hasSubmitted,onClick:o[2]||(o[2]=e=>l.enviarFormulario())},null,8,["label","disable"])])),_:1})])),_:1})}t(9665);var n=t(4136);const l={class:"q-my-sm"};function u(e,o,t,i,s,n){const u=(0,a.up)("q-btn"),c=(0,a.up)("q-radio");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a._)("div",l,[t.criterio.dica?((0,a.wg)(),(0,a.j4)(u,{key:0,dense:"",rounded:"",flat:"",icon:"info",color:"primary",size:"sm"})):(0,a.kq)("",!0),(0,a.Uk)(" "+(0,r.zw)(t.criterio.enunciado),1)]),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.criterio.opcoesResposta,((e,r)=>((0,a.wg)(),(0,a.iD)("div",{key:r},[(0,a.Wm)(c,{modelValue:s.resposta,"onUpdate:modelValue":[o[0]||(o[0]=e=>s.resposta=e),o[1]||(o[1]=e=>n.enviarResposta(t.criterio))],label:e,val:e},null,8,["modelValue","label","val"])])))),128))],64)}const c={emits:["resposta"],props:{criterio:{type:Object,required:!0}},data(){return{resposta:""}},methods:{enviarResposta(e){const o={criterio:e.codigo,resposta:this.resposta};this.$emit("resposta",o)}}};var m=t(1639),p=t(4455),d=t(1480),h=t(9984),g=t.n(h);const f=(0,m.Z)(c,[["render",u]]),b=f;g()(c,"components",{QBtn:p.Z,QRadio:d.Z});const w={data(){return{respostas:[],questionario:[],isLoading:!0,hasSubmitted:!1,resposta:"",nomeDimensao:""}},components:{QuestionarioComponent:b},beforeRouteUpdate(e,o,t){this.isLoading=!0,this.getQuestionario(e.params.numero),t()},mounted(){this.getQuestionario(this.$route.params.numero)},methods:{getQuestionario(e){this.setNomeDimensao();const o=`/criterios/${e}`;n.api.get(o).then((e=>{this.questionario=e.data})).catch((e=>{console.log(e)})).finally((()=>{this.isLoading=!1}))},prepareQuestionario(){const e=[];return this.questionario.forEach((o=>{const t=e.find((e=>e.categoria===o.categoria));t?t.perguntas.push(o):e.push({categoria:o.categoria,perguntas:[o]})})),e},addResposta(e){const o=this.respostas.findIndex((o=>o.criterio===e.criterio));-1===o?this.respostas.push(e):this.respostas[o]=e},enviarFormulario(){const e="/formularios",o=localStorage.getItem("apo@ambiente_id"),t={ambiente:o,respostas:this.respostas};n.api.post(e,t).then((()=>{this.hasSubmitted=!0,alert("Formulário salvo com sucesso!")})).catch((e=>{console.log(e),alert("Erro ao salvar formulário!")})).finally((()=>{this.isLoading=!1}))},irParaProximo(){n.api.get("/dimensoes").then((({data:e})=>{const{numero:o}=this.$route.params,t=e.filter((e=>"Gestão e Projeto"===e.grupo)),a=t.find((e=>e.numero>o));a&&this.$router.push(`/criterio/${a.numero}`)}))},irParaAnterior(){n.api.get("/dimensoes").then((({data:e})=>{const{numero:o}=this.$route.params,t=e.filter((e=>"Gestão e Projeto"===e.grupo)),a=t.findIndex((e=>e.numero===o)),r=t.slice(0,a),i=r[r.length-1];i&&this.$router.push(`/criterio/${i.numero}`)}))},setNomeDimensao(){n.api.get("/dimensoes").then((({data:e})=>{const{numero:o}=this.$route.params,t=e.find((e=>e.numero===o));t&&(this.nomeDimensao=t.nome)}))}}};var v=t(4458),q=t(8289),k=t(3190),y=t(926),Q=t(1821);const D=(0,m.Z)(w,[["render",s]]),W=D;g()(w,"components",{QCard:v.Z,QLinearProgress:q.Z,QCardSection:k.Z,QSeparator:y.Z,QCardActions:Q.Z,QBtn:p.Z})}}]);