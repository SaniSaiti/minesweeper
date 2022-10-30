/**
 * The DOMContentLoaded event fires when the HTML document has been completely parsed
 */
addEventListener('DOMContentLoaded', init);

/**
 * array to push the single fields into it, by creading the gamefield size.
 */
let fields = [];


/**
 * initialize my functions
 */
function init() {
    const xSize = 10;
    const ySize = 10;
    renderRowsAndColumns(xSize, ySize);
    fillfields(xSize, ySize);
}

/**
 * Create the size of the gamefield
 * @param {number} rows count of rows 
 * @param {number} columns count of columns
 */
function renderRowsAndColumns(rows, columns) {
    let gamefield = document.getElementById('gamefield');
    gamefield.innerHTML = ``;
    for (let x = 0; x < rows; x++) {
        gamefield.innerHTML += createHtmlRow(x);
        renderFields(x, columns);
    }
}

/**
 * A loop create the fields
 * @param {number} x number of row to fill
 * @param {number} columns count of columns to create 
 */
function renderFields(x, columns) {
    for (let y = 0; y < columns; y++) {
        let row = document.getElementById(`row${x}`);
        row.innerHTML += createHtmlField(x, y);
    }
}

/**
 * Create an object for each field 
 */
function fillfields(col, row) {
    for (let y = 0; y < col; y++) {
        for (let x = 0; x < row; x++) {
            let json = {
                x,
                y,
                number: 0,
                hasBomb: false,
                revealed: false,
                marked: false,
            }
            fields.push(json);
        }
    }
    generateBombs();
}

/**
 * Create 10% Bombs of fields
 * @returns {Number} 
 */
function bombCount() {
    let bombs = Math.round(fields.length * 0.10);
    return bombs;
}

/**
 * add bombs to fields
 */
function generateBombs() {

    for (let index = 0; index < bombCount(); index++) {
        // kontrolliere ob die zufallsnummer schon existiert
        let randomNumber = Math.floor(Math.random() * fields.length);
        console.log('randomNumber: ', randomNumber);

        fields[randomNumber].hasBomb = true;

        let x = fields[randomNumber].x;
        let y = fields[randomNumber].y;

        getField(x - 1, y - 1).number++;
        getField(x, y - 1).number++;
        getField(x + 1, y - 1).number++;

        getField(x - 1, y).number++;
        getField(x + 1, y).number++;

        getField(x - 1, y + 1).number++;
        getField(x, y + 1).number++;
        getField(x + 1, y + 1).number++;
    }
    console.log(`fields: `, fields);
}


/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @returns {Object} 
 */
function getField(x, y) {
    return fields.find(f => f.x == x && f.y == y) || { number: 0 }
}

function checkField(x, y) {
    console.log(x, y)
    let field = getField(x, y);
    field.revealed = true;


    // if(field[x].hasBomb = true){
    //     document.getElementById(x)
    //     getField(x - 1, y - 1).number++;
    //     getField(x, y - 1).number++;
    //     getField(x + 1, y - 1).number++;

    //     getField(x - 1, y).number++;
    //     getField(x + 1, y).number++;

    //     getField(x - 1, y + 1).number++;
    //     getField(x, y + 1).number++;
    //     getField(x + 1, y + 1).number++;

    // }

}