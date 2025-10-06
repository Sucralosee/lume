"use client"

import "./landing1.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Landing1 = () => {


     const [index, setIndex] = useState(0);
  const phrases = ["Color Theory", "Typography", "Layout Design"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);


    const bgPathsRef = useRef([]);
    const contentRef = useRef(null);
    const logoRef = useRef(null);
    const navLinksRef = useRef([]);
    
    bgPathsRef.current = [];
    navLinksRef.current = [];
    
    const addToBgPathsRef = (el) => {
        if (el && !bgPathsRef.current.includes(el)) {
            bgPathsRef.current.push(el);
        }
    };
    
    const addToNavLinksRef = (el) => {
        if (el && !navLinksRef.current.includes(el)) {
            navLinksRef.current.push(el);
        }
    };

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        
        gsap.set(bgPathsRef.current, { opacity: 0, scale: 0.8 });
        gsap.set(contentRef.current, { opacity: 0, y: 30 });
        gsap.set(logoRef.current, { opacity: 0, y: -20 });
        gsap.set(navLinksRef.current, { opacity: 0, y: -20 });
        
        bgPathsRef.current.forEach((path, index) => {
            tl.to(path, { 
                opacity: 1, 
                scale: 1, 
                duration: 0.4,
                ease: "power1.out",
                delay: index === 0 ? 0.3 : 0 
            }, index * 0.1);
        });
        
        tl.to(contentRef.current, { 
            opacity: 1, 
            y: 0, 
            duration: 0.8 
        }, "-=0.3"); 
        
        tl.to(logoRef.current, { 
            opacity: 1, 
            y: 0, 
            duration: 0.5 
        }, "-=0.4");
        
        navLinksRef.current.forEach((link, index) => {
            tl.to(link, { 
                opacity: 1, 
                y: 0, 
                duration: 0.6,
                ease: "back.out(1.7)"
            }, "-=0.15");
        });
        
        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div className="main-container lp-1-font">
            <nav className="lp-1-nav">
                <div className="lp-1-container">
                    <svg ref={logoRef} className="lp-1-logo" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 561 219">
                        <g id="Layer_6" data-name="Layer 6">
                            <path className="accent2" d="M456,114h0c58,0,105,47,105,105h-105v-105h0Z" transform="translate(1017 333) rotate(-180)"/>
                            <path className="accent2" d="M456,0h0C514,0,561,47,561,105h-105V0h0Z" transform="translate(456 561) rotate(-90)"/>
                            <path className="accent1" d="M105,114v105h-52.5c-29,0-52.5-23.5-52.5-52.5v-52.5h105Z"/>
                            <path className="accent1" d="M114,114h52.5c29,0,52.5,23.5,52.5,52.5h0c0,29-23.5,52.5-52.5,52.5h-52.5v-105h0Z"/>
                            <path className="secondaryColor" d="M228,114h52.5c29,0,52.5,23.5,52.5,52.5h0c0,29-23.5,52.5-52.5,52.5h-52.5v-105h0Z" transform="translate(114 447) rotate(-90)"/>
                            <path className="secondaryColor" d="M342,114h52.5c29,0,52.5,23.5,52.5,52.5h0c0,29-23.5,52.5-52.5,52.5h-52.5v-105h0Z" transform="translate(228 561) rotate(-90)"/>
                            <path className="secondaryColor" d="M114,0h52.5C195.5,0,219,23.5,219,52.5h0c0,29-23.5,52.5-52.5,52.5h-52.5V0h0Z" transform="translate(219 -114) rotate(90)"/>
                            <path className="accent1" d="M0,0h105v105h-52.5C23.5,105,0,81.5,0,52.5V0h0Z" transform="translate(105 0) rotate(90)"/>
                        </g>
                    </svg>
                    <div className="lp-1-links">
                        <p ref={addToNavLinksRef} className="lp-1-link lp-1-text">Our Services</p>
                        <p ref={addToNavLinksRef} className="lp-1-link lp-1-text">About Us</p>
                        <p ref={addToNavLinksRef} className="lp-1-link lp-1-text">Contact Us</p>
                    </div>
                </div>
            </nav>

            {/* <div className="lp-1-content" ref={contentRef}>
                <p className="lp-1-title lp-1-text">The Power of Color Theory</p>
                <p className="lp-1-button accent2 lp-1-text">Learn how it Impacts Web Design</p>
                <p className="lp-1-copy lp-1-text">Color is more than just aesthetics — it shapes emotions, guides user behaviour, and strengthens brand identity. The right colour palette can make your website more engaging, accessible, and memorable.</p>
            </div> */}

            <div className="lp-1-content" ref={contentRef}>
                <p className="lp-1-title lp-1-text">
                The Power of{" "}
                <span className="rotating-word accent2">{phrases[index]}</span>
                </p>
                <p className="lp-1-button accent2 lp-1-text">
                Learn how it Impacts Web Design
                </p>
                <p className="lp-1-copy lp-1-text">
                Color is more than just aesthetics — it shapes emotions, guides user
                behaviour, and strengthens brand identity. The right colour palette
                can make your website more engaging, accessible, and memorable.
                </p>
            </div>

            <div className="lp-1-bg-container">
                <svg className="lp-1-bg" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 561 447">
                    <g id="Layer_7" data-name="Layer 7">
                        <g>
                        <path ref={addToBgPathsRef} className="secondaryColor" d="M447,114v105h-52.5c-29,0-52.5-23.5-52.5-52.5v-52.5h105Z"/>
                        <path ref={addToBgPathsRef} className="accent2" d="M228,0h52.5C309.5,0,333,23.5,333,52.5h0c0,29-23.5,52.5-52.5,52.5h0c-29,0-52.5-23.5-52.5-52.5V0h0Z" transform="translate(561 105) rotate(180)"/>
                        <path ref={addToBgPathsRef} className="accent2" d="M0,114h52.5c29,0,52.5,23.5,52.5,52.5h0c0,29-23.5,52.5-52.5,52.5h0C23.5,219,0,195.5,0,166.5v-52.5H0Z" transform="translate(105 333) rotate(180)"/>
                        <path ref={addToBgPathsRef} className="accent1" d="M228,114h52.5c29,0,52.5,23.5,52.5,52.5h0c0,29-23.5,52.5-52.5,52.5h0c-29,0-52.5-23.5-52.5-52.5v-52.5h0Z" transform="translate(114 447) rotate(-90)"/>
                        <path ref={addToBgPathsRef} className="secondaryColor" d="M0,0h52.5C81.5,0,105,23.5,105,52.5h0c0,29-23.5,52.5-52.5,52.5H0V0H0Z" transform="translate(105 105) rotate(180)"/>
                        <path ref={addToBgPathsRef} className="secondaryColor" d="M456,114h52.5c29,0,52.5,23.5,52.5,52.5h0c0,29-23.5,52.5-52.5,52.5h-52.5v-105h0Z"/>
                        <path ref={addToBgPathsRef} className="secondaryColor" d="M114,114h52.5c29,0,52.5,23.5,52.5,52.5h0c0,29-23.5,52.5-52.5,52.5h-52.5v-105h0Z" transform="translate(333 0) rotate(90)"/>
                        <path ref={addToBgPathsRef} className="accent1" d="M228,228h0c58,0,105,47,105,105h-105v-105h0Z"/>
                        <path ref={addToBgPathsRef} className="accent1" d="M456,228h0c58,0,105,47,105,105h-105v-105h0Z" transform="translate(228 789) rotate(-90)"/>
                        <path ref={addToBgPathsRef} className="accent1" d="M456,342h0c58,0,105,47,105,105h-105v-105h0Z"/>
                        <path ref={addToBgPathsRef} className="secondaryColor" d="M342,0h105v105h-52.5c-29,0-52.5-23.5-52.5-52.5V0h0Z" transform="translate(447 -342) rotate(90)"/>
                        </g>
                    </g>
                </svg>
            </div>

        </div>
    )
}

export default Landing1;