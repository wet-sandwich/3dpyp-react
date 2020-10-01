import React from 'react';

export default function CardSelect(props) {
  return (
    <section>
      { props.cards.length !== 0
        ? <div className="row">
        { props.cards }
        </div>
        : <div className="text-center">
          <h4>No matches found.</h4>
        </div>
      }
    </section>
  );
}
