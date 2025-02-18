import { Experiences } from "@/data/experiences";

const ExperienceBlock: React.FC = () => {
    return (
        <div className="flex flex-col gap-7">
            {Experiences.map((experience, index) => (
                <div key={index} className="h-full flex flex-col">
                    <span className="p-3 border-l border-purple-primary">Step 0{index + 1}</span>
                    <div className="p-5 relative flex flex-col gap-3 rounded-r-lg rounded-b-lg half-border">
                        <h1 className="text-lg z-20">{experience.title}</h1>
                        <p className="text-sm text-gray-quaternary z-20">{experience.description}</p>
                        <span className="bg-gradient-to-br from-purple-primary via-black-primary to-black-primary opacity-30  w-16 h-16 absolute left-0 top-0"></span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ExperienceBlock;