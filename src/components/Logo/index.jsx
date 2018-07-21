
import React from 'react';
import Img from 'components/Img';
const logoSource = require("../../assets/img/apple-icon.png");
function Logo(props){
	
	return (
		<div>
			<Img src={logoSource}  alt="logo" {...props} />
		</div>
	)
}

export default Logo;