export interface ModalItem {
  item: Product['products'],
  quantity: any,
}

export interface Product {
  products: {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: [string],
    quantity: number,
  }
}

export interface BasketItem {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: [string],
    quantity: any,
}

