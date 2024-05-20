import React from "react";
import { useUserStore } from "../stores/user";

function HeroComponent() {
  const user = useUserStore((state) => state.user);
  return (
    <div className="relative bg-gray-100 h-screen flex items-center justify-center bg-bg bg-center bg-cover">
      <div className="relative z-10 text-center px-4 md:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-black">
          OSRBrewery
        </h1>
        <p className="mt-4 text-lg md:text-xl text-black max-w-lg mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        {user ? (
          <button className="mt-8 px-6 py-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition duration-300">
            Home
          </button>
        ) : (
          <button className="mt-8 px-6 py-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition duration-300">
            Sign up
          </button>
        )}
      </div>
    </div>
  );
}

export default HeroComponent;
