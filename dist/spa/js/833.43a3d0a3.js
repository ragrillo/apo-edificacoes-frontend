"use strict";(globalThis["webpackChunkapo_edificacoes_client"]=globalThis["webpackChunkapo_edificacoes_client"]||[]).push([[833],{1833:(a,e,i)=>{i.r(e),i.d(e,{default:()=>U});var t=i(9835),d=i(6970);const n=(0,t._)("div",{class:"text-h6"},"Unidades",-1),o={key:0},l={key:1};function s(a,e,i,s,r,u){const c=(0,t.up)("q-linear-progress"),m=(0,t.up)("q-card-section"),p=(0,t.up)("q-separator"),g=(0,t.up)("q-item-label"),w=(0,t.up)("q-btn"),_=(0,t.up)("q-item-section"),f=(0,t.up)("q-item"),h=(0,t.up)("q-list"),b=(0,t.up)("q-card-actions"),k=(0,t.up)("q-card"),q=(0,t.up)("q-layout");return(0,t.wg)(),(0,t.j4)(q,null,{default:(0,t.w5)((()=>[(0,t.Wm)(k,{class:"q-ma-lg"},{default:(0,t.w5)((()=>[r.isLoading?((0,t.wg)(),(0,t.j4)(c,{key:0,indeterminate:""})):(0,t.kq)("",!0),(0,t.Wm)(m,null,{default:(0,t.w5)((()=>[n])),_:1}),(0,t.Wm)(p),(0,t.Wm)(m,null,{default:(0,t.w5)((()=>[u.possuiUnidades?((0,t.wg)(),(0,t.iD)("div",o,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(r.unidades,(a=>((0,t.wg)(),(0,t.j4)(h,{key:a.nome},{default:(0,t.w5)((()=>[(0,t.Wm)(f,null,{default:(0,t.w5)((()=>[(0,t.Wm)(_,{class:"q-gutter-y-md"},{default:(0,t.w5)((()=>[(0,t._)("div",null,[(0,t.Wm)(g,null,{default:(0,t.w5)((()=>[(0,t.Uk)((0,d.zw)(a.nome),1)])),_:2},1024),(0,t.Wm)(g,{caption:""},{default:(0,t.w5)((()=>[(0,t.Uk)("Tel.: "+(0,d.zw)(a.telefone),1)])),_:2},1024)]),(0,t._)("div",null,[(0,t.Wm)(w,{unelevated:"",color:"primary",label:"Iniciar avaliação",onClick:e=>u.irParaAmbiente(a._id)},null,8,["onClick"])])])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])):((0,t.wg)(),(0,t.iD)("span",l,"Não há unidades cadastradas."))])),_:1}),(0,t.Wm)(p),(0,t.Wm)(b,{align:"right"},{default:(0,t.w5)((()=>[(0,t.Wm)(w,{flat:"",color:"primary",label:"Atualizar",onClick:e[0]||(e[0]=a=>u.obterUnidades())}),(0,t.Wm)(w,{flat:"",color:"primary",label:"Adicionar",to:"/unidade"})])),_:1})])),_:1})])),_:1})}i(9665);var r=i(4136);const u={data(){return{isLoading:!0,unidades:[]}},mounted(){this.obterUnidades()},methods:{irParaAmbiente(a){localStorage.setItem("apo@unidade_id",a),this.$router.push("/ambiente")},async excluirUnidade(a){const e=localStorage.getItem("apo@usuario_edificacao"),i=`/unidades/${e}/${a}`;await r.api["delete"](i),this.obterUnidades()},async obterUnidades(){this.isLoading=!0;const a=localStorage.getItem("apo@usuario_id"),e=localStorage.getItem("apo@usuario_edificacao"),i=`/unidades/${e}/proprietario/${a}`,{data:t}=await r.api.get(i);this.unidades=t,this.isLoading=!1}},computed:{possuiUnidades(){return this.unidades.length>0}}};var c=i(1639),m=i(7605),p=i(4458),g=i(8289),w=i(3190),_=i(926),f=i(3246),h=i(490),b=i(1233),k=i(3115),q=i(4455),W=i(1821),y=i(9984),Z=i.n(y);const Q=(0,c.Z)(u,[["render",s]]),U=Q;Z()(u,"components",{QLayout:m.Z,QCard:p.Z,QLinearProgress:g.Z,QCardSection:w.Z,QSeparator:_.Z,QList:f.Z,QItem:h.Z,QItemSection:b.Z,QItemLabel:k.Z,QBtn:q.Z,QCardActions:W.Z})}}]);