<script setup lang="ts">
    import { onMounted, reactive, ref } from 'vue';
    import { getProduct, deleteProduct } from '@/services/productService';
    import type ProductInterface from '@/components/interfaces/ProductInterface';
    import {useRoute} from "vue-router";
    import ModalDeleteConfirmVue from '@/components/ModalDeleteConfirm.vue';
    import Loading from '@/components/Loading.vue';

    var isLoaded = ref(false);
    var showModal = ref(false);
    var statusMsg = ref('');

    var data = reactive({
        product : {}
    });

    // BreadCrumbs
    var routes = [
        {
            path: 'products',
            name: 'Produtos'
        },
        {
            name: 'Ver Produto',
            active: true
        }
    ];

    onMounted(() => {
        var id : Number = Number.parseInt(useRoute().params.id);
        getProduct(id).then((res : ProductInterface) => {
            data.product = res;
            isLoaded.value = true;
        });
    });

    // Remover Produto
    const removeProduct = () => {
        showModal.value = true;
    }

    // Confirmar Remoção do Produto
    const removeProductConfirm = () => {
        isLoaded.value = false;
        deleteProduct(data.product.id).then((res) => {
            statusMsg = res;
            isLoaded.value = true;
        });
        showModal.value = false;
    }

    // Cancelar Remoção
    const removeProductCancel = () => {
        showModal.value = false;  
    }
   
</script>

<template>
    <Loading v-if="isLoaded != true"></Loading>

    <div class="pt-3">

        <div class="alert alert-light" v-if="statusMsg != ''" role="alert">
            {{ statusMsg }}
        </div>

        <div class="viewer d-flex flex-column items-center">
            <h1>{{data.product.name}}</h1>
            <div class="details flex-column d-flex flex-center justify-around items-center">
                <div class="d">
                    <b>Ccategoria</b>: <a :href="`/categories/${data.product.category_id}/detalhes`" class="mr-2">{{data.product.category?.name}}</a>
                </div>
                <div class="d">
                    <b>Criado em</b>: <span class="mr-2">{{data.product.created}}</span>
                </div>
                <div class="d">
                    <b>Atualizado em</b>: <span class="mr-2">{{data.product.updated}}</span>
                </div>
                <div class="d">
                    <b>ID</b>: <span>{{data.product.id}}</span>
                </div>
            </div>
            <div class="btns">
                <a :href="`/products/${data.product.id}/edit`" class="btn btn-warning">Editar</a>
                <a @click="removeProduct" class="btn btn-danger">Excluir</a>
            </div>
        </div>
    </div>

    <!-- Confirmar exclusao -->
    <ModalDeleteConfirmVue
        v-if="showModal != false"
        @handlerConfirm="removeProductConfirm"
        @handlerClose="removeProductCancel"
        title="Excluir Produto"
        description="Você realmente deseja excluir este produto? O processo não poderá ser desfeito!"
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