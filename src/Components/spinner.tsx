import React from 'react';
import { CircularProgress } from '@material-ui/core';

const spinner = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        height: '90vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default spinner;
