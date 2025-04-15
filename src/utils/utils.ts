export const getAdjacentIndices = (index: number, width: number, height: number): number[] => {
    const row = Math.floor(index / width);
    const col = index % width;
  
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1], [1, 0],  [1, 1],
    ];
  
    return directions
      .map(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width) {
          return newRow * width + newCol;
        }
        return -1;
      })
      .filter((i) => i >= 0);
  };

  export const getLevelConfig = (level: "simple" | "medium" | "hard") => {
    switch (level) {
      case "simple":
        return { width: 8, height: 8, mines: 10 };
      case "medium":
        return { width: 16, height: 16, mines: 40 };
      case "hard":
        return { width: 32, height: 16, mines: 100 };
      default:
        return { width: 8, height: 8, mines: 10 };
    }
  };