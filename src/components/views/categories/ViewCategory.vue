<script setup lang="ts">
    import { onMounted, reactive, ref } from 'vue';
    import { getCategory, deleteCategory } from '@/services/categoryService';
    import type CategoryInterface from '@/components/interfaces/CategoryInterface';
    import {useRoute} from "vue-router";
    import ModalDeleteConfirmVue from '@/components/ModalDeleteConfirm.vue';
    import Loading from '@/components/Loading.vue';
    import Breadcrumb from '@/components/Breadcrumb.vue';

    var isLoaded = ref(false);
    var showModal = ref(false);
    var statusMsg = ref('');

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
            name: 'Ver Categoria',
            active: true
        }
    ];


    onMounted(() => {
        var id : Number = Number.parseInt(useRoute().params.id);
        getCategory(id).then((res : CategoryInterface) => {
            data.category = res;
            isLoaded.value = true;
        });
    });

    // Remover Categoria
    const removeCategory = () => {
        showModal.value = true;
    }

    // Confirmar Remover Categoria
    const removeCategoryConfirm = () => {
        isLoaded.value = false;
        deleteCategory(data.category.id).then((res) => {
            statusMsg = res;
            isLoaded.value = true;
        });
        showModal.value = false;
    }

    // Cancelar Remoção
    const removeCategoryCancel = () => {
        showModal.value = false;  
    }
   
</script>

<template>
    <Loading v-if="isLoaded != true"></Loading>
    <Breadcrumb :routes="routes"></Breadcrumb>

    <div class="pt-3">

        <div class="alert alert-light" v-if="statusMsg != ''" role="alert">
            {{ statusMsg }}
        </div>

        <div class="viewer d-flex flex-column items-center">
            <h1>{{data.category.name}}</h1>
            <div class="details flex-column d-flex flex-center justify-around items-center">
                <div class="d">
                    <b>Criado em</b>: <span class="mr-2">{{data.category.created}}</span>
                </div>
                <div class="d">
                    <b>Atualizado em</b>: <span class="mr-2">{{data.category.updated}}</span>
                </div>
                <div class="d">
                    <b>ID</b>: <span>{{data.category.id}}</span>
                </div>
            </div>
            <div class="btns">
                <a :href="`/categories/${data.category.id}/edit`" class="btn btn-warning">Editar</a>
                <a @click="removeCategory" class="btn btn-danger">Excluir</a>
            </div>
        </div>
    </div>

    <!-- Confirmar exclusao -->
    <ModalDeleteConfirmVue
        v-if="showModal != false"
        @handlerConfirm="removeCategoryConfirm"
        @handlerClose="removeCategoryCancel"
        title="Excluir Categoria"
        description="Você realmente deseja excluir esta categoria? O processo não poderá ser desfeito!"
    />
</template>

<style scoped>
    .details{
        margin-top: 1rem;
    }

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