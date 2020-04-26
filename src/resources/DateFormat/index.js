import React from 'react';

function format(value){
    return String(value);
}


const DateFormat = ({date}) => (
    <i>{format(date)}</i>
);

export default DateFormat;