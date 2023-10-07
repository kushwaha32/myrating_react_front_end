


import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../assets/css/navigation.css";
import NavLinkBluePrint from "./NavLInkBluePrint";
import SideStarBluePrint from './SideStarBluePrint';
import map from '../img/map.png';
import location from '../img/location-nav.png';
import navImg from '../img/eiffel-tower.png';
import vacation from '../img/vacations.png';
import religious from '../img/temple.png';

const Navigation = () => {
  const items = [
    { navImg: map, title: 'All Places', url: '/' },
    { navImg: location, title: 'tourist places', url: '/tourist-places' },
    { navImg: navImg, title: 'attractions', url: '/attractions' },
    { navImg: vacation, title: 'beaches', url: '/beaches' },
    { navImg: religious, title: 'religious places', url: '/religious-places' },
    // { navImg: city, title: 'city', url: '/city' },
    // { navImg: history, title: 'historical monuments', url: '/historical-monuments' },
    // { navImg: other, title: 'other', url: '/other' },
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 450,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: false,
    autoplaySpeed: 3000, 
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
    ],
  };

  return (
    <section className="navigation">
      <div className="star star-one">
        <SideStarBluePrint />
        <SideStarBluePrint />
        <SideStarBluePrint />
        <SideStarBluePrint />
        <SideStarBluePrint />
      </div>
      <div className="nav-slider">
        <Slider {...settings}>
          {items.map((item, index) => (
            <div className="item" key={index}>
              <NavLinkBluePrint navImg={item.navImg} title={item.title} url={item.url} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="star star-two">
        <SideStarBluePrint />
        <SideStarBluePrint />
        <SideStarBluePrint />
        <SideStarBluePrint />
        <SideStarBluePrint />
      </div>
    </section>
  );
};

export default Navigation;
