import React from 'react';

const Loading = ({loading}) => {
    if(loading===true) {
        return ( 
            <div className="center-a w-100">
      <div className="ring" />
      <span>
        <img src="images/logoa.png" width={150} alt />
      </span>
    </div>
         );
    }else{
        return null
    }
}
 
export default Loading;