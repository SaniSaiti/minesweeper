/**
 * all created fields
 */
let fields = [];

/**
 * all clicked fields
 */
let checkedFields = [];

/**
 * all fields with bombs
 */
let bombFields = [];



/**
 * Run Code
 */
function init() {
    resetGame();
    //Submit SIZE later via input field
    const xSize = 5;
    const ySize = 5;
    renderRowsAndColumns(xSize, ySize);
    generateBombs();
    filterFieldsOfBombs();

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
        fields.push(field(x, y));
    }
}

/**
 * Create an object for each field 
 * @param {Number} x coordinate
 * @param {Number} y coordinate
 * @returns {JSON}  field
 */
function field(x, y) {
    return {
        x: x,
        y: y,
        number: 0,
        hasBomb: false,
        revealed: false,
        marked: false,
    };
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
 * Push fields with Bombs in Array
 */
function filterFieldsOfBombs() {
    bombFields = fields.filter(field => field.hasBomb == true);
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

        raiseNeighborfields(filteredFields, randomNumber); //Nachbarfelder um 1 erhöhen
    }
}


/**
 * Erhöhr den Wert aller Benachbarten Felder um 1
 * @param {Number} index 
 * @param {Array} arr
 */
function raiseNeighborfields(arr, index) {
    let x = arr[index].x;
    let y = arr[index].y;
    //Top
    getField(x - 1, y - 1).number++;
    getField(x, y - 1).number++;
    getField(x + 1, y - 1).number++;
    //Mid
    getField(x - 1, y).number++;
    getField(x + 1, y).number++;
    //Bot
    getField(x - 1, y + 1).number++;
    getField(x, y + 1).number++;
    getField(x + 1, y + 1).number++;
}


/**
 * returns the selected field 
 * @param {number} x 
 * @param {number} y 
 * @returns {Object} 
 */
function getField(x, y) {
    let field = fields.find(f => f.x == x && f.y == y) || { number: 0 };
    return field;
}



function collectCheckedFields() {
    checkedFields = fields.filter(field => field.revealed == true);
    win();
}

/**
 * Show the value of the selected field
 * @param {Number} x 
 * @param {Number} y 
 */
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
    collectCheckedFields();
    // wenn das Feld den wert hasBomb = true besitzt alle bomben anzeigen und spiel beenden
}

function win() {
    if (fields.length == checkedFields.length) {
        let end = document.getElementById('end-frame');
        end.classList.remove('d-none');
        console.log('Gewonnen');
    }
}

/**
 * reset the globle arrays value to empty
 */
function resetGame() {
    fields = [];
    bombFields = [];
    checkedFields = [];
    hideFrames();
}


/**
 * hide HTML-Elements
 */
function hideFrames() {
    document.getElementById('end-frame').classList.add('d-none');
    document.getElementById('start-frame').classList.add('d-none');
}


/**
 * The DOMContentLoaded event fires when the HTML document has been completely parsed
 */
addEventListener('DOMContentLoaded', init);