import React from 'react';

export function Card2() {
    return (
        <div>
            <img id="img" src={require("../images/ofer.jpeg")} alt="ofer" style={{ width: '100%' }} />
            <h1>Ofer Bakria</h1>
            <p className="title">Software Practical Engineer <strong>AND </strong>
                 FullStack Web Developer</p>
            <p>INT College <strong>AND</strong> Tel Hai College</p>
            <div className="allIcons" style={{ margin: '26px 0' }}>
                <a href="#"><i className="fa fa-dribbble"></i></a>
                <a href="#"><i className="fa fa-twitter"></i></a>
                <a href="http://linkedin.com/in/ofer-bakriia"><i className="fa fa-linkedin"></i></a>
                <a href="https://www.facebook.com/seat.cobra1"><i className="fa fa-facebook"></i></a>
            </div>
            <p><a href="tel:0543494678"><button>Contact</button></a></p>
        </div>
    );
}
