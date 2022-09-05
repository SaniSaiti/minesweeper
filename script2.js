var components = {
    num_of_rows: 12,
    num_of_cols: 24,
    num_of_bombs: 55,
    bomb: '💣',
    alive: true,
    colors: { 1: 'blue', 2: 'green', 3: 'red', 4: 'purple', 5: 'maroon', 6: 'turquoise', 7: 'black', 8: 'grey' }
}

window.addEventListener('load', function() {
    document.getElementById('lost').style.display = "none";
    startGame();
});


function startGame() {
    components.bombs = placeBombs();
    document.getElementById('field').appendChild(createTable());
}


function createTable() {
    var table, row, td, i, j;
    table = document.createElement('table');

    for (i = 0; i < components.num_of_rows; i++) {
        row = document.createElement('tr');
        for (j = 0; j < components.num_of_cols; j++) {
            td = document.createElement('td');
            td.id = cellID(i, j);
            row.appendChild(td);
            addCellListeners(td, i, j);
        }
        table.appendChild(row);
    }
    return table;
}

//######################## First Version ########################

// function render(col, row) {
//     let gamefield = document.getElementById('gamefield');
//     let html = '';
//     for (let y = 0; y < col; y++) {
//         html += `<div class="gamefieldRow">`;
//         for (let x = 0; x < row; x++) {
//             let extraClasses = '';
//             let currentField = getField(x, y);
//             let content = '';
//             let field = getField(x, y);
//             if (field.revealed) {
//                 if (currentField.hasBomb) {
//                     content = 'b'
//                     extraClasses = 'field-bomb';
//                 } else if (currentField.number > 0) {
//                     content = currentField.number;
//                     extraClasses = 'field-' + currentField.number;
//                 }
//             }
//             html += `
//             <div id="field${x}${y}" onclick="checkField(${x},${y})" class="field ${extraClasses}"> ${content}</div>
//             `;
//         }
//         html += `</div>`;
//     }
//     gamefield.innerHTML = html;
// }