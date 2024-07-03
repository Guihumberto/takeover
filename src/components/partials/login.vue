<template>
    <div class="login">
       <div class="mb-3">
           <h3>Faça seu Login</h3>
           <p class="destaque">Acesse com a senha do SEFAZNET</p>
       </div>
       <v-form ref="form" @submit.prevent="login">
            <div class="my-5">
                <v-text-field
                    prepend-inner-icon="mdi-account"
                    label="CPF"
                    placeholder="Digite seu CPF"
                    density="compact"
                    variant="outlined"
                    v-mask="'###.###.###-##'"
                    :rules="[rules.required, rules.mincpf]"
                    v-model="userLogin.login"
                    clearable
                ></v-text-field>
                <v-text-field
                    prepend-inner-icon="mdi-lock"
                    :append-inner-icon="showPassword ? 'mdi-eye': 'mdi-eye-off'"
                    label="Senha"
                    placeholder="Digite sua senha"
                    density="compact"
                    variant="outlined"
                    @click:append-inner.stop="showPassword = !showPassword"
                    :type="showPassword ? 'password' : 'text'"
                    :rules="[rules.required]"
                    v-model="userLogin.password"
                    clearable
                >
                </v-text-field>
            </div>
           <v-btn block color="primary" type="submit" :loading="loadLogin">Entrar</v-btn>
           <v-expand-transition>
               <div v-if="readErro" class="pa-2">
                   <p class="text-error" >{{ readErro }} <v-icon @click="limpar()">mdi-close</v-icon></p>
               </div>
           </v-expand-transition>
       </v-form>
   </div>
</template>

<script>
   import { useAppStore } from '@/stores/app'
   const appStore = useAppStore()  

   import {mask} from 'vue-the-mask'
   
   export default {
       directives:{
           mask
       },
       data(){
           return{
               rules:{
                   required: (value) => !!value || "Campo obrigatório",
                   mincpf: (v) => (v||'').length == 14 || "11 dígitos",
                   mindn: (v) => (v||'').length == 10 || "8 dígitos",
               },
               loadLogin: false,
               userLogin:{
                   login: '',
                   password: '',
               },
               showPassword: true
           }
       },
       computed:{
            user(){
                return appStore.readUser
            },
            readErro(){
                return appStore.readErro
            }
       },
       methods:{
           async login(){
               const { valid } = await this.$refs.form.validate()
               if(valid){
                   this.loadLogin = true
                   await appStore.login(this.userLogin)
                   console.log(this.user)
                   if(this.user.id){
                       this.loadLogin = false  
                       window.location.href = "/principal";
                   } else {
                    this.loadLogin = false
                   }

               }
           },
           limpar(){
            appStore.erro = ''
           }
       }
   }
</script>

<style lang="scss" scoped>
.destaque{
   padding: 2px;
   color: white;
}
</style>