"use client";

import { X } from "lucide-react";

export default function BundleModal({ bundle, onClose }: any) {
  if (!bundle) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-zinc-900 rounded-lg p-6 w-[400px] text-white relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white">
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4">{bundle.name}</h2>
        <p className="text-gray-400 mb-4">{bundle.description}</p>

        {bundle.agents.map((agent: any, i: number) => (
          <div key={i} className="flex justify-between items-center mb-3">
            <div>
              <p className="font-semibold">{agent.name}</p>
              <p className="text-sm text-gray-400">{agent.description}</p>
              <p className="text-yellow-400 text-sm">⭐ {agent.rating}</p>
            </div>
            <p className="font-bold">${agent.price}</p>
          </div>
        ))}

        <div className="mt-4 border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400 line-through">Individual Price: ${bundle.originalPrice}</p>
          <p className="font-bold text-lg">Bundle Price: ${bundle.bundlePrice}</p>
          <p className="text-green-400 text-sm">You Save: ${bundle.originalPrice - bundle.bundlePrice} ({bundle.discount}%)</p>
          <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 rounded-lg py-2 font-semibold">Purchase Bundle</button>
        </div>
      </div>
    </div>
  );
}
