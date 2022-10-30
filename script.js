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
 * generate a random Number between 0 and max-fields
 * @returns {Number} 
 */
function getRandomNumber(arr) {
    let randomNumber = Math.floor(Math.random() * arr.length);
    console.log('randomNumber: ', randomNumber);
    return randomNumber;
}

/**
 * add bombs to fields
 */
function generateBombs() {
    for (let i = 0; i < bombCount(); i++) {
        //fields filtern und alle mit bombe rausnehmen um keinen platz doppelt zu überschreiben
        let filteredFields = fields.filter(field => field.hasBomb == false);
        let randomNumber = getRandomNumber(filteredFields);
        filteredFields[randomNumber].hasBomb = true;

        checkNeighbor(filteredFields, randomNumber); //anzeige der angrenzeden felder aktalisieren
    }
}


/**
 * Erhöhr den Wert aller anliegenden felder um 1
 * @param {Number} index 
 * @param {Array} arr
 */
function checkNeighbor(arr, index) {
    let x = arr[index].x;
    let y = arr[index].y;

    getField(x - 1, y - 1).number++;
    getField(x, y - 1).number++;
    getField(x + 1, y - 1).number++;

    getField(x - 1, y).number++;
    getField(x + 1, y).number++;

    getField(x - 1, y + 1).number++;
    getField(x, y + 1).number++;
    getField(x + 1, y + 1).number++;
}


/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @returns {Object} 
 */
function getField(x, y) {
    let field = fields.find(f => f.x == x && f.y == y) || { number: 0 };
    return field;
}


// bomben / numbern werden nicht richtig angezeigt
function checkField(x, y) {
    console.log('X: ', x, 'Y: ', y);
    let field = getField(x, y);
    field.revealed = true; // Aufgedeckt
    document.getElementById(`field${x}${y}`).classList.remove(`field-default`);
    if (!field.hasBomb) {
        document.getElementById(`field${x}${y}`).classList.add(`field-${field.number}`);
    } else {
        document.getElementById(`field${x}${y}`).classList.add(`field-bomb`);
    }
    // wenn das Feld den wert hasBomb = true besitzt alle bomben anzeigen und spiel beenden
}