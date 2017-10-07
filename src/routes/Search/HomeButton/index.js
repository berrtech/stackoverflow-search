import React from 'react';

import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

const HomeButton = ({onClick}) => {
  return (
    <IconButton>
      <ActionHome onClick={onClick}/>
    </IconButton>  
  );
};



export default HomeButton;