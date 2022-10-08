"use strict";
var container = document.getElementsByClassName("container");
var table = document.getElementsByTagName("table");
var rows, cols, grid;

function genrateWater() {
  grid = createGrid();
  createHTMLFromGrid(grid);
  checkColor();
  changeColor();
}

//loop through the table and check if the cell is 1 or 0
function checkColor() {
  let cells = table[0].getElementsByTagName("td");
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].value == "1") {
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
      grid[i].push(1);
    }
  }

  //make all top botton left and right cells 0
  for (let i = 0; i < rows; i++) {
    grid[i][0] = 0;
    grid[i][cols - 1] = 0;
  }
  for (let i = 0; i < cols; i++) {
    grid[0][i] = 0;
    grid[rows - 1][i] = 0;
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
      cell.addEventListener("click", () => console.log(grid));
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

//when click on table cell even numbers change div class from isWater to isIce
function changeColor() {
  let cells = table[0].getElementsByTagName("td");
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function (e) {
      console.log(e.target.value);
      if (e.target.value == "1") {
        e.target.classList.remove("isWater");
        e.target.classList.add("isIce");
        e.target.value = "0";
        grid[e.target.parentNode.rowIndex][e.target.cellIndex] = 0;
        console.log(grid);
      } else if (e.target.value == "0") {
        e.target.classList.remove("isIce");
        e.target.classList.add("isWater");
        e.target.value = "1";
        grid[e.target.parentNode.rowIndex][e.target.cellIndex] = 1;
        console.log(grid);
      }
    });
  }
}
