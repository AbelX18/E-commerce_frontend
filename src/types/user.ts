export interface User {
    id: number;
    email: string;
    name: string;
    token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
} 