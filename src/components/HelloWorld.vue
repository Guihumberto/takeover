<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <v-img
        class="mb-4"
        height="150"
        src="@/assets/brasao.png"
      />

      <div class="text-center">
        <div class="text-body-2 font-weight-light mb-n1">Takeover</div>

        <h1 class="text-h2 font-weight-bold">SEFAZ MA</h1>
      </div>

     <div class="my-5 content">
      
      <v-card
            class="pa-4"
            color="surface-variant"
            rounded="lg"
            variant="outlined"
            max-width="400"
          >
            <login />
      </v-card>
     </div>
    </v-responsive>
  </v-container>
</template>

<script>
  import login from '@/components/partials/login.vue'
  export  default{
    components:{
      login
    }
  }
  //
</script>
<style scoped>
.content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
  
</style>
