<script setup lang="ts">
import type CategoryInterface from '@/components/interfaces/CategoryInterface';
import { getCategory, storeCategory, updateCategory } from '@/services/categoryService';
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Loading from '@/components/Loading.vue';
import Sending from '@/components/Sending.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';

var status = ref<'updated' | 'error' | 'default'>('default');
var isLoaded = ref(false);
var isSubmiting = ref(false);
var categoryID : number = ref(1);

var data = reactive({
    category : {}
});

// BreadCrumbs
var routes = [
    {
        path: '/categories',
        name: 'Categorias'
    },
    {
        name: 'Editar Categoria',
        active: true
    }
];


// Carregar dados da categoria após montado
onMounted(() => {
    var id : Number = Number.parseInt(useRoute().params.id);

    getCategory(id).then((res : CategoryInterface) => {
        data.category = res;
        isLoaded.value = true;
    });
});

// Atualizar dados da categoria
const submitForm = (ev) => {
    status.value = 'default';
    isSubmiting.value = true;

    var elements = ev.target.elements;
    
    if (elements.name.value.length > 2) {

        updateCategory(data.category).then(res => {
            isSubmiting.value = false;
            if (res.id != null && res.id != 0) {
                categoryID.value = res.id
                status.value = 'updated'
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
    <Loading v-if="!isLoaded"></Loading>
    <Sending v-if="isSubmiting == true"></Sending>
    <Breadcrumb :routes="routes"></Breadcrumb>

    <div class="custom-form">
        <h3>Editar Categoria {{ data.category.name }} | ID: {{ data.category.id }}</h3>
        <div class="alert alert-success" v-if="status == 'updated'" role="alert">
            Sucesso ao editar Categoria <a :href="`/categories/${categoryID}/detalhes`">Ver categoria</a>
        </div>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="categoryName">Nome</label>
                <input type="text" name="name" class="form-control" id="categoryName" v-model="data.category.name" aria-describedby="categoryHelp" placeholder="informe um nome da categoria">
                <small id="categoryHelp" class="form-text text-muted">Lembre-se que o nome deve conter entre 3 e 128 caracteres e deve ser único.</small>
            </div>
            <div class="form-group mt-3 d-flex justify-content-end">
                <button type="submit" class="btn btn-primary">Atualizar Categoria</button>
            </div>
        </form>
    </div>
</template>