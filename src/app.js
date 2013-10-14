!function(){

  var example = document.getElementById('example');
  var context = example.getContext('2d');

  function gridToCanvas(grid){
    var blocks = _.map(grid, function(row, i){
      return _.map(row, function(cell, j){
        var color = grid[i][j] == 1 ? 'black' : 'white';
        return {color: color, rect: [10*j, 10*i, 10, 10]}
      });
    });
    return _.flatten(blocks);
  }

  function renderGrid(grid) {
    _.each(gridToCanvas(grid), function(b){
      context.fillStyle = b.color;
      context.fillRect(b.rect[0], b.rect[1], b.rect[2], b.rect[3]);
    });
  }

  function render(grid){
    renderGrid(grid);
    setTimeout(function(){render(step(grid));}, 100);
  }

  function generateRandomGrid(n){
    var generateRow = function(){
      return _.map(_.range(n), function(){return _.random(0, 1)})
    }
    return _.map(_.range(n), generateRow)
  }

  render(generateRandomGrid(10));
}();