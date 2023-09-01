export default interface CategoryInterface{
    name: String | null | undefined,
    updated: Date | null | undefined
    created: Date | null | undefined
    id: Number
    products: Array<ProductInterface> | null | undefined
}