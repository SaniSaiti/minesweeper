/**
 * Create a div-container to fill it with single fields in a row
 * @param {number} x count of rows to create 
 * @returns String to create a HTML DIV-Element
 */
function createHtmlRow(x) {
    return `<div id="row${x}" class="gamefieldRow"></div>`
}


/**
 * Create a div-element to show a single field
 * @param {number} x number of row to fill
 * @param {number} y number of field in column
 * @returns String to create a HTML DIV-Element
 */
function createHtmlField(x, y) {
    return `<div id="field${x}${y}" class="field"></div>`
}