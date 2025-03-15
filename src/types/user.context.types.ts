export interface UserType {
    name: string;
    location: string;
    userType: string;
}

export interface UserContextType {
    user: UserType,
    setUser: (user: UserType) => void
}