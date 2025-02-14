export interface UserType {
    name: string;
    email: string;
    phone: string;
    location: string;
    userType: string;
}

export interface UserContextType {
    user: UserType,
    setUser: (user: UserType) => void
}