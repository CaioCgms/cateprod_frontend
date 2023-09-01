<script setup lang="ts">
    const props = defineProps({
        title: String,
        description: String,
        handlerConfirm: Function,
        handlerClose: Function
    });
</script>

<template>
    <div class="modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ props.title }}</h5>
                    <button type="button" class="close btn" data-dismiss="modal"  @click="handlerClose" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>{{ props.description }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" @click="$emit('handlerConfirm')">Excluir</button>
                    <button type="button" class="btn btn-light"  @click="$emit('handlerClose')" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .modal{
        display: flex;
    }
</style>

