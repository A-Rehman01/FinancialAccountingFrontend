import React, { useState, useEffect } from 'react';

const TrialBalance = ({ info, setIncomeSummary }) => {
  const [trialBalance, setTrialBalance] = useState([]);
  const [TDebit, setTDebit] = useState(0);
  const [TCredit, setTCredit] = useState(0);
  console.log(info);
  var balanceArray = [];
  var totalDebit = 0;
  var totalCredit = 0;
  // const handleCreateTB=(info)=>{

  // }
  // useEffect(() => {

  // }, [info])
  const handleCreateTB = (info) => {
    balanceArray = [];
    info?.forEach((entry) => {
      if (balanceArray.length >= 1) {
        const temp1 = { head: entry?.debit, debit: entry?.amount, credit: 0 };
        const temp2 = { head: entry?.credit, debit: 0, credit: entry?.amount };
        let debitArray = balanceArray.filter((x) => x.head === entry.debit);
        let creditArray = balanceArray.filter((x) => x.head === entry.credit);
        if (debitArray.length == 1) {
          let debitObj = debitArray[0];
          debitObj = { ...debitObj, debit: debitObj?.debit + entry.amount };
          balanceArray = balanceArray.filter((x) => x.head !== entry.debit);
          balanceArray.push(debitObj);
        } else {
          balanceArray.push(temp1);
        }
        if (creditArray.length == 1) {
          let creditObj = creditArray[0];
          creditObj = {
            ...creditObj,
            credit: creditObj?.credit + entry.amount,
          };
          balanceArray = balanceArray.filter((x) => x.head !== entry.credit);
          balanceArray.push(creditObj);
        } else {
          balanceArray.push(temp2);
        }
        console.log('if cond', balanceArray);
      } else {
        let tempArray = [];
        tempArray.push({ head: entry?.debit, debit: entry?.amount, credit: 0 });
        tempArray.push({
          head: entry?.credit,
          debit: 0,
          credit: entry?.amount,
        });
        balanceArray = tempArray;
        console.log('balance array populated', balanceArray);
      }
    });
    let tempArray = [];
    balanceArray.forEach((x) => {
      totalCredit = totalCredit + x?.credit;
      totalDebit = totalDebit + x?.debit;
      const diff = Math.abs(x.debit - x.credit);
      tempArray.push({ ...x, difference: diff });
    });
    setTrialBalance(tempArray);
    setIncomeSummary(tempArray);
    setTDebit(totalDebit);
    setTCredit(totalCredit);
    // setTDifference()
    balanceArray = tempArray;
    console.log(balanceArray);
    console.log(totalDebit);
    console.log(totalCredit);
  };
  return (
    <div style={{ width: '100%' }}>
      <button onClick={() => handleCreateTB(info)} className='CustomButtonAR'>
        Trial Balance
      </button>
      {trialBalance.length > 0 ? (
        <table className='EntriesTable'>
          <tr className='entriesTableRow'>
            <th>S.No</th>
            <th>Account</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Difference</th>
          </tr>
          {trialBalance?.map((x, i) => (
            <tr className='entriesTableRow'>
              <td>{i + 1}</td>
              <td>{x?.head}</td>
              <td>{x?.debit}</td>
              <td>{x?.credit}</td>
              <td>{x?.difference}</td>
            </tr>
          ))}
          <tr className='entriesTableRow'>
            <td>{TCredit == TDebit ? 'Same' : 'Different'}</td>
            <td>Total</td>
            <td>{TDebit}</td>
            <td>{TCredit}</td>
            <td>
              {trialBalance.reduce(
                (currentScore, obj, index) => currentScore + obj?.difference,
                0
              )}
            </td>
          </tr>
        </table>
      ) : null}
    </div>
  );
};

export default TrialBalance;
