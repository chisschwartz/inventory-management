import { useCallback, useEffect, useMemo, useState } from "react"
import CreateLabel from "./CreateLabel";
import { AgGridReact, AgGridProvider } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { InventoryLinkRenderer } from "./InventoryLinkRenderer";
import { DeleteButtonRenderer } from "./DeleteButtonRenderer";
import InventoryHeader from "./InventoryHeader";

const InventoryListAG = ({ token, username, onLogout }) => {
    const [isCreateLabel, setCreateLabel] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [error, setError] = useState("");
    const [reloadCount, setReloadCount] = useState(0);

    const refreshLabels = useCallback(() => {
        setReloadCount((currentCount) => currentCount + 1);
    }, []);

    const colDefs = useMemo(() => [
        { field: "labelCode",
            headerName: "Label Code",
            cellRenderer: InventoryLinkRenderer,
        },
        { field: "labelAlias", headerName: "Label name" },
        { field: "company", headerName: "Company" },
                {
            headerName: "Actions",
            cellRenderer: DeleteButtonRenderer,
            cellRendererParams: {
                onDeleteComplete: refreshLabels,
                token,
            },
        }
    ], [refreshLabels, token]);

    //enables our filter and enables flex on our columns
    const defaultColDef = useMemo(() => {
        return {
        flex: 1,
        minWidth: 130,
        filter: true,
        };
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        const loadLabels = async () => {
            try {
                const response = await fetch("/api/labels", {
                    headers: { Authorization: `Bearer ${token}` },
                    signal: controller.signal
                });

                if (!response.ok) {
                    throw new Error(`Inventory could not be loaded (status ${response.status}).`);
                }

                setRowData(await response.json());
                setError("");
            } catch (requestError) {
                if (requestError.name !== "AbortError") {
                    setError(requestError.message || "Inventory could not be loaded.");
                }
            }
        };

        loadLabels();
        return () => controller.abort();
    }, [token, reloadCount]);

    return (
        <div className="inventory-app">
            <InventoryHeader username={username} onLogout={onLogout} />
            <main className="inventory-main">
                <div className="page-heading">
                    <div>
                        <p className="eyebrow">OVERVIEW</p>
                        <h1>Inventory</h1>
                        <p className="page-description">A clear view of your current labels and suppliers.</p>
                    </div>
                    <span className="inventory-count" aria-live="polite">
                        {error ? "Unavailable" : `${rowData.length} ${rowData.length === 1 ? "item" : "items"}`}
                    </span>
                </div>
            <section className="inventory-panel" aria-label="Inventory list">
              <div className="table-toolbar">
                {!isCreateLabel ? <button className="primary-button" onClick={() => {
                    setCreateLabel(true);
                }}>Create label</button> : <button className="text-button" onClick={() => setCreateLabel(false)} type="button">Cancel</button>}
              </div>
            {isCreateLabel ? <CreateLabel token={token} onLabelCreated={refreshLabels} setCreateLabel={setCreateLabel} /> :
                error ? <div className="empty-state" role="alert">
                    <h2>Inventory unavailable</h2>
                    <p>{error}</p>
                    <button className="secondary-button" onClick={refreshLabels} type="button">Try again</button>
                </div> :
                <AgGridProvider modules={[AllCommunityModule]}>
                    <div className="ag-theme-alpine inventory-grid">
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={colDefs}
                            defaultColDef={defaultColDef}
                            pagination={true}
                        />
                    </div>
                </AgGridProvider>
            }
            </section>
            <footer className="page-footer">Inventory is visible to authorized users only.</footer>
            </main>
        </div>
    );
};

export default InventoryListAG;