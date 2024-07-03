<template>
    <div class="postOne">
        <h2>{{ post.title }}</h2>
        <div class="d-flex justify-end">
            <v-tooltip text="Copiar o código">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" @click.stop="copyCode()" variant="text" :icon="copy ? 'mdi-check' : 'mdi-content-copy'"></v-btn>
                </template>
            </v-tooltip>
            <v-tooltip text="Executar o código">
                <template v-slot:activator="{ props }">
                    <v-btn :loading="load" v-bind="props" @click.stop="executeCode()" variant="text" icon="mdi-play"></v-btn>
                </template>
            </v-tooltip>
        </div>
        <div v-html="post.text" class="postCode"></div>
        <div class="my-5">
            <v-chip class="mr-1 mb-1" v-for="tag, i in post.tags">tags {{ tag }}</v-chip>
        </div>
        <div class="d-flex justify-space-between">
            <small>{{ dateFormate(post.date_create) }} - {{ post.create_by }}</small>
            <small>Criar a partir de</small>
        </div>
    </div>
</template>

<script>
    import { useAppStore } from '@/stores/app'
    const appStore = useAppStore()

    export default {
        data(){
            return{
                copy: false,
                load: false
            }
        },
        props:{
            post: Object
        },
        methods:{
            copyCode(){
                this.copy = !this.copy
                let htmlString = this.post.text

                let parser = new DOMParser();
                let doc = parser.parseFromString(htmlString, 'text/html');

                let codeBlock = doc.querySelector('div.ql-code-block');

                if (codeBlock) {
                    let textToCopy = codeBlock.textContent;

                    // Função para copiar texto para a área de transferência
                    function copyToClipboard(text) {
                        let textArea = document.createElement("textarea");
                        textArea.value = text;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                    }

                    // Copiar o texto extraído para a área de transferência
                    copyToClipboard(textToCopy);
                    console.log("Texto copiado para a área de transferência: ", textToCopy);
                } else {
                    console.log("Nenhuma div com a classe 'ql-code-block' foi encontrada.");
                }
            },
            executeCode(){
                this.load = true
                let htmlString = this.post.text

                let parser = new DOMParser();
                let doc = parser.parseFromString(htmlString, 'text/html');

                let codeBlock = doc.querySelector('div.ql-code-block');

                if (codeBlock) {
                    let textToCopy = codeBlock.textContent;

                    // Função para copiar texto para a área de transferência
                    function copyToClipboard(text) {
                        let textArea = document.createElement("textarea");
                        textArea.value = text;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                    }

                    // Copiar o texto extraído para a área de transferência
                    copyToClipboard(textToCopy);
                    console.log("Texto copiado para a área de transferência: ", textToCopy);
                } else {
                    console.log("Nenhuma div com a classe 'ql-code-block' foi encontrada.");
                }
                this.load = false
            },
            dateFormate(item){
                return appStore.dateFormate(item)
            }
        }
    }
</script>

<style>
.postOne{
    animation: slideRight 1s ease forwards;
}
.ql-code-block {
    font-family: 'Courier New', Courier, monospace;
    border: 1px solid #ccc;
    background-color: #272525;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow-x: auto;
    margin: 1rem 0;
}
</style>