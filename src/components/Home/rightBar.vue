<template>
    <v-card class="bar">
        Menu
    </v-card>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.bar{
    padding: 1rem;
    width: 200px;
    height: 500px;
}
@media (max-width: 1000px) {
    .bar{
        display: none;
    }
}
</style>