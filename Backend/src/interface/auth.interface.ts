export interface LoginBody {
    username: string
    password: string
}

export interface TokenData {
    token: string
    expiresIn: string
}