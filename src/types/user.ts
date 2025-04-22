export interface User {
    sub: number;
    email: string;
    name: string;
    token: string;
}

export interface LoginCredentials {
    userName: string;
    password: string;
} 