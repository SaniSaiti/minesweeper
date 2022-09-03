let field = [];


function init() {
    fillfields(10, 10);
    render(10, 10);
}


function render(col, row) {
    let gamefield = document.getElementById('gamefield');
    let html = '';
    for (let y = 0; y < col; y++) {
        html += `<div class="gameContainer">`;
        for (let x = 0; x < row; x++) {
            let extraClasses = '';
            let currentField = getField(x, y);
            let content = '';
            let field = getField(x, y);

            if (field.revealed) {
                if (currentField.hasBomb) {
                    content = 'b'
                    extraClasses = 'field-bomb';
                } else if (currentField.number > 0) {
                    content = currentField.number;
                    extraClasses = 'field-' + currentField.number;
                }
            }

            html += `
            <div id="field${x}${y}" onclick="checkField(${x},${y})" class="field ${extraClasses}"> ${content}</div>
            `;
        }
        html += `</div>`;
    }

    gamefield.innerHTML = html;

}
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

            field.push(json);

        }

    }

    randomBombs();


}


function randomBombs() {
    let bom = 5;

    for (let index = 0; index < bom; index++) {
        let filteredFields = field.filter(field => field.hasBomb == false);
        console.log(filteredFields)
        let randomNumber = Math.floor(Math.random() * filteredFields.length);
        console.log(randomNumber)
        filteredFields[randomNumber].hasBomb = true;

        let x = filteredFields[randomNumber].x;
        let y = filteredFields[randomNumber].y;

        console.log(getField(x - 1, y - 1))

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

    return field.find(f => f.x == x && f.y == y) || { number: 0 }


}

function checkField(x, y) {
    console.log(x, y)
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

