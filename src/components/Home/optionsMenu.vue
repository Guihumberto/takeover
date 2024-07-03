<template>
    <div class="d-flex justify-space-around">
        <v-btn
         id="menu-activator"
         color="primary"
       >
         Sibling activator
       </v-btn>
       <v-menu activator="#menu-activator">
         <v-list>
           <v-list-item
             v-for="(item, index) in items"
             :key="index"
             :value="index"
           >
             <v-list-item-title>{{ item.title }}</v-list-item-title>
           </v-list-item>
         </v-list>
       </v-menu>
    </div>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }),
  }
</script>

<style lang="scss" scoped>

</style>