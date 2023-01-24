import React from 'react';

const TestiMonialsDetails = ({testiMonialDetail}) => {
    const {small_name, name, description, price, score, img} = testiMonialDetail;
    console.log("testiMonialDetail"+testiMonialDetail)
    return (
        <div className="item">
            <div className="box_grid">
                <figure>
                    <a href="/" className="wish_bt"></a>
                    <a href="tour-detail.html"><img src={img} className="img-fluid" alt="" width="800" height="533" /><div className="read_more"><span>Read more</span></div></a>
                    <small>{small_name}</small>
                </figure>
                <div className="wrapper">
                    <h3><a href="tour-detail.html">{name}</a></h3>
                    <p>{description}</p>
                    <span className="price">From <strong>{price}</strong> /per person</span>
                </div>
                <ul>
                    <li><i className="icon_clock_alt"></i> 1h 30min</li>
                    <li><div className="score"><span>Superb<em>350 Reviews</em></span><strong>{score}</strong></div></li>
                </ul>
            </div>
        </div>
    );
};

export default TestiMonialsDetails;