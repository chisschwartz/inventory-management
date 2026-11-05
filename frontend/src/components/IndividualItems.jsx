import { useCallback, useEffect, useMemo, useState } from "react"
import { AgGridReact, AgGridProvider } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { EditButtonRenderer } from "./EditButtonRenderer";
import InventoryHeader from "./InventoryHeader";
import { Link } from "react-router-dom";

//shows all of our labels in stock and their type
const IndividualItems = ({ token, username, onLogout }) => {
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
        { field: "labelCode", headerName: "Label code" },
        { field: "size", headerName: "Size" },
        { field: "quantity", headerName: "Quantity" },
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
        minWidth: 130,
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
        <div className="inventory-app">
            <InventoryHeader username={username} onLogout={onLogout} />
            <main className="inventory-main">
                <div className="page-heading">
                    <div>
                        <Link className="back-link" to="/labels">← Back to inventory</Link>
                        <p className="eyebrow">STOCK DETAILS</p>
                        <h1>All stock</h1>
                        <p className="page-description">Review sizes and update quantities.</p>
                    </div>
                </div>
                <section className="inventory-panel" aria-label="Stock by label and size">
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
                </section>
                <footer className="page-footer">Inventory is visible to authorized users only.</footer>
            </main>
        </div>
    );
};

export default IndividualItems;