
export function DynamicUrl(url, params) {

    let apiUrl = '';

    if (url == "http://localhost:5176/labels") {
        let apiUrl = `http://localhost:5176/api/labels/${params.data.id}`
    } else {
        let apiUrl = `http://localhost:5176/api/labels/size/${params.data.id}`
    }

    return apiUrl;
}