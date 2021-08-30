import React, { useState,useEffect } from 'react'
import './Accounts.css'
import {getCompanyInfo,AddEntry,DeleteEntry,EditEntry} from '../../Actions/index'
import TrialBalance from './TrialBalance/TrialBalance';
import IncomeSummary from './incomeSummary';
import OwnerCapital from './ownerCapital'
import BalanceSheet from './balanceSheet';
const Accounts = () => {

    const [Error, setError] = useState('');

    //Income Summay
    const [incomeSummary, setIncomeSummary] = useState([]);
    const [incomeSummayValue, setIncomeSummayValue] = useState();
//Equity
const [EquityValue, setEquityValue] = useState();
    //Account Info
    const [AccName, setAccName] = useState('');
    const [CorrespondingEntry, setCorrespondingEntry] = useState('');
    const [TAmount, setTAmount] = useState(0);
    const [TType, setTType] = useState('');
    const [data, setData] = useState()
    const [reloadUseEffect, setreloadUseEffect] = useState(0)
    const [entryId, setEntryId] = useState('');
    const [editingMode, setEditingMode] = useState(false);
    const FixedAccounts = [{ Head: 'Amount Payable', AccountType: 'Credit' }, { Head: 'Note Payble', AccountType: 'Credit' }, { Head: 'Account Receivable', AccountType: 'Debit' }, { Head: 'Note Receivable', AccountType: 'Debit' }, { Head: 'Cash', AccountType: 'Debit' }, { Head: 'Land', AccountType: 'Debit' }, { Head: 'Supplies', AccountType: 'Debit' }, { Head: 'Owner Capital', AccountType: 'Credit' }, { Head: 'Owner Withdraw', AccountType: 'Debit' }, { Head: 'Revenue', AccountType: 'Credit' }, { Head: 'Expense', AccountType: 'Debit' }]
    const [CompId, setCompId] = useState()
    useEffect(() => {
        console.log('useEffectReloaded')
        const companyID=window.location.href.split('/')[4];
        setCompId(prev=>companyID)
        getCompanyInfo(companyID)
        .then((res) => {
            if (res) {
                setData(prev=>res?.data?.enteries);
                console.log(res);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }, [reloadUseEffect])
    const handleSubmitTransaction = () => {
        if (TAmount > 0) {
            if(AccName&&CorrespondingEntry){
                if(AccName!=CorrespondingEntry){
                    // if(FixedAccounts.filter((x)=>x.Head==AccName)[0].AccountType!=FixedAccounts.filter((x)=>x.Head==CorrespondingEntry)[0].AccountType){
                        if (TType == 'Debit') {
                            // setDebits(prev => [...prev, TAmount])
                            if(editingMode){
                                const EntryData={
                                    amount:TAmount,
                                    debit:AccName,
                                    credit:CorrespondingEntry,
                                    enteryid:entryId
                                }
                                EditEntry(CompId,EntryData)
                                setEditingMode(prev=>false);
                                setreloadUseEffect(prev=>prev+1);
                            }
                            else{
                            const EntryData={
                                amount:TAmount,
                                debit:AccName,
                                credit:CorrespondingEntry
                            }
                            console.log(EntryData);
                            AddEntry(EntryData,CompId)
                            .then((res) => {
                                if (res) {
                                    setData(prev=>res?.data?.enteries);
                                    console.log(res);
                                }
                              })
                              .catch((error) => {
                                console.log(error.response);
                              });}
                              setTAmount(prev => 0)
                            setAccName(prev=>'');
                            setCorrespondingEntry(prev=>'');
                            setTType(prev=>'');
                            

                        }
                        else if (TType == 'Credit') {
                            if(editingMode){
                                const EntryData={
                                    amount:TAmount,
                                    credit:AccName,
                                    debit:CorrespondingEntry,
                                    enteryid:entryId
                                }
                                EditEntry(CompId,EntryData)
                                setEditingMode(prev=>false);
                                setreloadUseEffect(prev=>prev+1);
                            }
                            else{
                            const EntryData={
                                amount:TAmount,
                                debit:CorrespondingEntry,
                                credit:AccName,
                            }
                            console.log(EntryData);
                            AddEntry(EntryData,CompId)
                            .then((res) => {
                                if (res) {
                                    setData(prev=>res?.data?.enteries);
                                    console.log(res);
                                }
                              })
                              .catch((error) => {
                                console.log(error.response);
                              });}
                              setTAmount(prev => 0)
                            setAccName(prev=>'');
                            setCorrespondingEntry(prev=>'');
                            setTType(prev=>'');
                            

                        }
                        else {
                            setError('Please Select a Transaction Type.')
                            // alert('Please Select a Transaction Type.')
                        }
                    // }
                    // else{
                    //     alert(CorrespondingEntry+" and "+AccName+' have same Account Types.');
                    // }  
                }
            }
            else{
                setError('Account name or Corresponding Account Missing!')
                // alert('Account name or Corresponding Account Missing!')
            }
        }
        else {
            setError('Please Enter Transaction Amount.')

            // alert('Please Enter Transaction Amount.')
        }
    }
    const handleDeleteEntry=(eId)=>{
        handleCancelEdition();
        if (window.confirm("Are you sure? Do you want to delete this entry?")) {
            DeleteEntry(CompId,eId)
            setreloadUseEffect(prev=>prev+1);
        }
    }
    const handleEditEnrty=(x)=>{
        setAccName(prev=>x?.debit)
        setCorrespondingEntry(prev=>x?.credit)
        setTAmount(prev=>x?.amount)
        setTType(prev=>'Debit')
        setEntryId(prev=>x?._id)
        setEditingMode(prev=>true);
    }
    const handleCancelEdition=()=>{
        setTAmount(prev => 0)
        setAccName(prev=>'');
        setCorrespondingEntry(prev=>'');
        setTType(prev=>'');
        setEditingMode(prev=>false);
    }

    useEffect(()=>{
        if(TAmount&&AccName&&CorrespondingEntry&&TType){
            setError('')
        }
    },[TAmount,AccName,CorrespondingEntry,TType])
    return (
        <div className='accountsRoot'>
            <h1 className='accountsTopHeading'>Trial Balance for 2021</h1>
            <div className='IntroPlusAddAccount'>
           
                <div className='formCreateAccount'>
                    <label className='halfWideLabel'>
                        Account Name
                    </label>
                    <label className='halfWideLabel'>
                        Corresponding Entry
                    </label>
                    {/* <input placeholder='Enter Name' maxLength={30} value={AccName} onChange={(e)=>setAccName(e.target.value)} className='halfWideInput'/> */}
                    <select className='halfWideInput' value={AccName} onChange={(e) => setAccName(e.target.value)}>
                    <option value=''>
                            Please Select
                        </option>
                        {
                            FixedAccounts.filter((x)=>x.Head!=CorrespondingEntry).map((x,i)=><option value={x.Head}>
                                {x.Head}
                            </option>)
                        }
                    </select>
                    {/* <select className='halfWideInput' value={AccType} onChange={(e) => setAccType(e.target.value)}>
                        <option value="Debit Account">
                            Debit Account
                        </option>
                        <option value="Credit Account">
                            Credit Account
                        </option>
                    </select> */}
                    <select className='halfWideInput' value={CorrespondingEntry} onChange={(e) => setCorrespondingEntry(e.target.value)}>
                        <option value=''>
                            Please Select
                        </option>
                        {
                            FixedAccounts.filter((x)=>x.Head!=AccName).map((x,i)=><option value={x.Head}>
                                {x.Head}
                            </option>)
                        }
                    </select>
                    <label className='halfWideLabel'>
                        Amount in PKR
                    </label>
                    <label className='halfWideLabel'>
                        Transaction Type
                    </label>
                    <input type='number' placeholder='Enter Amount' value={TAmount} onChange={(e) => setTAmount(parseInt(e.target.value))} className='halfWideInput'>
                    </input>
                    <select className='halfWideInput' value={TType} onChange={(e) => setTType(e.target.value)}>
                    <option value=''>
                            Please Select
                        </option>
                        <option value="Debit">
                            Debit
                        </option>
                        <option value="Credit">
                            Credit
                        </option>
                    </select>
                    <button className='CustomButton' style={{border:"none",outline:'none'}} onClick={handleSubmitTransaction}>{editingMode?'Edit Transaction':'Add Transaction'}</button>
                    {editingMode&&<button className='CustomButton' style={{border:"none",outline:'none'}} onClick={handleCancelEdition}>Cancel Editing</button>}
                    {/* <button className='CustomButton'>Submit Account</button> */}
                    {/* <div className='AccountInfoBeforeSubmission'>
                        <label>{AccName}</label><br />
                        <label className="AccountType">{FixedAccounts.filter((x)=>x?.Head==AccName)[0]?.AccountType}</label>
                    </div>
                    <label className='halfWideLabel'>
                        Debit
                    </label>
                    <label className='halfWideLabel'>
                        Credit
                    </label>
                    <div className='AddDebitinAccount'>
                        {
                            Debits.map((x) => <><p className="CreditDebitAmounts">{x}</p>
                                <button className='CustomButton2'>Delete</button></>)
                        }
                    </div>
                    <div className='AddCreditinAccount'>
                        {
                            Credits.map((x) => <><p className="CreditDebitAmounts">{x}</p>
                                <button className='CustomButton2'>Delete</button></>)
                        }
                    </div> */}
                </div>
                <div style={{textAlign:'center',margin:'20px 0',fontSize:'19px'}}>{Error && Error}</div>
            </div>
            <div className='AllAccountsPlusTrialBalance'>
                   <table className="EntriesTable">
                       <tr className="entriesTableRow">
                           <th>
                               S.No
                           </th>
                           <th>
                               Debit Acc
                           </th>
                           <th>
                               Credit Acc
                           </th>
                           <th>
                               Amount
                           </th>
                       </tr>
                    {
                        data?.map((x,i)=><tr className="entriesTableRow" onDoubleClick={()=>handleDeleteEntry(x?._id)} onClick={()=>handleEditEnrty(x)}>
                            <td>
                                {i+1}
                            </td>
                            <td>
                                {x.debit}
                            </td>
                            <td>
                                {x.credit}
                            </td>
                            <td>
                                {x.amount}
                            </td>
                        </tr>)
                    }
                    </table>
                    <div>
                    <TrialBalance info={data} setIncomeSummary={setIncomeSummary}/>
                    <IncomeSummary info= {data} incomeSummary={incomeSummary} incomeSummayValue={incomeSummayValue} setIncomeSummayValue={setIncomeSummayValue}/>
                    <OwnerCapital incomeSummary={incomeSummary} incomeSummayValue={incomeSummayValue} EquityValue={EquityValue} setEquityValue={setEquityValue}/>
                    <BalanceSheet incomeSummary={incomeSummary} incomeSummayValue={incomeSummayValue} EquityValue={EquityValue}/>
                    </div>

            </div>
        </div>
    )
}

export default Accounts
