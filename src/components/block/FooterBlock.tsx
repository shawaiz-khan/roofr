import FooterBlockTypes from "@/types/footer.types";

const FooterBlock: React.FC<FooterBlockTypes> = ({ title, children }) => {
    return (
        <div className="flex flex-col gap-3 items-start justify-start w-full pb-4 border-b border-black-tertiary md:border-none ${className}">
            <h1 className="text-gray-quaternary text-lg">{title}</h1>
            <ul className="flex flex-col gap-2">{children}</ul>
        </div>
    );
};

export default FooterBlock;