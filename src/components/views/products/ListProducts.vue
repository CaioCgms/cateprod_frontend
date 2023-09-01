<script setup lang="ts">
    import { onMounted, reactive } from 'vue';
    import {getProducts} from '../../../services/productService';
    import type ProductInterface from '../../interfaces/ProductInterface';
    
    var data = reactive({
        products : Array<ProductInterface>
    }); 

    onMounted(() => {

        getProducts().then((res : Array<ProductInterface>) => {
            data.products = res;
        });

    });

    
</script>

<template>
    <div class="pt-3">
        <ul class="list-group" v-for="(product, index) in data.products">
            <li class="list-group-item mb-2">
                <div class="category d-flex flex-row items-center">
                    <div class="details  d-flex flex-center justify-around items-center">
                        <div class="d">
                            <b>Nome</b>: <span class="mr-2">{{product.name}}</span>
                        </div>
                        <div class="d">
                            <b>Categoria</b>: <span class="mr-2">{{product?.category?.name}}</span>
                        </div>
                        <div class="d">
                            <b>Criado em</b>: <span class="mr-2">{{product.created}}</span>
                        </div>
                        <div class="d">
                            <b>Atualizado em</b>: <span class="mr-2">{{product.updated}}</span>
                        </div>
                        <div class="d">
                            <b>ID</b>: <span>{{product.id}}</span>
                        </div>
                    </div>
                    <div class="btns">
                        <a :href="`products/${product.id}/detalhes`" class="btn btn-primary">Ver Detalhes</a>
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
</style>
