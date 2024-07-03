<template>
    <v-card class="pa-2 mb-5 formAdd">
        <h3 class="d-flex align-center"> <v-icon class="mr-2">mdi-plus</v-icon>Adicionar Querys</h3>
        <v-form class="my-5" @submit.prevent="salvar()" ref="form">
            <v-text-field
                label="Título"
                variant="outlined"
                density="compact"
                placeholder="digite o título"
                v-model="post.title"
                :rules="[rules.required]"
                clearable
            >
            </v-text-field>
            
            <div ref="editor" class="editor-container"></div>

            <v-autocomplete
              v-model="post.tags"
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

            <div class="d-flex justify-space-between align-center">
                <v-btn class="mt-5" variant="text" @click="clear()">limpar</v-btn>
                <div class="d-flex justify-end align-center">
                    <v-switch  hide-details v-model="post.publish" class="pt-5 mr-5" label="Publicar" color="success"></v-switch>
                    <v-btn class="mt-5" color="success" type="submit">Salvar</v-btn>
                </div>
            </div>
        </v-form>
    </v-card>
</template>

<script>
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()  

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import Quill from 'quill'

    export default {
        data(){
            return{
                post:{
                    title: '',
                    text: '',
                    tags: '',
                    tags: [],
                    publish: false
                },
                quill: null,
                editor: 'null',
                rules:{
                    required: (value) => !!value || "Campo obrigatório",
                    mincpf: (v) => (v||'').length == 14 || "11 dígitos",
                    mindn: (v) => (v||'').length == 10 || "8 dígitos",
                },
                showInput: true,
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
            listTags(){
                return appStore.readListTags
            }
        },
        methods:{
            async salvar(){
                const { valid } = await this.$refs.form.validate()
                if(valid){
                    this.post.text = this.quill.root.innerHTML
                    await appStore.saveQuery(this.post)
                    this.clear()
                }
            },
            remove (item) {
                const index = this.post.tags.indexOf(item.name)
                if (index >= 0) this.post.tags.splice(index, 1)
            },
            clear(){
                this.post = {
                    title: '',
                    text: '',
                    tags: '',
                    tags: [],
                    publish: false
                }
                this.quill.root.innerHTML = ''
            }
        },
        mounted(){
            this.quill = new Quill(this.$refs.editor, {
                theme: 'snow', // 'snow' é um tema popular
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['blockquote'],  
                        ['code-block'],
                        ['bold', 'italic', 'underline'],
                        [{ 'color': [] }, { 'background': [] }], 
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link'],
                        [{ 'indent': '-1' }, { 'indent': '+1' }],   
                        ['clean']  
                    ],
                },
            });
        }
    }
</script>

<style lang="scss" scoped>
.editor-container {
    min-height: 200px; /* Defina a altura desejada */
}
.formAdd {
    transition: 1s ease;
    animation: slideRight 1s ease forwards;
}
</style>