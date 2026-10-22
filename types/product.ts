export interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
    availability?: string;
    producer?: string;
    imageUrl: string;
}