"use client";

import Button from "@/components/button/button";
import "@/app/page.module.css";
import ControlPanel from "@/components/controlPanel/ControlPanel";
import Landing1 from "@/components/Landing1/landing1";

export default function Home() {


  return (
    <>
      <div className="lume-container">
        <Landing1 />
        <ControlPanel></ControlPanel>

      </div>
    </>
  );
}