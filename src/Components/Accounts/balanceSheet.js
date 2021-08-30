import React, { useEffect, useState } from 'react';

const BalanceSheet = ({ incomeSummary, incomeSummayValue, EquityValue }) => {
  const [liability, setLiability] = useState();
  const [assets, setAssets] = useState();

  const [AmountPayable, setAmountPayable] = useState({});
  const [notePayble, setNotePayble] = useState({});

  const [NoteReceivable, setNoteReceivable] = useState({});
  const [AccountReceivable, setAccountReceivable] = useState({});

  const [Cash, setCash] = useState({});
  const [Land, setland] = useState({});
  const [Supplies, setSupplies] = useState({});

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setAmountPayable(
      incomeSummary.find((c) => {
        if (c.head === 'Amount Payable') {
          return c;
        }
      })
    );

    setNotePayble(
      incomeSummary.find((c) => {
        if (c.head === 'Note Payble') {
          return c;
        }
      })
    );

    //Liability

    setLiability(
      (AmountPayable?.difference ? AmountPayable?.difference : 0) +
        (notePayble?.difference ? notePayble?.difference : 0)
    );

    setNoteReceivable(
      incomeSummary.find((c) => {
        if (c.head === 'Note Receivable') {
          return c;
        }
      })
    );

    setAccountReceivable(
      incomeSummary.find((c) => {
        if (c.head === 'Account Receivable') {
          return c;
        }
      })
    );

    setCash(
      incomeSummary.find((c) => {
        if (c.head === 'Cash') {
          return c;
        }
      })
    );

    setland(
      incomeSummary.find((c) => {
        if (c.head === 'Land') {
          return c;
        }
      })
    );

    setSupplies(
      incomeSummary.find((c) => {
        if (c.head === 'Supplies') {
          return c;
        }
      })
    );

    //Assest
    setAssets(
      (NoteReceivable?.difference ? NoteReceivable?.difference : 0) +
        (AccountReceivable?.difference ? AccountReceivable?.difference : 0) +
        (Cash?.difference ? Cash?.difference : 0) +
        (Land?.difference ? Land?.difference : 0) +
        (Supplies?.difference ? Supplies?.difference : 0)
    );
  }, [incomeSummary, visible]);

  return (
    <div style={{ width: '98%', color: 'red' }}>
      <button
        style={{ padding: '10px' }}
        onClick={() => {
          setVisible(!visible);
        }}
        className='CustomButtonAR'
      >
        Balance Sheet
      </button>
      {visible && (
        <>
          <h4>Balance Sheet</h4>
          <div
            style={{
              border: '1px solid black',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '20px',
            }}
          >
            <div>
              <h4 style={{ fontWeight: 'bold' }}>Assests</h4>
              <div>
                Note Receivable: {'  '}
                {NoteReceivable?.difference ? NoteReceivable?.difference : 0}
              </div>

              <div>
                Account Receivable: {'  '}
                {AccountReceivable?.difference
                  ? AccountReceivable?.difference
                  : 0}
              </div>

              <div>
                Cash: {'  '}
                {Cash?.difference ? Cash?.difference : 0}
              </div>

              <div>
                Land: {'  '}
                {Land?.difference ? Land?.difference : 0}
              </div>

              <div>
                Supplies: {'  '}
                {Supplies?.difference ? Supplies?.difference : 0}
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                Total: {'  '}
                {assets && assets}
              </div>
            </div>
            <div>
              <div>
                <h4 style={{ fontWeight: 'bold' }}>Liability</h4>
                <div>
                  Amount Payable: {'  '}
                  {AmountPayable?.difference ? AmountPayable?.difference : 0}
                </div>
                <div>
                  Note Payble: {'  '}
                  {notePayble?.difference ? notePayble?.difference : 0}
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                  Total: {'  '}
                  {liability && liability}
                </div>
              </div>
              <div>
                <h4 style={{ fontWeight: 'bold' }}>Equity</h4>
                <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                  Total : {'  '}
                  {EquityValue && EquityValue}
                </div>
              </div>
            </div>
          </div>{' '}
        </>
      )}
    </div>
  );
};

export default BalanceSheet;
