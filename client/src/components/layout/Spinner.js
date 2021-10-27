import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = ({ style }) => {
  return (
    <Fragment>
      <img
        src={spinner}
        alt="Loading..."
        style={{
          width: '200px',
          margin: 'auto',
          display: 'block',
          ...style,
        }}
      />
    </Fragment>
  );
};

export default Spinner;
