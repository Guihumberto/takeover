<template>
    <div class="content">
        <listAllPosts v-if="menu == 0" />
        <listQuery v-if="menu == 1" />
        <listTags v-if="menu == 2" />
        <favQuery v-if="menu == 3" />
    </div>
</template>

<script>

export default {
    data(){
        return{
            menuSelect: 0
        }
    },
    props:{
        menu: true
    },
    created(){
        let route = parseInt(this.$route.query.menu)
        this.menuSelect = route
    }
}
</script>

<style lang="scss" scoped>
.content{
    width: 800px;
    padding: 0 1rem;
}

</style>