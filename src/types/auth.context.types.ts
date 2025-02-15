export default interface AuthContextType {
    accessToken: string;
    refreshToken: string;
    isLoggedIn: boolean;
    setAccessToken: (token: string) => void;
    setRefreshToken: (token: string) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}