"use strict";(globalThis["webpackChunkapo_edificacoes_client"]=globalThis["webpackChunkapo_edificacoes_client"]||[]).push([[71],{7071:(e,a,o)=>{o.r(a),o.d(a,{default:()=>P});var l=o(9835),s=o(6970),i=o(1957);const r=(0,l._)("div",{class:"text-h6"},"Cadastros solicitados",-1),u={key:0,align:"center"},t={key:1},d={class:"text-h6"},n={class:"q-gutter-y-md"},m={class:"q-gutter-y-md"},c={class:"text-bold"};function p(e,a,o,p,g,b){const f=(0,l.up)("q-card-section"),v=(0,l.up)("q-item-label"),w=(0,l.up)("q-item-section"),h=(0,l.up)("q-chip"),V=(0,l.up)("q-item"),y=(0,l.up)("q-list"),_=(0,l.up)("q-circular-progress"),q=(0,l.up)("q-card"),W=(0,l.up)("q-input"),C=(0,l.up)("q-select"),k=(0,l.up)("q-btn"),z=(0,l.up)("q-card-actions"),U=(0,l.up)("q-dialog"),Z=(0,l.Q2)("ripple");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l.Wm)(q,{class:"q-ma-lg"},{default:(0,l.w5)((()=>[(0,l.Wm)(f,null,{default:(0,l.w5)((()=>[r,(0,l.Uk)(" Selecione um cadastro para obter mais informações e alterar seu status ")])),_:1}),e.usuarios.length>0?((0,l.wg)(),(0,l.j4)(y,{key:0,separator:""},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.usuarios,(a=>(0,l.wy)(((0,l.wg)(),(0,l.j4)(V,{clickable:"",key:a._id,class:"q-pa-md",onClick:o=>e.requestusuario(a._id,"details")},{default:(0,l.w5)((()=>[(0,l.Wm)(w,null,{default:(0,l.w5)((()=>[(0,l.Wm)(v,null,{default:(0,l.w5)((()=>[(0,l.Uk)((0,s.zw)(a.nomeCompleto),1)])),_:2},1024),(0,l.Wm)(v,{caption:""},{default:(0,l.w5)((()=>[(0,l.Uk)((0,s.zw)(a.email),1)])),_:2},1024)])),_:2},1024),(0,l.Wm)(w,{side:""},{default:(0,l.w5)((()=>[(0,l.Wm)(h,{outline:"",color:"primary",label:a.status},null,8,["label"])])),_:2},1024)])),_:2},1032,["onClick"])),[[Z]]))),128))])),_:1})):((0,l.wg)(),(0,l.j4)(f,{key:1},{default:(0,l.w5)((()=>[e.isLoading?((0,l.wg)(),(0,l.iD)("div",u,[(0,l.Wm)(_,{indeterminate:"",size:"sm",color:"primary"})])):((0,l.wg)(),(0,l.iD)("div",t,"Não há solicitações pendentes"))])),_:1}))])),_:1}),(0,l.Wm)(U,{modelValue:e.showDetails,"onUpdate:modelValue":a[12]||(a[12]=a=>e.showDetails=a)},{default:(0,l.w5)((()=>[(0,l.Wm)(q,{style:{width:"100%"}},{default:(0,l.w5)((()=>[(0,l.Wm)(f,null,{default:(0,l.w5)((()=>[(0,l._)("div",d,"Informações sobre "+(0,s.zw)(e.usuario.nomeCompleto),1)])),_:1}),(0,l.Wm)(f,{class:"q-gutter-y-lg"},{default:(0,l.w5)((()=>[(0,l._)("div",n,[(0,l.Wm)(W,{outlined:"",readonly:"",modelValue:e.usuario.cargo,"onUpdate:modelValue":a[0]||(a[0]=a=>e.usuario.cargo=a),label:"Cargo"},null,8,["modelValue"]),(0,l.wy)((0,l.Wm)(W,{outlined:"",readonly:"",modelValue:e.usuario.edificacao,"onUpdate:modelValue":a[1]||(a[1]=a=>e.usuario.edificacao=a),label:"Edificação"},null,8,["modelValue"]),[[i.F8,e.usuario.edificacao]]),(0,l.Wm)(W,{outlined:"",readonly:"",modelValue:e.usuario.nomeCompleto,"onUpdate:modelValue":a[2]||(a[2]=a=>e.usuario.nomeCompleto=a),label:"Nome Completo"},null,8,["modelValue"]),(0,l.Wm)(W,{outlined:"",readonly:"",modelValue:e.usuario.email,"onUpdate:modelValue":a[3]||(a[3]=a=>e.usuario.email=a),label:"Email"},null,8,["modelValue"]),(0,l.Wm)(W,{outlined:"",readonly:"",modelValue:e.usuario.telefone,"onUpdate:modelValue":a[4]||(a[4]=a=>e.usuario.telefone=a),label:"Telefone"},null,8,["modelValue"])]),(0,l.wy)((0,l._)("div",m,[(0,l._)("div",c,"Informações sobre "+(0,s.zw)(e.usuario.razaoSocial),1),(0,l.Wm)(W,{outlined:"",readonly:"",modelValue:e.usuario.cnpj,"onUpdate:modelValue":a[5]||(a[5]=a=>e.usuario.cnpj=a),label:"CNPJ"},null,8,["modelValue"]),(0,l.Wm)(W,{outlined:"",readonly:"",modelValue:e.usuario.razaoSocial,"onUpdate:modelValue":a[6]||(a[6]=a=>e.usuario.razaoSocial=a),label:"Razão Social"},null,8,["modelValue"]),(0,l.Wm)(W,{outlined:"",readonly:"",modelValue:e.usuario.emailEmpresarial,"onUpdate:modelValue":a[7]||(a[7]=a=>e.usuario.emailEmpresarial=a),label:"Email Empresarial"},null,8,["modelValue"]),(0,l.Wm)(W,{outlined:"",readonly:"",modelValue:e.usuario.telefoneEmpresarial,"onUpdate:modelValue":a[8]||(a[8]=a=>e.usuario.telefoneEmpresarial=a),label:"Telefone Empresarial"},null,8,["modelValue"])],512),[[i.F8,e.isEmpresa(e.usuario.cargo)]]),(0,l.Wm)(C,{outlined:"",modelValue:e.usuario.status,"onUpdate:modelValue":a[9]||(a[9]=a=>e.usuario.status=a),label:"Status",behavior:"menu",options:e.statusOptions},null,8,["modelValue","options"])])),_:1}),(0,l.Wm)(z,{align:"right"},{default:(0,l.w5)((()=>[(0,l.Wm)(k,{flat:"",label:"Voltar",color:"primary",onClick:a[10]||(a[10]=a=>e.showDetails=!1)}),(0,l.Wm)(k,{flat:"",label:"Atualizar",color:"primary",loading:e.isStatusLoading,onClick:a[11]||(a[11]=a=>e.updateUsuario(e.usuario._id))},null,8,["loading"])])),_:1})])),_:1})])),_:1},8,["modelValue"])],64)}var g=o(4136),b=o(7885);const f=["Pendente","Ativado","Desativado"],v=(0,l.aZ)({data(){return{usuario:{},usuarios:[],isLoading:!1,showDetails:!1,isStatusLoading:!1,statusOptions:f}},mounted(){this.requestusuarios()},methods:{isEmpresa(e){return e===b[4].value},async updateUsuario(e){this.isStatusLoading=!0;const a=this.usuario;delete a._id,await g.api.put(`/usuarios/${e}`,a),this.isStatusLoading=!1,this.showDetails=!1,this.requestusuarios()},async requestusuario(e,a){const{data:o}=await g.api.get(`/usuarios/${e}`);this.usuario=o,"details"===a?(this.showDetails=!0,this.isVisible=!1):(this.showDetails=!1,this.isVisible=!0)},async requestusuarios(){this.isLoading=!0;const{data:e}=await g.api.get("/usuarios");this.usuarios=e,this.isLoading=!1}}});var w=o(1639),h=o(4458),V=o(3190),y=o(3246),_=o(490),q=o(1233),W=o(3115),C=o(7691),k=o(3302),z=o(7743),U=o(6611),Z=o(6997),D=o(1821),S=o(4455),Q=o(1136),E=o(9984),j=o.n(E);const L=(0,w.Z)(v,[["render",p]]),P=L;j()(v,"components",{QCard:h.Z,QCardSection:V.Z,QList:y.Z,QItem:_.Z,QItemSection:q.Z,QItemLabel:W.Z,QChip:C.Z,QCircularProgress:k.Z,QDialog:z.Z,QInput:U.Z,QSelect:Z.Z,QCardActions:D.Z,QBtn:S.Z}),j()(v,"directives",{Ripple:Q.Z})},7885:e=>{e.exports=JSON.parse('[{"value":"1","label":"Ambiente ou Coordenador","description":"Profissional responsável pela gestão e organização do processo de trabalho da unidade bem como a integração da mesma com outros serviços do município."},{"value":"2","label":"Técnico, Engenheiro ou Arquiteto","description":"Profissional técnico responsável pela vistoria e verificação dos projetos, orientação e fiscalização das atividades e obras de construção civil. Responsável pela avaliação dos serviços executados bem como a otimização das etapas de serviços dentro do cronograma apresentado."},{"value":"3","label":"Gestor do Departamento","description":"Profissional responsável por organizar os objetivos da empresa/departamento, planejar as metas e delegar as tarefas para que os colaboradores consigam colocar em prática o que a empresa/departamento almeja. Responsável pela tomada de decisões, como alocação de recursos. "},{"value":"4","label":"Diretor da Secretaria","description":"Profissional responsável por planejar, organizar, dirigir, coordenar e controlar as ações políticas e de comunicação da empresa/secretaria/prefeitura. No setor privado é o responsável por dirigir e administrar a empresa, buscando a obtenção de lucro. Responsável pela tomada de decisões, como aprovação de recursos. "},{"value":"5","label":"Administrador","description":"Profissional responsável por criar e fazer as manutenções da estrutura do aplicativo. Executa as permissões de novos usuários."}]')}}]);