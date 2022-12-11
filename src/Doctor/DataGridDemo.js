import Button from '@mui/material/Button';
import React, {Fragment} from "react";
import { DataGridPro, GridColDef, GridApi, GridCellValue,GridToolbar  } from '@mui/x-data-grid-pro';
import OutCertificate from './Certificate';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GridLinkOperator } from '@mui/x-data-grid';
import { GridFilterModel } from '@mui/x-data-grid';
// const columns: GridColDef[] = [

// const nav = useNavigate();
const columns = [
  { field: 'id', headerName: 'ID', flex:0.1 },
  { field: 'patientAddress', headerName: 'Patient Address', flex:0.4 },
  {
    field: 'symptoms',
    headerName: 'Symptom',
    flex:0.3,
  },
  {
    field: 'levels',
    headerName: 'Level',
    hide:true,
  },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        // const nav = useNavigate();
        e.stopPropagation(); // don't select this row after clicking

        // const api: GridApi = params.api;
        // const thisRow: Record<string, GridCellValue> = {};
        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== '__check__' && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
          );
        console.log(thisRow)
        // nav("/CertificateRecord", { state:data});
        // return alert(JSON.stringify(thisRow, null, 4));
        // return window.location.href = "CertificateRecord";
        // return <Link to="/CertificateRecord" state={thisRow}></Link>
      };
      const api = params.api;
      const thisRow = {};
      api
      .getAllColumns()
      .filter((c) => c.field !== '__check__' && !!c)
      .forEach(
        (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
      );
      return <Link to="/CertificateRecord" state={thisRow}>VIEW</Link>
      // return <Button onClick={onClick}>View</Button>;
  },
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataGridDemo(props) {
  let patientCertificate = props.rows
  const customFilter = props.filter
  // [
  //   { id: 1, columnField: 'symptoms', operatorValue: 'contains', value: 'B' },
  //   { id: 2, columnField: 'id', operatorValue: 'contains', value: 0 }
  // ]
  patientCertificate.map((elements,index)=>{
    elements['id'] = index
  });
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGridPro rows={patientCertificate} columns={columns}  filterModel={{items: customFilter,linkOperator: GridLinkOperator.And,}}pageSize={5}/>
    </div>
  );
}