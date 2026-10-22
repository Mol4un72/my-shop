type User = {
    id: number,
    name: string,
    surname: string,
    email: string,
    avatarURL?: string,
    adress: string,
}

export const users: User[] = [
    {
        id: 1,
        name: "Nazar",
        surname: "Tarasiuk",
        email: "gmail@gmail.com",
        adress: 'Kyiv, main street, 1',
    }
]