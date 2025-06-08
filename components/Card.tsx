import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  icon: string;
  rating?: number;
  gradient?: boolean;
  dark?: boolean;
  bgColor?: string;     // ✅ Custom background color
  textColor?: string;   // ✅ Custom text color
}

const Card: React.FC<CardProps> = ({
  title,
  icon,
  rating,
  gradient,
  dark,
  bgColor,
  textColor,
}) => {
  const defaultClasses =
    "rounded-xl p-6 cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg";

  const colorClasses = gradient
    ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white"
    : dark
    ? "bg-zinc-800 text-white"
    : bgColor
    ? `${bgColor} ${textColor || "text-white"}`
    : "bg-white text-black";

  return (
    <div className={cn(defaultClasses, colorClasses)}>
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {rating && (
        <p className="text-sm mt-1 text-gray-300">⭐ {rating.toFixed(1)}</p>
      )}
    </div>
  );
};

export default Card;
