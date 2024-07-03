<template>
    <div>
        <h2>Posts Publicados</h2>
        <div class="groupPost">
            <div class="post" v-for="item, i in listQueries" :key="i">
               <onePost :post="item" />
            </div>
        </div>
    </div>
</template>

<script>
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()

    export default {
        computed:{
            listQueries(){
                return appStore.readListQueries
            }
        }
    }
</script>

<style lang="scss" scoped>
.title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
}
.groupPost{
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.post{
    padding: 1rem;
    border: 1px solid grey;
    border-radius: 10px;
}
</style>