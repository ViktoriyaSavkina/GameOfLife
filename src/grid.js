(function(){
  window.step = _.compose(unwrap, executeStep, wrap);

  function unwrap(grid){
    return anyAliveCellsInBorder(grid) ? grid : removeBorder(grid);
  }

  function removeBorder(grid){
    var withoutFirstAndLastRow = grid.splice(1, grid.length - 2);
    var removeFirstAndLastColumn = function (row) {
      return row.splice(1, row.length - 2);
    }
    return _.map(withoutFirstAndLastRow, removeFirstAndLastColumn)
  }

  function anyAliveCellsInBorder(grid){
    var border = _.flatten([
      row(grid, 0),
      row(grid, grid.length - 1),
      column(grid, 0),
      column(grid, grid[0].length - 1)]);

    return _.any(border, isAlive);
  }

  function executeStep(grid){
    return _.map(grid, function(row, i){
      return _.map(row, function(cell, j){
        return calculateStateOfCell(grid, i, j);
      })
    });
  }

  function calculateStateOfCell(grid, i, j){
    var alive = aliveNeighbours(grid,i,j);
    if(alive < 2){
      return 0;
    } else if (alive == 2) {
      return grid[i][j];
    } else if (alive == 3){
      return 1;
    } else {
      return 0;
    }
  }

  function wrap(grid){
    var wrapped = _.map(grid, function(row){
      return [0].concat(row).concat([0]);
    });
    var length = wrapped[0].length;
    return [zeros(length)].concat(wrapped).concat([zeros(length)]);
  }

  function aliveNeighbours(grid,i,j){
    var neighbours = [
      [i - 1, j - 1],
      [i - 1, j],
      [i - 1, j + 1],
      [i, j - 1],
      [i, j + 1],
      [i + 1, j - 1],
      [i + 1, j],
      [i + 1, j + 1]
    ];

    var aliveCells = _.filter(neighbours, function(c){
      return grid[c[0]] && isAlive(grid[c[0]][c[1]]);
    });

    return aliveCells.length;
  }



  function row(grid, index){
    return grid[index]
  }

  function column(grid, index){
    return _.map(grid, function(row){return row[index]})
  }

  function zeros(n){
    return _.map(_.range(n), function(){return 0})
  }

  function isAlive(x){
    return x == 1;
  }
})();

