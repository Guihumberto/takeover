<template>
    <section>
        <div class="container">
            <leftBar class="menuLista"  @menuSelect="menuSelect = $event" />
            <mainList :menu="menuSelect"/>
            <rightBar />
        </div>
    </section>
</template>

<script>
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()

    export default {
        data(){
            return{
                menuSelect: 1
            }
        },
        created(){
            let route = parseInt(this.$route.query.menu)
            this.menuSelect = route
            appStore.cargaTags()
            appStore.cargaQueries()
        }
    }
</script>

<style lang="scss" scoped>
.container{
    display: flex;
    justify-content: flex-end;
}
.menuLista{
    position: sticky;
    top: 2rem;
    height: 90vh;
}
</style>