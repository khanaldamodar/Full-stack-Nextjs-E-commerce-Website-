"use client";
import React from "react";

const Card = ({ label, value }) => (
  <div className="border-2 border-[#aec958] m-5  p-5 rounded-2xl flex flex-col justify-center items-start h-32">
    <p className="text-xl">
      {label}
      <span className="mt-3 block text-3xl font-bold">{value}</span>
    </p>
  </div>
);

export default Card;
