"use client";
import './Instructions.css';

const Instructions = ({num , instruct}) => {

    return (
        <section className="instructions-container">
            {/* <p className="num">{num}.</p> */}
            <p className="instruct">{instruct}</p>
        </section>
    );
}

export default Instructions;
