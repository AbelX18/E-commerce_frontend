export type Product = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    description?: string;
    categoryId: number;
    category: Category;
};

export type Category = {
    id: number;
    name: string;
};

export type TicketItem = {
    productId: number;
    quantity: number;
    price: number;
    product: Pick<Product, 'id' | 'name' | 'image'>;
};

export type Ticket = {
    id: number;
    total: number;
    items: TicketItem[];
    status: 'Pending' | 'Paid' | 'Shipped';
};