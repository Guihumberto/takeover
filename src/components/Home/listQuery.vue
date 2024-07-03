<template>
    <div>
        <addQuery />
        <div class="groupPost">
            <div class="post" v-for="post, i in listQueries" :key="i">
                <div v-if="idEdit == post.id">
                    <h3 class="mb-2">Editar Post</h3>
                    <v-text-field
                        label="Título"
                        variant="solo"
                        density="compact"
                        v-model="post.title"
                        focused
                    ></v-text-field>
                </div>
                <h3 v-else class="mb-2">{{post.title}}</h3>

                <div v-if="idEdit == post.id">
                    <v-autocomplete
                        v-model="posttags"
                        :disabled="isUpdating"
                        :items="listTags"
                        variant="outlined"
                        density="compact"
                        prepend-inner-icon="mdi-tag"
                        color="blue-grey-lighten-2"
                        item-title="tag_name"
                        item-value="tag_name"
                        label="Select"
                        class="mt-5"
                        clearable
                        chips
                        closable-chips
                        multiple
                        >
                        <template v-slot:chip="{ props, item }">
                            <v-chip
                            v-bind="props"
                            :text="item.raw.tag_name"
                            ></v-chip>
                        </template>

                        <template v-slot:item="{ props, item }">
                            <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.tag_name"
                            :title="item.raw.name"
                            ></v-list-item>
                        </template>
                    </v-autocomplete>
                    <textoAdd 
                        :texto="post.text" 
                        @insertNew="textrev = $event, editRegistro(post)" 
                        @cancel="idEdit = null" 
                    />
                </div>
                <div v-else>
                    <p v-html="post.text" class="postCode"></p>
                    <div class="my-5">
                        <v-chip class="mr-1 mb-1" v-for="tag, i in post.tags">{{ tag }}</v-chip>
                    </div>
                    <div class="d-flex justify-space-between align-baseline">
                        <small>{{ dateFormate(post.date_create) }} - {{ post.create_by }}</small>
                        <div class="d-flex">
                            <confirmarDialog :type="2" :idRemove="post.id" @excluir="removerPost($event)" />
                            <v-btn @click="idEdit = post.id, posttags = post.tags" class="mx-2" icon="mdi-pencil" variant="text"></v-btn>
                            <v-switch  hide-details @click="publicar(post)" v-model="post.publish" color="success" density="comfortable" label="Publicar"></v-switch>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()  

    export default {
        data(){
            return{
                posttags: [],
                idEdit: null,
                textrev: null,
                autoUpdate: true,
                isUpdating: false,
                name: 'Midnight Crew',
                title: 'The summer breeze',
                timeout: null,
            }
        },
        watch: {
            isUpdating (val) {
                clearTimeout(this.timeout)
                if (val) {
                this.timeout = setTimeout(() => (this.isUpdating = false), 3000)
                }
            },
        },
        computed:{
            listQueries(){
                return appStore.readListQueries.sort((a, b) => b.date_create - a.date_create)
            },
            listTags(){
                return appStore.readListTags
            }
        },
        methods:{
            dateFormate(item){
                return appStore.dateFormate(item)
            },
            removerPost(item){
                appStore.deleteQuery(item)
            },
            publicar(item){
                item.publish = !item.publish
                appStore.editQuery(item)
            },
            remove (item) {
                const index = this.post.tags.indexOf(item.name)
                if (index >= 0) this.post.tags.splice(index, 1)
            },
            editRegistro(item){
                item.tags = this.posttags
                item.text = this.textrev
                appStore.editQuery(item)
                this.idEdit = null
                this.posttags = []
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
    transition: 1s ease;
}
.post{
    padding: 1rem 1rem 0;
    border: 1px solid grey;
    border-radius: 10px;
    transition: 1s ease;
    animation: slideRight 1s ease forwards;
}
.post h3{
    font-size: 1.3rem;
}
</style>