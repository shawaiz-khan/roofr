export interface UserType {
    _id: string;
    name: string;
    location: string;
    userType: string;
}

export interface UserContextType {
    user: UserType,
    setUser: (user: UserType) => void
}