import { defineStore } from 'pinia'
import api from "../service/api"

import moment from 'moment'
import 'moment/locale/pt-br'

export const useAppStore = defineStore('app', {
  state: () => ({
    user:{id: 1791743390, nome: 'Joao Humberto'},
    erro: '',
    load: false,
    listTags: [],
    listQuerys: []
  }),
  getters:{
    readUser(){
      return this.user
    },
    readErro(){
      return this.erro
    },
    readListTags(){
      const list = this.listTags
      let newList = []
      list.forEach(x => {
          let object = { ...x._source }
          object.id = x._id
          newList.push(object)
      })
      return newList
    },
    readListQueries(){
      const list = this.listQuerys
      let newList = []
      list.forEach(x => {
          let object = { ...x._source }
          object.id = x._id
          newList.push(object)
      })
      return newList
    }
  },
  actions: {
    async loginSSO(login){
      try {
         const response = await fetch("https://sso.sefaz.ma.gov.br/auth/realms/sefaz/protocol/openid-connect/token", {
             method: 'POST',
             headers:{
                 'Content-Type': 'application/x-www-form-urlencoded'
             },
             body: new URLSearchParams({
                 'username': login.cpf,
                 'password': login.password,
                 'grant_type': 'password',
                 'client_id': "client-legisla"
             })
         })
        return response.status
     } catch (e) {
         console.log("erro senha:", e);
     } 
    },
    async login(item){
        const login = {
            cpf: this.apenasNumeros(item.login),
            password: item.password
        }
        const sso = await this.loginSSO(login) 

        if(sso == 200) {
            try {
                const user = (await this.findServidorElastic(parseInt(login.cpf))).data._source
                this.user = user
                this.saveUserData()

            } catch (error) {
                console.log("ERRO NO LOGIN");
            }
        } else{
            this.user = {id:'', nome: ''},
            this.erro = 'CPF e/ou Senha incorreto(s)'
        }
    },
    apenasNumeros(str) {
      try {
          return str.replace(/\D/g, '');
      } catch (error) {
          return str
      }
    },
    limpar(){
      this.user = {}
      this.erro = ''
      this.saveUserData()
    },
    async findServidorElastic(cpf){
      try {
          this.load = true
          const response = await api.get(`servidores/_doc/${cpf}`)
          return response
      } catch (error) {
          console.log("erro: elastic 1");
          this.erro = 'Servidor não encontrado'
      } finally {
          this.load = false
      }
    },
    saveUserData() {
      localStorage.setItem('userData', JSON.stringify(this.readLogin));
    },
    loadUserData() {
        const data = localStorage.getItem('userData');
        if (data) {
            const login = {
                login: JSON.parse(data).id,
                dn: JSON.parse(data).dn
            } 
            // if(login.login) this.login(login)
        }
    },
    async cargaTags(){
      this.listTags = []
      try {
        const res = await api.get("tags/_search")
        this.listTags = res.data.hits.hits
      } catch (error) {
        console.log("erro carga tags");
      }
    },
    async saveTag(item){
      const tag = {
        tag_name: item.tag_name,
        description: item.description,
        relation_ship: item.relation_ship,
        create_by: this.readUser.id,
        date_create: Date.now(),
      }
      try {
        const res = await api.post("tags/_doc", tag)

        //adicionar
        const newTagAdd = {
          _source: { ...tag },
          _id: res.data._id
        }
        this.listTags.push(newTagAdd)

      } catch (error) {
        console.log("erro salvar tag");
        return false
      }
    },
    async editTag(item){
      try {
        let tag = { ...item }
        tag.date_update = Date.now()
        delete tag.id

        const response = await api.put(`tags/_doc/${item.id}`, tag)
        tag.id = item.id
        this.atualizarObjeto(this.listTags, tag);

      } catch (error) {
        console.log('erro editar tag');
      }
    },
    async deleteTag(item){
      try {
        const res = await api.delete(`tags/_doc/${item}`)
        this.listTags = this.listTags.filter(x => x._id != item)
      } catch (error) {
        console.log('erro deletar tag');
      }
    },
    async saveQuery(item){

      try {
        let post = { ...item }
        post.create_by = this.readUser.id
        post.date_create = Date.now()
        post.date_update = []
        
        const res = await api.post("queryposts/_doc", post)

        const newQueryAdd = {
          _source: { ...post },
          _id: res.data._id
        }
        this.listQuerys.push(newQueryAdd)

      } catch (error) {
        console.log('erro nao salvou a query');
      }      
    },
    async editQuery(item){
      try {
        let query = { ...item }
        query.date_update = Date.now()
        delete query.id

        const response = await api.put(`queryposts/_doc/${item.id}`, query)
        query.id = item.id
        this.atualizarObjeto(this.listQuerys, query);

      } catch (error) {
        console.log('erro editar query');
      }
    },
    async deleteQuery(item){
      try {
        const res = await api.delete(`queryposts/_doc/${item}`)
        this.listQuerys = this.listQuerys.filter(x => x._id != item)
      } catch (error) {
        console.log('erro deletar QUERy');
      }
    },
    async cargaQueries(){
      this.listQuerys = []
      try {
        const res = await api.get("queryposts/_search")
        this.listQuerys = res.data.hits.hits
      } catch (error) {
        console.log("erro carga querys");
      }
    },
    atualizarObjeto(array, novoObjeto) {
      const index = array.findIndex(obj => obj._id === novoObjeto.id);
      // Verificar se o objeto foi encontrado
      if (index !== -1) {
        // Atualizar o objeto
        array[index]._source = { ...array[index]._source, ...novoObjeto };
      } else {
        console.log('Objeto com o id não encontrado.');
        console.log(array);
      }
    },
    dateFormate(item){
      return moment(item).locale('pt-br').format('DD/MM/YYYY')
    }
  },
})
