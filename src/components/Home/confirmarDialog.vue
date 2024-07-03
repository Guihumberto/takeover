<template>
    <div class="text-center">
      <v-btn @click.stop ="dialog = true" variant='text' icon="mdi-delete">
      </v-btn>
  
      <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card
          max-width="400"
          prepend-icon="mdi-delete"
          :text="typeConfig.textInformation"
          :title="typeConfig.title"
        >
          <template v-slot:actions>
            <v-btn
              class="ms-auto"
              text="CANCELAR"
              @click="dialog = false"
            ></v-btn>
            <v-btn
              text="EXCLUIR"
              color="red"
              @click="$emit('excluir', idRemove), dialog = false"
            ></v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>

<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
    props:{
        type: Number,
        idRemove: String
    },
    computed:{
      typeConfig(){
        return this.type == 1
        ? {id:1, title: 'Excluir TAG', textInformation: 'Confirma a exclusão da TAG?'}
        : {id:2, title: 'Excluir POST', textInformation: 'Confirma a exclusão do POST?'}
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>