<script setup lang="ts">
    import { onMounted, reactive } from 'vue';
    import { getCategory } from '../../../services/categoryService';
    import type CategoryInterface from '../../interfaces/CategoryInterface';
    import {useRoute} from "vue-router";

    var data = reactive({
        category : {}
    }); 

    onMounted(() => {
        var id : Number = Number.parseInt(useRoute().params.id);
        getCategory(id).then((res : CategoryInterface) => {
            data.category = res;
            console.log(res)
        });

    });

    
</script>

<template>
    <div class="pt-3">
        <div class="category d-flex flex-column items-center">
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
                <a :href="`categories/${data.category.id}/detalhes`" class="btn btn-warning">Editar</a>
                <a :href="`categories/${data.category.id}/detalhes`" class="btn btn-danger">Excluir</a>
            </div>
        </div>
    </div>
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