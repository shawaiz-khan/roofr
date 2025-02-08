/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface AuthContextType {
    user: any,
    token: string | null,
    login: (token: string) => void,
    logout: () => void,
}