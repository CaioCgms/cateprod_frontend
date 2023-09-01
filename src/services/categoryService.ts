import { getBaseRoute } from '@/helper/utils';
import {reactive} from 'vue';
import axios from 'axios';
import type CategoryInterface from '@/components/interfaces/CategoryInterface';

// Pega uma lista de categorias
export const getCategories = async (): Promise<Array<CategoryInterface>> => {
    const response = await axios.get(getBaseRoute() + '/categories');

    var categories : Array<any> = [];

    response?.data?.forEach((el : Object) => {
        categories.push(createCategoryObject(el));
    });

    return categories || [];
}

// Pega uma ategoria por id
export const getCategory = async (id : Number): Promise<CategoryInterface> => {
    const response = await axios.get(`${getBaseRoute()}/categories/${id}`);
    return createCategoryObject(response?.data) || null;
}

// Atualiza uma determinada categoria
export const updateCategory = async (category : CategoryInterface): Promise<CategoryInterface> => {
    const response = await axios.put(`${getBaseRoute()}/categories/${category.id}`, category);
    return createCategoryObject(response?.data) || null;
}

// Armazena uma determinada categoria
export const storeCategory = async (category : CategoryInterface): Promise<CategoryInterface> => {
    const response = await axios.post(`${getBaseRoute()}/categories`, category);
    return createCategoryObject(response?.data) || null;
}

export const deleteCategory = async (id : Number): Promise<boolean> => {
    const response = await axios.delete(`${getBaseRoute()}/categories/${id}`);
    return response?.data || false;
}

const createCategoryObject = (categoryRaw : any) => {
    return reactive<CategoryInterface>(
        {
            name: categoryRaw.name,
            id: categoryRaw.id,
            updated: categoryRaw.updated,
            created: categoryRaw.created,
            products: []
        }
    );
}




