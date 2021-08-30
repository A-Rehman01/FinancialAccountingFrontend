import React, { useState, useEffect } from 'react'
import './Home.css'
import { getAllCompany, CreateCompany } from '../../Actions/index'
import Table from './CompanyTable'

const Home = () => {
  const [CName, setCName] = useState('')
  const [TableData, setTableData] = useState()
  const [runUseEffect, setrunUseEffect] = useState(0)
  let DData = [
    { id: '2123', name: 'Hello world', Created: '21' },
    { id: '234234', name: 'ABC inc', Created: '41' },
    { id: '234235', name: 'XYZ', Created: '22/1' },
    { id: '456776', name: 'CC', Created: '31/8' },
  ]
  useEffect(() => {
    getAllCompany()
      .then((res) => {
        if (res) {
          const x = []
          res?.data?.forEach((element) => {
            x.push({
              id: element._id,
              companyname: element.companyname,
              createdAt: element.createdAt,
            })
          })
          setTableData((prev) => x)
          console.log(res)
          console.log(TableData)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [runUseEffect])
  const handleCreateCompany = () => {
    if (CName) {
      CreateCompany({ companyname: CName })
        .then((res) => {
          if (res) {
            setTableData((prev) => res?.data?.enteries)
            setrunUseEffect((prev) => prev + 1)
          }
        })
        .catch((error) => {
          console.log(error)
        })
      setCName((prev) => '')
    } else {
      alert("Please Enter Company's Name")
    }
  }
  return (
    <div className='accountsRoot'>
      <h1 className='accountsTopHeading'>COMPANIES NAME</h1>
      <div className='IntroPlusAddAccount'>
        <div className='formCreateAccount2'>
          <input
            value={CName}
            className='InputCreateAccount'
            onChange={(e) => setCName((prev) => e.target.value)}
            placeholder='Enter Company Name'
          />
          <button className='submitButtonGreen' onClick={handleCreateCompany}>
            Create Company
          </button>
        </div>
      </div>
      <div className='AllAccountsPlusTrialBalance'>
        <h1 className='accountsTopHeading'>ALL COMPANIES</h1>

        {TableData && <Table data={TableData} />}
      </div>
    </div>
  )
}

export default Home
