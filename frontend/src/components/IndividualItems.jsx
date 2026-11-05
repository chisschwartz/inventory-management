import { useCallback, useEffect, useMemo, useState } from "react"
import { AgGridReact, AgGridProvider } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { EditButtonRenderer } from "./EditButtonRenderer";

//shows all of our labels in stock and their type
const IndividualItems = ({ token }) => {
    const [rowData, setRowData] = useState([]);
    const fetchItems = useCallback(async () => {
        try {
            const response = await fetch("/api/labels/size", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!response.ok) throw new Error(`Unable to load stock (status ${response.status}).`);
            setRowData(await response.json());

        } catch(error) {
            console.error("Error fetching lables: ", error);
        }
    }, [token]);

    const colDefs = useMemo(() => [
        { field: "labelCode"},
        { field: "size"},
        { field: "quantity"},
        {
            headerName: "Update Quantity",
            cellRenderer: EditButtonRenderer,
            cellRendererParams: {
                onEditComplete: fetchItems,
                token
            },
        }
    ], [fetchItems, token]);

    const defaultColDef = useMemo(() => {
        return {
        flex: 1,
        filter: true,
        };
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const loadItems = async () => {
            try {
                const response = await fetch("/api/labels/size", {
                    headers: { Authorization: `Bearer ${token}` },
                    signal: controller.signal
                });
                if (!response.ok) throw new Error(`Unable to load stock (status ${response.status}).`);
                setRowData(await response.json());
            } catch(error) {
                if (error.name !== "AbortError") {
                    console.error("Error fetching labels: ", error);
                }
            }
        };
        loadItems();
        return () => controller.abort();
    }, [token]);

    return (
        <div>
                <AgGridProvider modules={[AllCommunityModule]}>
                    <div className="ag-theme-alpine inventory-grid">
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

export default IndividualItems;