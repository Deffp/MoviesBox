import React from 'react';

import './Footer.css';

export const Footer = () => {
  return (
    <div className="row Footer">
      <div className="col-xl-6 col-sm-1 wrapperFoterLogo">
        <span className="footerLogo">ThemovieBox</span>
      </div>
      <div className="col-xl-6 col-sm-1 otherInformation">
        <span className="info col">About</span>
        <span className="info col">Movies</span>
        <span className="info col">Ratings</span>
        <span className="info col">Contact</span>
      </div>
    </div>
  );
};
