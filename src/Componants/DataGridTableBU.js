import React from "react";
import { DataGrid } from '@mui/x-data-grid';

const DataGridTable = ({
    data,
    columns,
    setRowSelectionModel,
    ignoreSelectionChange,
    setMapLocations
}) => {

    return(

        <DataGrid className="dataTable"
            getRowClassName={(params) => {
                if (params.row.StatusType.startsWith('Under offer')) {
                    return 'rowUnderOffer';
                } else if (params.row.StatusType.startsWith('Closing')) {
                    return 'rowClosing';
                } else if (params.row.StatusType.startsWith('Sold')) {
                    return 'rowSold';
                }
                return '';
            }}
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
            rowHeight={100}
            onRowSelectionModelChange={(newSelectionModel) => {
                if (!ignoreSelectionChange) {
                    setRowSelectionModel(newSelectionModel);
                    const selectedData = data.filter(row => newSelectionModel.includes(row.id));
                    if (selectedData.length > 0) {
                        setMapLocations(selectedData);
                    }
                    console.log(newSelectionModel);
                }
            }


            }
        />


    )


}

export default DataGridTable