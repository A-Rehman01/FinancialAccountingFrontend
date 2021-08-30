import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Page,
  Inject,
  Filter,
  colGroup,
} from '@syncfusion/ej2-react-grids'
import React, { useState, useEffect } from 'react'
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data'
import spinner from '../spinner'
import { useHistory } from 'react-router'

const CourseDash = ({ data }) => {
  console.log('data from table', data)
  const history = useHistory()
  const handleClick = (e) => {
    const cname = e.rowData?.companyname
    console.log('cname', cname)
    const cid = data?.filter((x) => x?.companyname == cname)[0]?.id
    history.push(`/accounts/${cid}`)
  }
  // const handleAddCourse=()=>{
  //     history.push('/createcourse')
  // }
  return (
    <>
      {data ? (
        <GridComponent
          id='grid1234'
          recordClick={(e) => handleClick(e)}
          dataSource={data}
          style={{ color: 'red' }}
          allowPaging={true}
          pageSettings={{ pageSize: 6 }}
          allowFiltering={true}
          style={{ border: 'red' }}
        >
          <ColumnsDirective style={{ color: 'red' }}>
            <ColumnDirective
              field='companyname'
              headerText='Name'
              width='120'
              textAlign='Left'
              style={{ color: 'red' }}
            />
            <ColumnDirective
              field='createdAt'
              headerText='Created'
              width='100'
              style={{ color: 'red' }}
            />
          </ColumnsDirective>
          <Inject services={[Page, Filter]} />
        </GridComponent>
      ) : (
        spinner
      )}
    </>
  )
}
export default CourseDash
