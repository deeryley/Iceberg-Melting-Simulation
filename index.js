"use strict";

var container = document.getElementsByClassName("container");
var table = document.getElementsByTagName("table");
var rows, cols, grid;

const operations = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function genrateWater() {
  grid = createGrid();
  createHTMLFromGrid(grid);
  //checkColor();
  changeColor();
}

//loop through the table and check if the cell is 1 or 0
function checkColor() {
  let cells = table[0].getElementsByTagName("td");
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].value == "0") {
      cells[i].classList.add("isWater");
    } else {
      cells[i].classList.add("isIce");
    }
  }
}

// create a array with the input
function createGrid(rows, cols) {
  rows = parseInt(document.getElementById("rows").value);
  cols = parseInt(document.getElementById("cols").value);
  let grid = [];

  for (var i = 0; i < rows; i++) {
    grid.push([]);
    for (var j = 0; j < cols; j++) {
      grid[i].push(0);
    }
  }
  return grid;
}

// create a table with the input array
function createHTMLFromGrid(grid) {
  let table = document.createElement("table");
  for (let i = 0; i < grid.length; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < grid[i].length; j++) {
      let cell = document.createElement("td");
      //add event listener to cell
      //cell.addEventListener("click", () => console.log(grid));
      cell.value = grid[i][j];
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  container[0].appendChild(table);
}

//reset the table and grid
function resetTable() {
  container[0].removeChild(table[0]);
}

//when click on table cell  numbers change div class from isWater to isIce
function changeColor() {
  checkColor();
  let cells = table[0].getElementsByTagName("td");
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function (e) {
      //console.log(e.target.value);
      if (e.target.value == "0") {
        e.target.classList.remove("isWater");
        e.target.classList.add("isIce");
        e.target.value = "1";
        grid[e.target.parentNode.rowIndex][e.target.cellIndex] = 1;
        //console.log(grid);
      } else if (e.target.value == "1") {
        e.target.classList.remove("isIce");
        e.target.classList.add("isWater");
        e.target.value = "1";
        grid[e.target.parentNode.rowIndex][e.target.cellIndex] = 0;
        //console.log(grid);
      }
    });
  }
}

function getNeighborsCount(i, j) {
  let allPosibleIndexes = [
    [i - 1, j], // top
    [i, j + 1], // right
    [i + 1, j], // bottom
    [i, j - 1], // left
  ];

  let allPosibleValues = [];
  allPosibleIndexes.forEach(([i, j]) => {
    try {
      allPosibleValues.push(grid[i][j]);
    } catch (err) {}
  });

  let valuesArr = allPosibleValues.filter((v) => v != undefined);
  let count = valuesArr.reduce((a, b) => a + b, 0);
  //console.log(valuesArr);

  return count;
}

function startSimulation() {
  // if the cell has more than 3 neighbors it will be ice
  // if the cell has 2 or less neighbors it will be water
  rows = document.getElementById("rows").value;
  cols = document.getElementById("cols").value;

  let newGrid = [];
  for (let i = 0; i < rows; i++) {
    newGrid.push([]);

    for (let j = 0; j < cols; j++) {
      let neighborsCount = getNeighborsCount(i, j);
      console.log(`${getNeighborsCount(i, j)} neighbors for ${i}, ${j}`);

      if (getNeighborsCount(i, j) > 3) {
        //console.log(getNeighborsCount(i, j));
        newGrid[i][j] = 1;
      } else if (getNeighborsCount(i, j) < 3) {
        newGrid[i][j] = 0;
      } else {
        newGrid[i][j] = grid[i][j];
      }
    }
  }
  grid = newGrid;
  console.log(grid);
  //apply changes to the table
  checkColor();
}
