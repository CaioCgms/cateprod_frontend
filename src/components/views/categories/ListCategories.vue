<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { getCategories } from '../../../services/categoryService';
import type CategoryInterface from '../../interfaces/CategoryInterface';
import Breadcrumb from '@/components/Breadcrumb.vue';
import Loading from '@/components/Loading.vue';

var isLoaded = ref(false);
var data = reactive({
    categories : Array<CategoryInterface>
});

// BreadCrumbs
var routes = [
    {
        path: '/categories',
        name: 'Categorias',
        active: true
    },
];


onMounted(() => {

    getCategories().then((res : Array<CategoryInterface>) => {
        data.categories = res;
        isLoaded.value = true;
    });

});

    
</script>

<template>

    <Breadcrumb :routes="routes"></Breadcrumb>
    <Loading v-if="isLoaded != true"></Loading>

    <div class="pt-3 d-flex flex-row items-center justify-content-end">
        <a :href="`/categories/create`" class="btn btn-primary">Nova Categoria</a>
    </div>
    <div class="pt-3">
        <ul class="list-group" v-for="(category, index) in data.categories">
            <li class="list-group-item mb-2">
                <div class="category d-flex flex-row items-center">
                    <div class="details  d-flex flex-center justify-around items-center">
                        <div class="d">
                            <b>Categoria</b>: <span class="mr-2">{{category.name}}</span>
                        </div>
                        <div class="d">
                            <b>Criado em</b>: <span class="mr-2">{{category.created}}</span>
                        </div>
                        <div class="d">
                            <b>Atualizado em</b>: <span class="mr-2">{{category.updated}}</span>
                        </div>
                        <div class="d">
                            <b>ID</b>: <span>{{category.id}}</span>
                        </div>
                    </div>
                    <div class="btns">
                        <a :href="`/products/?byCategory=${category.id}`" class="btn btn-light">Ver Produtos</a>
                        <a :href="`/categories/${category.id}/detalhes`" class="btn btn-primary">Ver Detalhes</a>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    .details .d{
        padding: 0.4rem 0.8rem;
    }

    .btns{
        margin-left: auto;
    }

    .btns .btn{
        margin: 0.3rem 0.3rem;
    }
</style>
