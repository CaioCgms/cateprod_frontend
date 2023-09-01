<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { computed } from 'vue';
</script>
<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/categories">Categorias</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/products">Produtos</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>