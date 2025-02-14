export interface UserType {
    name: string;
    email: string;
    phone: string;
    location: string;
    userType: string;
}

export default interface AuthContextType {
    accessToken: string;
    refreshToken: string;
    user: UserType;
    setAccessToken: (token: string) => void;
    setRefreshToken: (token: string) => void;
    setUser: (data: UserType) => void;
}