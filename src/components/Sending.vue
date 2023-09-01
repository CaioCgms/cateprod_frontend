<template>
    <div class="window">
        <!-- Carregando -->
        <div class="spinner-border" role="status">
            <span class="sr-only"></span>
        </div>
        <span>Submetendo Dados</span>
    </div>
</template>

<style scoped>
    .window{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 5;
    }
</style>