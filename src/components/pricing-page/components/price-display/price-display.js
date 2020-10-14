import React from 'react';
import './price-display.css';

export default function PriceDisplay(props) {

  return (
    <div className="price-display">
      { (props.price === 0 || isNaN(props.price))
        ? <h1>Pricing Calculator</h1>
        : <h1>Print price is: ${props.price.toFixed(2)}</h1>
      }
    </div>
  );
}
