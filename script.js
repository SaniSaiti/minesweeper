let fields = [];

/**
 * initialize my functions
 */
function init() {
    renderRowsAndColumns(10, 10);
    //fillfields(10, 10);
}

/**
 * Create the size of the gamefield
 * @param {number} rows 
 * @param {number} columns 
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
 * The DOMContentLoaded event fires when the HTML document has been completely parsed
 */
addEventListener('DOMContentLoaded', init);



/**
 * ${extraClasses}
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
    randomBombs();
}


function randomBombs() {
    let bom = 5;

    for (let index = 0; index < bom; index++) {
        let filteredFields = fields.filter(field => field.hasBomb == false);
        //console.log(filteredFields)
        let randomNumber = Math.floor(Math.random() * filteredFields.length);
        //console.log(randomNumber)
        filteredFields[randomNumber].hasBomb = true;

        let x = filteredFields[randomNumber].x;
        let y = filteredFields[randomNumber].y;

        //console.log(getField(x - 1, y - 1))

        getField(x - 1, y - 1).number++;
        getField(x, y - 1).number++;
        getField(x + 1, y - 1).number++;

        getField(x - 1, y).number++;
        getField(x + 1, y).number++;

        getField(x - 1, y + 1).number++;
        getField(x, y + 1).number++;
        getField(x + 1, y + 1).number++;

    }

}

function getField(x, y) {

    return fields.find(f => f.x == x && f.y == y) || { number: 0 }


}

function checkField(x, y) {
    //console.log(x, y)
    let field = getField(x, y);
    field.revealed = true;
    render(10, 10);


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