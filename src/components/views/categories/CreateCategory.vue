<script setup lang="ts">
import type CategoryInterface from '@/components/interfaces/CategoryInterface';
import { storeCategory } from '@/services/categoryService';
import {ref,reactive} from 'vue';
import Breadcrumb from '@/components/Breadcrumb.vue';

var status = ref<'created' | 'error' | 'default'>('default');
var isLoading : boolean = false;
var categoryID : number = ref(1);

// BreadCrumbs
var routes = [
    {
        path: '/categories',
        name: 'Categorias'
    },
    {
        name: 'Criar Categoria',
        active: true
    }
];


const submitForm = (ev) => {
    status.value = 'default';

    var elements = ev.target.elements;
    
    if (elements.name.value.length > 2) {

        var category : CategoryInterface = {
            name: elements.name.value,
            updated: null,
            created: null,
            id: 0,
            products: []
        };

        storeCategory(category).then(res => {
            if (res.id != null && res.id != 0) {
                categoryID.value = res.id
                status.value = 'created'
                elements.name.value = '';
            } else {
                status.value = 'error'
            }
        });
    }

    return false;
}

</script>

<template>
    <Breadcrumb :routes="routes"></Breadcrumb>

    <div class="custom-form">

        <div class="alert alert-success" v-if="status == 'created'" role="alert">
            Sucesso ao criar Categoria <a :href="`/categories/${categoryID}/detalhes`">Ver categoria</a>
        </div>

        <div class="alert alert-danger" v-if="status == 'error'" role="alert">
            Erro ao criar Categoria
        </div>

        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="categoryName">Nome</label>
                <input type="text" name="name" class="form-control" id="categoryName" aria-describedby="categoryHelp" placeholder="informe um nome da categoria">
                <small id="categoryHelp" class="form-text text-muted">Lembre-se que o nome deve conter entre 3 e 128 caracteres e deve ser único.</small>
            </div>
            <div class="form-group mt-3 d-flex justify-content-end">
                <button type="submit" class="btn btn-primary">Cadastrar Categoria</button>
            </div>
        </form>
    </div>
</template>