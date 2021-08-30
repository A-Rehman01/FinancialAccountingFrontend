import React, { useEffect, useState } from 'react';

const OwnerCapital = ({
  incomeSummary,
  incomeSummayValue,
  EquityValue,
  setEquityValue,
}) => {
  const [ownerCapital, setOwnerCapital] = useState({});
  const [OwnerWithdrew, setOwnerWithdrew] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setOwnerCapital(
      incomeSummary.find((c) => {
        if (c.head === 'Owner Capital') {
          return c;
        }
      })
    );
    setOwnerWithdrew(
      incomeSummary.find((c) => {
        if (c.head === 'Owner Withdraw') {
          return c;
        }
      })
    );

    let val =
      (ownerCapital?.difference ? ownerCapital?.difference : 0) +
      incomeSummayValue;
    console.log(
      ownerCapital?.difference ? ownerCapital?.difference : 0,
      incomeSummayValue
    );
    console.log(val);
    val = val - (OwnerWithdrew?.difference ? OwnerWithdrew?.difference : 0);
    setEquityValue(Math.abs(val));
  }, [incomeSummary, visible]);

  return (
    <div style={{ color: 'red', width: '98%' }}>
      <button
        style={{ padding: '10px' }}
        onClick={() => {
          setVisible(!visible);
        }}
        className='CustomButtonAR'
      >
        Equity
      </button>
      <h4>Owner Capital</h4>
      {visible && (
        <div
          style={{
            color: 'red',
            // width: '98%',
            border: '2px solid red',
            padding: '20px',
            margin: '20px 0',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>OwnerCapital</span>
            <span style={{ fontWeight: 'bold' }}>
              {ownerCapital?.difference ? ownerCapital?.difference : 0}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Add Net Income</span>
            <span style={{ fontWeight: 'bold' }}>{incomeSummayValue}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Less Owner Withdrew</span>
            <span style={{ fontWeight: 'bold' }}>
              {' '}
              {OwnerWithdrew?.difference ? OwnerWithdrew?.difference : 0}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Equity</span>
            <span style={{ fontWeight: 'bold' }}>{EquityValue}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerCapital;
