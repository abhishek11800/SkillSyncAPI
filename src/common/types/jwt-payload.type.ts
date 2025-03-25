export type JwtPayload = {
    name: string;
    email: string;
    role: string;
    iat ?: number;
    exp ?: number;
}
