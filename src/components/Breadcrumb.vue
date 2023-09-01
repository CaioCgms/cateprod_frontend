<script setup lang="ts">
    var prop = defineProps({
        routes: []
    });
</script>

<template>
    <div class="container-fluid">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li :class="`breadcrumb-item ${route.active ? 'active' : '' }`" aria-current="page" v-for="(route, index) in routes"><a :href="`${route.path ? route.path : '#'}`">{{ route.name }}</a></li>
            </ol>
        </nav>
    </div>
</template>

<style scoped>
    .breadcrumb{
        padding: 1rem 0.5rem;
        margin: 1rem auto;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    }

    .breadcrumb a{
        text-decoration: none;
    }

    .breadcrumb .active a,
    .breadcrumb .active{
        color: #6c757d;
    }
</style>