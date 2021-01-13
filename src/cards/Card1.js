import React from 'react';

export function Card1() {
    return (
        <div >
            <img id="img" src={require("../images/nadeeem.jpeg")} alt="nadeem" style={{ width: '100%' }} />
            <h1>Nadeem Bokaee</h1>
            <p className="title">Software Practical Engineer <strong>AND </strong>
                 FullStack Web Developer</p>
            <p>INT College <strong>AND</strong> Technion University</p>
            <div className="allIcons" style={{ margin: '26px 0' }}>
                <a href="#"><i className="fa fa-dribbble"></i></a>
                <a href="#"><i className="fa fa-twitter"></i></a>
                <a href="http://linkedin.com/in/nadeem-bokaee-98051a170"><i className="fa fa-linkedin" ></i></a>
                <a href="https://www.facebook.com/na.d.mu.12/"><i className="fa fa-facebook"></i></a>
            </div>
            <p><a href="tel:0527441563"><button>Contact</button></a></p>
        </div>
    );
}