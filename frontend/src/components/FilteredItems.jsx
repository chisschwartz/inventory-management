import { useEffect, useMemo, useState } from "react"
import { AgGridReact, AgGridProvider } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useParams } from "react-router-dom";
import { EditButtonRenderer } from "./EditButtonRenderer";

//shows us the individual items for each label code
const FilteredItems = () => {
    
    const fetchItems = async () => {
        try {
            const response = await fetch(`http://localhost:5176/api/labels/size/code/${labelCode}`, {
                method: 'GET'
            })

            .then(response => response.json())
            .then(rowData => setRowData(rowData))

        } catch(error) {
            console.error("Error fetching lables: ", error);
        }
    };
    
    const { labelCode } = useParams();
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState ([
        { field: "labelCode"},
        { field: "size"},
        { field: "quantity"},
        {
            headerName: "Update Quantity",
            cellRenderer: EditButtonRenderer,
            cellRendererParams: {
                onEditComplete: fetchItems
            },
        }
    ]);

    const defaultColDef = useMemo(() => {
        return {
        flex: 1,
        filter: true,
        };
    }, []);

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div>
                <AgGridProvider modules={[AllCommunityModule]}>
                    <div className="ag-theme-alpine" style={{ width: "1500px", height: "500px"}}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={colDefs}
                            defaultColDef={defaultColDef}
                            pagination={true}
                            debug={true}
                        />
                    </div>
                </AgGridProvider>
        </div>
    );
};

export default FilteredItems;