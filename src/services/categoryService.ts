import { getBaseRoute } from '@/helper/utils';
import {reactive} from 'vue';
import axios from 'axios';
import type CategoryInterface from '@/components/interfaces/CategoryInterface';

// Pega uma lista de categorias
export const getCategories = async (): Promise<Array<CategoryInterface>> => {
    const response = await axios.get(getBaseRoute() + '/categories', {validateStatus: function (status) {
        return status < 500;
    }});

    var categories : Array<any> = [];

    response?.data?.forEach((el : Object) => {
        categories.push(createCategoryObject(el));
    });

    return categories || [];
}

// Pega uma ategoria por id
export const getCategory = async (id : Number): Promise<CategoryInterface> => {
    const response = await axios.get(`${getBaseRoute()}/categories/${id}`, {validateStatus: function (status) {
        return status < 500;
    }});

    // Mostrar erro
    if (response?.status != 200) {
        alert('Error: ' + response?.data);
    }

    return createCategoryObject(response?.data) || null;
}

// Atualiza uma determinada categoria
export const updateCategory = async (category : CategoryInterface): Promise<CategoryInterface> => {
    const response = await axios.put(`${getBaseRoute()}/categories/${category.id}`, category, {validateStatus: function (status) {
        return status < 500;
    }});

    alert(response?.status)

    // Mostrar erro
    if (response?.status != 200) {
        alert('Error: ' + response?.data?.name);
    }

    return createCategoryObject(response?.data) || null;
}

// Armazena uma determinada categoria
export const storeCategory = async (category : CategoryInterface): Promise<CategoryInterface> => {
    const response = await axios.post(`${getBaseRoute()}/categories`, category, {validateStatus: function (status) {
        return status < 500;
    }});

    // Mostrar erro
    if (response?.status != 200 && response?.status != 201) {
        alert('Error: ' + response?.data?.name);
    }

    return createCategoryObject(response?.data) || null;
}

export const deleteCategory = async (id : Number): Promise<any> => {
    const response = await axios.delete(`${getBaseRoute()}/categories/${id}`, {validateStatus: function (status) {
        return status < 500;
    }});

    // Mostrar erro
    if (response?.status != 200) {
        alert('Error: ' + response?.data);
    }

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




