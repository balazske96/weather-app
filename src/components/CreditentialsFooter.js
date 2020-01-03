import React from 'react';
export default function CreditentialsFooter(props) {


    const onClick = (event) => {
        event.preventDefault();
        window.location.href += 'creditentials';
    }


    return (
        <div className='creditentials-footer corner' onClick={onClick}>Credits</div>
    )
}
