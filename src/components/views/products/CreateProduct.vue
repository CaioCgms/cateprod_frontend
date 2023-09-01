<script setup lang="ts">
import CategoryInterface from '@/components/interfaces/CategoryInterface';
import type ProductInterface from '@/components/interfaces/ProductInterface';
import { storeProduct } from '@/services/productService';
import { getCategories } from '@/services/categoryService';
import { ref, reactive, onMounted } from 'vue';
import Breadcrumb from '@/components/Breadcrumb.vue';

var status = ref<'created' | 'error' | 'default'>('default');
var isLoaded  = ref(false);
var productID  = ref(1);
var categories = reactive<CategoryInterface>([]);

// BreadCrumbs
var routes = [
    {
        path: '/products',
        name: 'Produtos'
    },
    {
        name: 'Criar Produto',
        active: true
    }
];

onMounted(() => {
    getCategories().then((res : Array<CategoryInterface>) => {
        categories = res;
        isLoaded.value = true;
    });
});

// Submeter o produto
const submitForm = (ev) => {
    status.value = 'default';

    var elements = ev.target.elements;
    
    if (elements.name.value.length > 2) {

        var product : ProductInterface = {
            name: elements.name.value,
            updated: null,
            created: null,
            id: 0,
            category_id: elements.category_id.value
        };

        storeProduct(product).then(res => {
            if (res.id != null && res.id != 0) {
                productID.value = res.id
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

    <Loading v-if="isLoaded != true"></Loading>

    <Breadcrumb :routes="routes"></Breadcrumb>

    <div v-if="isLoaded == true" class="custom-form">
        <div class="alert alert-success" v-if="status == 'created'" role="alert">
            Sucesso ao criar Produto <a :href="`/products/${productID}/detalhes`">Ver Produto</a>
        </div>

        <div class="alert alert-danger" v-if="status == 'error'" role="alert">
            Houve uma falha ao criar produto
        </div>

        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="productName">Nome</label>
                <input type="text" name="name" class="form-control" id="productName" aria-describedby="productHelp" placeholder="informe um nome do produto">
                <small id="productHelp" class="form-text text-muted">Lembre-se que o nome deve conter entre 3 e 128 caracteres.</small>
            </div>
            <div class="form-group">
                <label for="productName">Category</label>
                <select name="category_id">
                    <option v-for="category in categories" v-bind:value="category.id" >{{ category.name }}</option>
                </select>
                <small id="productCategoryHelp" class="form-text text-muted">Selecione uma Categoria.</small>
            </div>
            <div class="form-group mt-3 d-flex justify-content-end">
                <button type="submit" class="btn btn-primary">Cadastrar Produto</button>
            </div>
        </form>
    </div>
</template>