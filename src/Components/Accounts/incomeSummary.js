import React, { useEffect, useState } from 'react';

const IncomeSummary = ({
  incomeSummary,
  incomeSummayValue,
  setIncomeSummayValue,
}) => {
  //   console.log(incomeSummary);
  const [Expense, setExpense] = useState({});
  const [Revenue, setRevenue] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // console.log('=======');
    setExpense(
      incomeSummary.find((c) => {
        if (c.head === 'Expense') {
          return c;
        }
      })
    );
    setRevenue(
      incomeSummary.find((c) => {
        if (c.head === 'Revenue') {
          return c;
        }
      })
    );

    setIncomeSummayValue(
      Math.abs(
        (Expense?.difference ? Expense?.difference : 0) -
          (Revenue?.difference ? Revenue?.difference : 0)
      )
    );
  }, [incomeSummary, visible]);
  // console.log(Expense);
  // console.log(Revenue);
  //   console.log(Object.getOwnPropertyNames(Revenue).length === 0);
  return (
    <div style={{ color: 'red' }}>
      {/* <h4  >Income IncomeSummary</h4> */}
      <button
        className='CustomButtonAR'
        onClick={() => {
          setVisible(!visible);
        }}
      >
        IncomeSummary
      </button>
      <h4>Income Summary</h4>
      {visible && (
        <table className='EntriesTable'>
          <thead>
            <tr className='entriesTableRow'>
              <th>Expense</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            <tr className='entriesTableRow'>
              <td>{Expense?.difference ? Expense.difference : 0}</td>
              <td>{Revenue?.difference ? Revenue.difference : 0}</td>
            </tr>
            <tr className='entriesTableRow'>
              <td></td>
              <td> totalValue {incomeSummayValue}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IncomeSummary;
