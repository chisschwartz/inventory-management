
import { Link } from "react-router-dom";

//renders the label code so that when you click one it takes you to the stock we have of it.
export function InventoryLinkRenderer(params) {
    return (
        <Link to={`/labels/size/code/${params.value}`}>
            {params.value}
        </Link>
    );
}