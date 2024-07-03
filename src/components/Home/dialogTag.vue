<template>
    <div class="text-center">
      <v-btn @click="dialog = true" icon="mdi-plus">
      </v-btn>
  
      <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card
          max-width="400"
          prepend-icon="mdi-update"
          text="Your application will relaunch automatically after the update is complete."
          title="Update in progress"
        >
        <h2>Adicionar Tag</h2>
        <v-form>
            <v-text-field
                label="Título da TAG"
                density="compact"
                variant="outlined"
            ></v-text-field>
            <v-textarea
                label="Descrição"
                density="compact"
                variant="outlined"
            ></v-textarea>
            <v-btn>Salvar</v-btn>
        </v-form>
          <template v-slot:actions>
            <v-btn
              class="ms-auto"
              text="Ok"
              @click="dialog = false"
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
}
</script>