<script setup lang="ts">
import CategoryInterface from '@/components/interfaces/CategoryInterface';
import type ProductInterface from '@/components/interfaces/ProductInterface';
import { getProduct, updateProduct } from '@/services/productService';
import { getCategories } from '@/services/categoryService';
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Breadcrumb from '@/components/Breadcrumb.vue';

var status = ref<'created' | 'error' | 'default'>('default');
var isLoaded  = ref(false);
var productID  = ref(1);
var categories = reactive<CategoryInterface>([]);

var data = reactive({
    product : {}
});

// BreadCrumbs
var routes = [
    {
        path: '/products',
        name: 'Produtos'
    },
    {
        name: 'Editar Produto',
        active: true
    }
];

onMounted(async () => {
    var id : Number = Number.parseInt(useRoute().params.id);

    // Carrega categorias para a seleção
    await getCategories().then((res : Array<CategoryInterface>) => {
        categories = res;
    });

    await getProduct(id).then((res : ProductInterface) => {
        data.product = res;
    });

    isLoaded.value = true;
});


// Submeter o produto
const submitForm = (ev) => {
    status.value = 'default';

    var elements = ev.target.elements;
    
    if (elements.name.value.length > 2) {

        updateProduct(data.product).then(res => {
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
            Sucesso ao editar Produto <a :href="`/products/${productID}/detalhes`">Ver Produto</a>
        </div>

        <div class="alert alert-danger" v-if="status == 'error'" role="alert">
            Houve uma falha ao editar produto
        </div>

        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="productName">Nome</label>
                <input type="text" name="name" class="form-control" id="productName" v-model="data.product.name" aria-describedby="productHelp" placeholder="informe um nome do produto">
                <small id="productHelp" class="form-text text-muted">Lembre-se que o nome deve conter entre 3 e 128 caracteres.</small>
            </div>
            <div class="form-group">
                <label for="productName">Category</label>
                <select name="category_id" v-model="data.product.category_id"  >
                    <option v-for="category in categories" v-bind:value="category.id" >{{ category.name }}</option>
                </select>
                <small id="productCategoryHelp" class="form-text text-muted">Selecione uma Categoria.</small>
            </div>
            <div class="form-group mt-3 d-flex justify-content-end">
                <button type="submit" class="btn btn-primary">Editar Produto</button>
            </div>
        </form>
    </div>
</template>