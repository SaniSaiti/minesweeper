/**
 * Create a div-container to fill it with single fields in a row
 * @param {number} x count of rows to create 
 * @returns String to create a HTML DIV-Element
 */
function createHtmlRow(x) {
    return /*html*/ `<div id="row${x}" class="gamefieldRow"></div>`;
}


/**
 * Create a div-element to show a single field
 * @param {number} x is row number
 * @param {number} y is column number
 * @returns String to create a HTML DIV-Element
 */
function createHtmlField(x, y) {
    return /*html*/ `<div id="field${x}${y}" class="field"></div>`;
}