import type CategoryInterface from "./CategoryInterface"

export default interface ProductInterface{
    name: String | null,
    updated: Date | null | undefined
    created: Date | null | undefined
    id: Number
    category_id: Number
    category: CategoryInterface | null | undefined
}