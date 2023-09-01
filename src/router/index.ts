import { createRouter, createWebHistory } from 'vue-router';

import ListCategories from '@/components/views/categories/ListCategories.vue';
import ViewCategory from '@/components/views/categories/ViewCategory.vue';
import EditCategory from '@/components/views/categories/EditCategory.vue';
import CreateCategory from '@/components/views/categories/CreateCategory.vue';

import ListProducts from '@/components/views/products/ListProducts.vue';
import CreateProduct from '@/components/views/products/CreateProduct.vue';
import EditProduct from '@/components/views/products/EditProduct.vue';
import ViewProduct from '@/components/views/products/ViewProduct.vue';

const router = createRouter({
    history: createWebHistory(),
    routes : [
        {
            path: '/',
            redirect: '/categories'
        },
        {
            path: '/categories',
            name: 'Categorias',
            component: ListCategories
        },
        {
            path: '/categories/:id/detalhes',
            name: 'Detalhes da Categoria',
            component: ViewCategory
        },
        {
            path: '/categories/:id/edit',
            name: 'Editar Categoria',
            component: EditCategory
        },
        {
            path: '/categories/create',
            name: 'Criar Categoria',
            component: CreateCategory
        },
        {
            path: '/products',
            name: 'Produtos',
            component: ListProducts
        },
        {
            path: '/products/create',
            name: 'Criar Produto',
            component: CreateProduct
        },
        {
            path: '/products/:id/detalhes',
            name: 'Detalhes do Produto',
            component: ViewProduct
        },
        {
            path: '/products/:id/edit',
            name: 'Editar Produto',
            component: EditProduct
        }
    ]
});

export default router;