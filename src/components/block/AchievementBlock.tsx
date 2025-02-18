import { Achievements } from "@/data/achievements";

const AchievementBlock: React.FC = () => {
    return (
        <div className="w-full grid grid-cols-1 gap-5">
            {Achievements.map((achievement) => (
                <div
                    className="bg-black-primary px-5 py-7 flex flex-col rounded-md gap-3 shadow-[0_0_10px_#262626]"
                    key={achievement.text}
                >
                    <h1 className="text-xl font-semibold">{achievement.text}</h1>
                    <p className="text-sm text-gray-quaternary">{achievement.description}</p>
                </div>
            ))}
        </div>
    );
}

export default AchievementBlock;