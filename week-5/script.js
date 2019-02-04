// Keep track of the highlighted cell for later
let selectedCell = [1, 1];
const defaultBorder = "1px solid blue";
const selectedBorder = "3px solid blue";

// Some basic stuff for presentation's sake
document.body.color = "#000000e6";
document.body.style.textAlign = "center";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.height = "100vh";
document.body.style.flexDirection = "column";

// Create base table element and append to body
let theTable = document.createElement("table");
theTable.style.width = "100px";
theTable.style.height = "100px";
theTable.style.backgroundColor = "pink";
document.body.appendChild(theTable);

// More boilerplate to create the table structure
let tableHeadContainer = document.createElement("thead");
document.getElementsByTagName("table")[0].appendChild(tableHeadContainer);
let tableRow = document.createElement("tr");
document.getElementsByTagName("thead")[0].appendChild(tableRow);


// Header things
for (let i = 1; i < 5; i++) {
  let tableHeader = document.createElement("th");
  tableHeader.style.minWidth = "100px";
  // Creates an empty blank header at the top left as per the acceptance criteria
    tableHeader.innerText = `Header ${i}`;
  document.getElementsByTagName("tr")[0].appendChild(tableHeader);
}

// Table body things
let tableBodyContainer = document.createElement("tbody");
document.getElementsByTagName("table")[0].appendChild(tableBodyContainer);

// Create all of the table cells
for (let j = 1; j < 5; j++) {
  let tableContentsRow = document.createElement("tr");
  tableContentsRow.id = `table-row-${j}`;
  document.getElementsByTagName("tbody")[0].appendChild(tableContentsRow);
  for (let k = 1; k < 5; k++) {
    let tableRowData = document.createElement("td");
    tableRowData.innerText = `${j}, ${k}`;
    tableRowData.id = `cell-${j}-${k}`;
    tableRowData.style.border = defaultBorder;
    document.getElementById(`table-row-${j}`).appendChild(tableRowData);
  }
}

let buttonsContainer = document.createElement("div");
buttonsContainer.id = "buttons-container";
buttonsContainer.style.marginTop = "20px";
buttonsContainer.style.display = "flex";
buttonsContainer.style.padding = "5px";

// Set up the buttons
document.body.appendChild(buttonsContainer);

let upButton = document.createElement("div");
upButton.style.border = "1px solid black";
upButton.style.padding = "4px";
upButton.style.margin = "5px";
upButton.innerText = "Go up"
upButton.id = "go-up";
upButton.style.cursor = "pointer";
upButton.addEventListener("click", () => moveToCell("up"));
document.getElementById("buttons-container").appendChild(upButton);

let downButton = document.createElement("div");
downButton.style.border = "1px solid black";
downButton.style.padding = "4px";
downButton.style.margin = "5px";
downButton.innerText = "Go down"
downButton.id = "go-down";
downButton.style.cursor = "pointer";
downButton.addEventListener("click", () => moveToCell("down"));
document.getElementById("buttons-container").appendChild(downButton);

let leftButton = document.createElement("div");
leftButton.style.border = "1px solid black";
leftButton.style.padding = "4px";
leftButton.style.margin = "5px";
leftButton.innerText = "Go left"
leftButton.id = "go-left";
leftButton.style.cursor = "pointer";
leftButton.addEventListener("click", () => moveToCell("left"));
document.getElementById("buttons-container").appendChild(leftButton);

let rightButton = document.createElement("div");
rightButton.style.border = "1px solid black";
rightButton.style.padding = "4px";
rightButton.style.margin = "5px";
rightButton.innerText = "Go right"
rightButton.id = "go-right";
rightButton.style.cursor = "pointer";
rightButton.addEventListener("click", () => moveToCell("right"));
document.getElementById("buttons-container").appendChild(rightButton);

let highlightCellButton = document.createElement("div");
highlightCellButton.style.border = "1px solid black";
highlightCellButton.style.padding = "4px";
highlightCellButton.style.margin = "5px";
highlightCellButton.innerText = "Mark cell"
highlightCellButton.id = "highlight-cell";
highlightCellButton.style.cursor = "pointer";
highlightCellButton.addEventListener("click", () => highlightCell());
document.getElementById("buttons-container").appendChild(highlightCellButton);


// Set the first cell as the selected on as per the AC
moveToCell(false, ...selectedCell);

// Helper methods

// Gets the cell by its id and highlights the cell
function highlightCell() {
  let cellToHighlight = document.getElementById(`cell-${selectedCell[0]}-${selectedCell[1]}`);
  cellToHighlight.style.backgroundColor = "yellow";
}

// Gets the cell by its id and updates the border's style to show that it's selected
function updateCellBorder() {
  newCell = document.getElementById(`cell-${selectedCell[0]}-${selectedCell[1]}`);
  newCell.style.border = selectedBorder;
}

function moveToCell(dir, y, x) {
  // If we don't provide a direction, we're using it to initiate the table
  if (!dir) {
    let cell = document.getElementById(`cell-${x}-${y}`);
    cell.style.border = "3px solid blue";
    // Short-circuit out of the function
    return;
  }
  
  let oldCell = document.getElementById(`cell-${selectedCell[0]}-${selectedCell[1]}`);
  let newXCoord = null;
  let newYCoord = null;
  
  // Basic algorithm goes like this:
  // Get the new coordinate based on the direction
  // Evaluate if the direction is legal. If not, stop immediately.
  // Otherwise, restore the original border of the current cell and select the next cell
  // Note that selectedCell has the schema [yCoordinate, xCoordinate]
  switch (dir) {
    case "up":
      newYCoord = selectedCell[0] - 1;
      if (newYCoord < 1) {
        return;
      }
      oldCell.style.border = defaultBorder;
      selectedCell[0] = newYCoord;
      updateCellBorder();
      break;
    case "down":
      newYCoord = selectedCell[0] + 1;
      if (newYCoord > 4) {
        return;
      }
      oldCell.style.border = defaultBorder;
      selectedCell[0] = newYCoord;
      updateCellBorder();
      break;
    case "right":
      newXCoord = selectedCell[1] + 1;
      if (newXCoord > 4) {
        return;
      }
      oldCell.style.border = defaultBorder;
      selectedCell[1] = newXCoord;
      updateCellBorder();
      break;
    case "left":
      newXCoord = selectedCell[1] - 1;
      if (newXCoord < 1) {
        return;
      }
      oldCell.style.border = defaultBorder;
      selectedCell[1] = newXCoord;
      updateCellBorder();
      break;
  } 
}