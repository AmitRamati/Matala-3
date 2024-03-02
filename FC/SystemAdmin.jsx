import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridCellModes } from '@mui/x-data-grid';

//import EditToolbar from './EditToolbar';
import { useEffect } from 'react';
import { useState } from 'react';




export default function SystemAdmin(props) {
  
  //const [RegiList, setRegiList] = useState(props.users);

  const [RegiList, setRegiList] = useState(localStorage.length == 0 ? "" : JSON.parse(localStorage["Users"]));
  const [Rows, setRows] = useState(RegiList.map((item, index) => (
    { id: index + 1, UserName: item.UserName, Name: item.FirstName + " " + item.LastName, Date: item.Date, Address: item.Street + " " + item.Number + " , " + item.City, Email: item.Email }
  )));
  

  console.log(RegiList);

  function EditToolbar(props) {

    const { selectedCellParams, cellMode, cellModesModel, setCellModesModel } = props;

    const handleSaveOrEdit = () => {
      if (!selectedCellParams) {
        return;
      }
      //console.log(Number(selectedCellParams.id));
      console.log(selectedCellParams.field);
      debugger;
      let index = Number(selectedCellParams.id) - 1;
      let FieldChg = selectedCellParams.field;
      const UpdatedEditList = [...RegiList];
     console.log(index, FieldChg);
     console.log(selectedCellParams);
     console.log("regi",RegiList);
     
      UpdatedEditList[index][FieldChg] = Rows[index][FieldChg];
      console.log("Update",UpdatedEditList);
      console.log("Check",Rows[index][FieldChg]);
      //localStorage.setItem('Users', JSON.stringify(UpdatedEditList));
      //setRegiList(UpdatedEditList);



     
      // console.log("noeoeoe", Rows[1].Address);
      //props.index = Number(selectedCellParams.id);
      // props.FieldChg = selectedCellParams.field;

      //RegiList[index].FieldChg = "";

      //console.log(cellMode);
      //console.log(cellModesModel);
      //console.log(Rows[1].Birthdate);

      //ChangeEdit(index, FieldChg);

      if (selectedCellParams.field == "Name") {

      }


      const { id, field } = selectedCellParams;
      if (cellMode === 'edit') {
        setCellModesModel({
          ...cellModesModel,
          [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.View } },
        });
      } else {
        setCellModesModel({
          ...cellModesModel,
          [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.Edit } },
        });
      }




    };

 

    function DeleteUser() {

      console.log(selectedCellParams);
      let indexToRemove = selectedCellParams.id - 1;
      const UpdatedList = [...RegiList];
      UpdatedList.splice(indexToRemove, 1);
      setRegiList(UpdatedList);
      setRows(UpdatedList.map((item, index) => (
        { id: index + 1, UserName: item.UserName, Name: item.FirstName + " " + item.LastName, Date: item.Date, Address: item.Street + " " + item.Number + " , " + item.City, Email: item.Email }
      )));
      localStorage.setItem('Users', JSON.stringify(UpdatedList));

    };


    useEffect(() => {

    }, [RegiList]);

    const handleCancel = () => {
      if (!selectedCellParams) {
        return;
      }
      const { id, field } = selectedCellParams;
      setCellModesModel({
        ...cellModesModel,
        [id]: {
          ...cellModesModel[id],
          [field]: { mode: GridCellModes.View, ignoreModifications: true },
        },
      });
    };

    const handleMouseDown = (event) => {
      // Keep the focus in the cell
      event.preventDefault();
    };

    return (
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          p: 1,
        }}
      >
        <Button
          onClick={handleSaveOrEdit}
          onMouseDown={handleMouseDown}
          disabled={!selectedCellParams}
          variant="outlined"
          color='secondary'
        >
          {cellMode === 'edit' ? 'Save' : 'Edit'}
        </Button>
        <Button
          onClick={handleCancel}
          onMouseDown={handleMouseDown}
          disabled={cellMode === 'view'}
          variant="outlined"
          color='secondary'
          sx={{ ml: 1 }}
        >
          Cancel
        </Button>
        <Button color='secondary' onClick={DeleteUser}>
          Delete
        </Button>
      </Box>
    );
  }



  const [selectedCellParams, setSelectedCellParams] = React.useState(null);
  const [cellModesModel, setCellModesModel] = React.useState({});

  const handleCellFocus = React.useCallback((event) => {
   
    const row = event.currentTarget.parentElement;
    const id = row.dataset.id;
    const field = event.currentTarget.dataset.field;
    setSelectedCellParams({ id, field });
  }, []);

  const cellMode = React.useMemo(() => {
    if (!selectedCellParams) {
      return 'view';
    }
    const { id, field } = selectedCellParams;
    return cellModesModel[id]?.[field]?.mode || 'view';
  }, [cellModesModel, selectedCellParams]);

  const handleCellKeyDown = React.useCallback(
    (params, event) => {
      if (cellMode === 'edit') {
        console.log("params2", params);
        // Prevents calling event.preventDefault() if Tab is pressed on a cell in edit mode
        event.defaultMuiPrevented = true;
      }
    },
    [cellMode],
  );

  const handleCellEditStop = React.useCallback((params, event) => {
    console.log("params",params);
    event.defaultMuiPrevented = true;
  }, []);

  // useEffect(() => {
    
  //     setRows(RegiList.map((item, index) => (
  //       { id: index + 1, UserName: item.UserName, Name: item.FirstName + " " + item.LastName, Date: item.Date, Address: item.Street + " " + item.Number + " , " + item.City, Email: item.Email }
  //     )));
    
  // }, [RegiList])



  //let Rows = [];
  //setRows = RegiList.map((item, index) => (
  //{ id: index + 1, UserName: item.UserName, Name: item.FirstName + " " + item.LastName, Date: item.Date, Address: item.Street + " " + item.Number + " , " + item.City, Email: item.Email }
  // ));
  console.log("rows", Rows);

  //console.log(Rows[0].Date);
  // console.log(EditToolbar.props.index);

  const columns = [

    { field: 'UserName', headerName: 'User Name', width: 180, editable: true },
    { field: 'Name', headerName: 'Name', width: 180, editable: true },
    { field: 'Date', headerName: 'Birthdate', width: 180, editable: true },
    { field: 'Address', headerName: 'Address', width: 180, editable: true },
    { field: 'Email', headerName: 'Email', width: 180, editable: true },
  ];

  //let ID=props.index;

  //let FieldChg=props.FieldChg;

  //RegiList[ID].FieldChg = Rows[ID].FieldChg;

  //function ChangeEdit(ID, FieldChg) {

  // RegiList[ID].FieldChg = Rows[ID].FieldChg;
  console.log(RegiList);
  //}






  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={Rows}
        columns={columns}
        onCellKeyDown={handleCellKeyDown}
        cellModesModel={cellModesModel}
        onCellEditStop={handleCellEditStop}
        onCellModesModelChange={(model) => setCellModesModel(model)}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: {
            cellMode,
            selectedCellParams,
            setSelectedCellParams,
            cellModesModel,
            setCellModesModel,

          },
          cell: {
            onFocus: handleCellFocus,
          },
        }}
      />
    </div>
  );
}





