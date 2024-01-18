import React from 'react';
import PropTypes from 'prop-types';

const Background = ({ imagePath }) => {
  const backgroundStyle = {
    backgroundImage: `url(${imagePath})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '60vh', 
    width: '100%', 
    position: 'relative',
    zIndex:1,
  };

  return <div style={backgroundStyle}></div>;
};

Background.propTypes = {
  imagePath: PropTypes.string.isRequired,
};

export default Background;