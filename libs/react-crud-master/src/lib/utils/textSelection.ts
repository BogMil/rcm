export const enableTextSelectionOnPage = () => {
    document.body.style.webkitUserSelect = "";
    document.body.style.msUserSelect = "";
    document.body.style.userSelect = "";
}

export const disableTextSelectionOnPage = () => {
    document.body.style.webkitUserSelect = "none";
    document.body.style.msUserSelect = "none";
    document.body.style.userSelect = "none";
}