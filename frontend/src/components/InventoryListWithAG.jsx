import { useCallback, useEffect, useMemo, useState } from "react"
import CreateLabel from "./CreateLabel";
import { AgGridReact, AgGridProvider } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { InventoryLinkRenderer } from "./InventoryLinkRenderer";
import { DeleteButtonRenderer } from "./DeleteButtonRenderer";

const InventoryListAG = ({ token, username, onLogout, onUnauthorized }) => {
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
        { field: "labelAlias"},
        { field: "company"},
                {
                    //should probably only render this for admins. Might just only render buttons for logged in users
            headerName: "Delete",
            cellRenderer: DeleteButtonRenderer,
            cellRendererParams: {
                onDeleteComplete: refreshLabels,
                token,
                onUnauthorized
            },
        }
    ], [refreshLabels, token, onUnauthorized]);

    //enables our filter and enables flex on our columns
    const defaultColDef = useMemo(() => {
        return {
        flex: 1,
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

                if (response.status === 401) {
                    onUnauthorized();
                    return;
                }
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
    }, [token, onUnauthorized, reloadCount]);

    return (
        <div className="inventory-app">
            <header className="topbar">
                <a className="brand" href="/labels" aria-label="Stockroom inventory">
                    <span className="brand-mark" aria-hidden="true">S</span>
                    <span>Stockroom</span>
                </a>
                <div className="account">
                    <span className="account-name">Signed in as <strong>{username}</strong></span>
                    <button className="text-button" onClick={onLogout} type="button">Sign out</button>
                </div>
            </header>
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
            {/* creates a button that lets us add a label to the database, will need to move eventually */}
            <section className="inventory-panel" aria-label="Inventory list">
              <div className="table-toolbar">
                {!isCreateLabel ? <button className="primary-button" onClick={() => {
                    setCreateLabel(true);
                }}>Create label</button> : ""}
              </div>
            {isCreateLabel ? <CreateLabel token={token} onUnauthorized={onUnauthorized} onLabelCreated={refreshLabels} setCreateLabel={setCreateLabel} /> :
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