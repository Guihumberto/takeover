<template>
    <div class="bar">
        <v-list class="pa-0">
            <v-list-item link 
                @click="$emit('menuSelect', item.id), isRoute(item.id)"
                v-for="item, i in items" :key="i">
                <template v-slot:prepend>
                    <v-icon>{{ item.icon }}</v-icon>
                </template>
                <span class="listName">{{ item.name }}</span>
                </v-list-item>
        </v-list>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                items:[
                    {id:0, name:'Home', icon:'mdi-home'},
                    {id:1, name:'Posts', icon:'mdi-post'},
                    {id:2, name:'Tags', icon:'mdi-tag'},
                    {id:3, name:'Favoritos', icon:'mdi-star'}
                ]
            }
        },
        methods:{
            isRoute(id){
                this.$router.push(`?menu=${id}`)
            }
        }
    }
</script>

<style lang="scss" scoped>
.bar{
    width: 200px;
    height: 500px;
}
@media (max-width: 1000px) {
    .listName{
        display: none;
    }
}
</style>