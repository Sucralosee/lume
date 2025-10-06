"use client";

import Button from "../components/buttonComp/button";
import "../app/page.module.css";
import ControlPanel from "../components/controlPanelComp/ControlPanel";
import Landing1 from "../components/Landing1Comp/landing1";

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