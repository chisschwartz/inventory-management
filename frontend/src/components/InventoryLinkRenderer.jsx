

export function InventoryLinkRenderer(params) {
    const link = `<a "href=http://localhost:5176/labels/size/${params.value}"
    target="_blank">${new URL (`http://localhost:5176/labels/size/${params.value}`)}</a>`;
    return link;
}