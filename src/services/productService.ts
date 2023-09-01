import { getBaseRoute } from '@/helper/utils';
import axios from 'axios';
import {reactive} from 'vue';
import type ProductInterface from '@/components/interfaces/ProductInterface';

// Pega uma lista de produtos
export const getProducts = async (query : String | null | undefined) => {
    const response = await axios.get(`${getBaseRoute()}/products${query}`);

    var products : Array<any> = [];

    response?.data?.forEach((el : Object) => {
        products.push(createProductObject(el));
    });

    return products || [];
}

// Pega uma produto por id
export const getProduct = async (id : Number) => {
    const response = await axios.get(`${getBaseRoute()}/products/${id}`, {validateStatus: function (status) {
        return status < 500;
    }});

    // Mostrar Erro
    if (response.status != 200) {
        alert(`Error: ${response.data}`);
    }

    return createProductObject(response?.data) || null;
}

// Atualiza um determinado produto
export const updateProduct = async (product : ProductInterface) => {
    const response = await axios.put(`${getBaseRoute()}/products/${product.id}`, product, {validateStatus: function (status) {
        return status < 500;
    }});

    // Mostrar Erro
    if (response.status != 200) {
        alert(`Error: ${response.data.name}`);
    }

    return createProductObject(response?.data) || null;
}

// Armazena um determinado produto
export const storeProduct = async (product : ProductInterface) => {
    const response = await axios.post(`${getBaseRoute()}/products`, product, {validateStatus: function (status) {
        return status < 500;
    }});

    // Mostrar Erro
    if (response.status != 200 && response.status != 201) {
        alert(`Error: ${response.data.name}`);
    }

    return createProductObject(response?.data) || null;
}

// Remove um determinado produto
export const deleteProduct = async (id : Number) => {
    const response = await axios.delete(`${getBaseRoute()}/products/${id}`, {validateStatus: function (status) {
        return status < 500;
    }});

    // Mostrar Erro
    if (response.status != 200) {
        alert(`Error: ${response.data}`);
    }
    

    return response?.data || null;
}

const createProductObject = (productRaw : any) => {

    return reactive<ProductInterface>({
        name: productRaw.name,
        id: productRaw.id,
        updated: productRaw.updated,
        created: productRaw.created,
        category_id: productRaw.category_id,
        category: productRaw.category
    });
}




