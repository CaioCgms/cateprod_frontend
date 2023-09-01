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
    const response = await axios.get(`${getBaseRoute()}/products/${id}`);
    return createProductObject(response?.data) || null;
}

// Atualiza um determinado produto
export const updateProduct = async (product : ProductInterface) => {
    const response = await axios.put(`${getBaseRoute()}/products/${product.id}`, product);
    return createProductObject(response?.data) || null;
}

// Armazena um determinado produto
export const storeProduct = async (product : ProductInterface) => {
    const response = await axios.post(`${getBaseRoute()}/products`, product);
    return createProductObject(response?.data) || null;
}

// Remove um determinado produto
export const deleteProduct = async (id : Number) => {
    const response = await axios.delete(`${getBaseRoute()}/products/${id}`);
    return response?.data || null;
}

const createProductObject = (productRaw : any) => {

    console.log(productRaw)

    return reactive<ProductInterface>({
        name: productRaw.name,
        id: productRaw.id,
        updated: productRaw.updated,
        created: productRaw.created,
        category_id: productRaw.category_id,
        category: productRaw.category
    });
}




