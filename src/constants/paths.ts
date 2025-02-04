interface NavItemProps {
    name: string,
    path: string,
}

const navItems: NavItemProps[] = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Properties", path: "/properties" },
    { name: "Services", path: "/services" }
];

export default navItems;