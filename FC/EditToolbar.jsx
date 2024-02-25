import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridCellModes } from '@mui/x-data-grid';


export default function EditToolbar(props) {

  const { selectedCellParams, cellMode, cellModesModel, setCellModesModel } = props;

  const handleSaveOrEdit = () => {
    if (!selectedCellParams) {
      return;
    }
    console.log(Number(selectedCellParams.id));
    console.log(selectedCellParams.field);

    //let index = Number(selectedCellParams.id);
    //let FieldChg = selectedCellParams.field;

    props.index = Number(selectedCellParams.id);
    props.FieldChg = selectedCellParams.field;

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
    console.log("fm");
  };

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