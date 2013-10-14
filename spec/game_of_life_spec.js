describe("Game of Life", function(){
  describe("under population", function(){
    it("there are no alive neighbours", function () {
      var newGrid = step([[0,0,0],
                          [0,1,0],
                          [0,0,0]]);

      expect(center(newGrid)).toEqual(0);
    });

    it("there is one alive neighbours", function () {
      var newGrid = step([[0,0,0],
                          [1,1,0],
                          [0,0,0]]);

      expect(center(newGrid)).toEqual(0);
    });
  });

  describe("stability", function(){
    it("there are two alive neighbours", function () {
      var newGrid = step([[0,0,0],
                          [1,1,1],
                          [0,0,0]]);

      expect(center(newGrid)).toEqual(1)
    });

    it("there are exactly three alive neighbours", function () {
      var newGrid = step([[0,1,0],
                          [0,1,1],
                          [0,0,1]]);

      expect(center(newGrid)).toEqual(1);
    });
  });

  describe("over population", function(){
    it("there are more than three alive neighbours", function () {
      var newGrid = step([[0,1,0],
                          [1,1,1],
                          [0,1,0]]);

      expect(center(newGrid)).toEqual(0);
    });
  });

  describe("reproduction", function(){
    it("there are exactly three alive neighbours", function () {
      var newGrid = step([[0,1,0],
                          [0,0,1],
                          [0,0,1]]);

      expect(center(newGrid)).toEqual(1);
    });

    it("expands the grid", function(){
      var newGrid = step([[1,1,1]]);

      expect(newGrid).toEqual([[0,0,1,0,0],
                               [0,0,1,0,0],
                               [0,0,1,0,0]]);
    })
  });
});

function center(grid){
  return grid[1][1]
}