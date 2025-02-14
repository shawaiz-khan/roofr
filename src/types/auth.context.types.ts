export default interface AuthContextType {
    accessToken: string;
    refreshToken: string;
    setAccessToken: (token: string) => void;
    setRefreshToken: (token: string) => void;
}