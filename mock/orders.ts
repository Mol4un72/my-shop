export type Order = {
    id: number,
    name: string,
    price: number,
    date: string,
    delivered: boolean,
}

export const orders: Order[] = [
    {
        id: 1,
        name: "order #1",
        price: 200,
        date: "15-10-2026",
        delivered: true,
    },
    {
        id: 2,
        name: "order #2",
        price: 200,
        date: "15-10-2026",
        delivered: false,
    },
    {
        id: 3,
        name: "order #3",
        price: 200,
        date: "15-10-2026",
        delivered: true,
    },
    {
        id: 4,
        name: "order #4",
        price: 200,
        date: "15-10-2026",
        delivered: true,
    },
]