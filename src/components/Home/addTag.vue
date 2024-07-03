<template>
    <div class="text-center">
      <v-btn @click.stop="dialog = true" flat :variant="refId == 2 ? 'text': 'flat'" :icon="iconBtnType.icon">
      </v-btn>
  
      <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card
          width="450"
          prepend-icon="mdi-plus-circle"
          :title="iconBtnType.name"
        >
        <v-card-text>
            <v-form @submit.prevent="save()" ref="form">
                <v-text-field
                    label="Título da TAG"
                    density="compact"
                    variant="outlined"
                    :rules="[rules.required]"
                    v-model="tag.tag_name"
                    focused
                ></v-text-field>
                <v-textarea
                    label="Descrição"
                    density="compact"
                    variant="outlined"
                    :rules="[rules.required]"
                    v-model="tag.description"
                ></v-textarea>
                <div class="d-flex justify-end">
                    <v-btn variant="text" @click="dialog = false">Fechar</v-btn>
                    <v-btn :color="iconBtnType.color" variant="flat" type="submit">{{ iconBtnType.title }}</v-btn>
                </div>
            </v-form>
        </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </template>

<script>
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()

export default {
  data () {
    return {
      dialog: false,
      tag:{
        tag_name: '',
        description: '',
        relation_ship: []
      },
      rules:{
          required: (value) => !!value || "Campo obrigatório",
          mincpf: (v) => (v||'').length == 14 || "11 dígitos",
          mindn: (v) => (v||'').length == 10 || "8 dígitos",
      },
    }
  },
  props:{
    refId: true,
    tagEdit: Object
  },
  watch:{
    dialog(antes, depois){
      if(this.refId == 2) this.tag = this.tagEdit
    }
  },
  computed:{
    iconBtnType(){
      return this.refId == 1
      ? {name: 'Adicionar Tag',icon:'mdi-plus', title: 'Salvar', color: 'success'}
      : {name: 'Editar Tag',icon:'mdi-pencil', title: 'Editar', color: 'warning'}
    }
  },
  methods:{
    async save(){
        const { valid } = await this.$refs.form.validate()
        if(valid){
            if(this.refId == 1) {
              await appStore.saveTag(this.tag)
            } else {
              await appStore.editTag(this.tag)
            }
            this.clear()
            this.dialog = false
        }
    },
    clear(){
      this.tag = {
        tag_name: '',
        description: '',
        relation_ship: ''
      }
    }
  }
}
</script>