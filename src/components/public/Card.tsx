// Card.js
interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const Card = ({ title, description, icon }: CardProps) => {
  return (
    <div className="flex flex-col items-center p-4 transition duration-300 transform bg-white rounded-lg shadow-lg cursor-pointer hover:scale-105 active:scale-95">
      {icon}
      <h3 className="mt-4 text-xl font-semibold text-center text-gray-800">
        {title}
      </h3>
      <p className="mt-2 text-center text-gray-600">{description}</p>
    </div>
  );
};
