"use client";

import Button from "@/components/button/button";
import Image from "next/image";
import "@/app/page.module.css";

export default function Home() {
  const handleClick = () => {
    alert("Hello, World!");
  };

  return (
    <>
      <h1>Lume</h1>
      <Button onClick={handleClick}>Yes</Button>
    </>
  );
}