import React from 'react'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

const RatingStar = ({value}) => {

    return (
        // <div className="rating">

            <Rating
                name="read-only"
                value={value}
                readOnly
            />

        // </div>
    )
}

// Rating.defaultProps = {
//     color: '#78c2ad'
// }

export default RatingStar;