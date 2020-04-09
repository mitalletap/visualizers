
export function dijkstra(grid, start, end){
    const visited = [];
    var start = getStart(grid);
    start.distance = 0;
    const unvisited = getAllNodes(grid);

    while(!!unvisited.length) {
        sortCellsByDistance(unvisited);
        // Sets the closest cell to the first in the array
        const closestCell = unvisited.shift();
        
        // If the current closest cell is a wall, continue
        if(closestCell.wall === true){
            continue;
        }

        // If the current closest cell has a distance of infinity, return the visited cells array, 
        // add it to the visited cells array and set the "VISITED" attribute to true
        if(closestCell.distance === Infinity) {
            return visited;
        }
        closestCell.visited = true;
        visited.push(closestCell);

        // If the current closest cell is the destination call, return the visited cells array
        if(closestCell === end) {
            return visited;
        };
        updateNeighbors(closestCell, grid);
    }
}


// Gets each cell from the 2D grid and stores it (with its props) in an array
function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const cell of row) {
            nodes.push(cell);
        }
    }
    return nodes;
}

// Sorts the nodes based on the distance between the current node and the next node
function sortCellsByDistance(cells) {
    cells.sort((a, b) => a.distance - b.distance);
}


function updateNeighbors(cell, grid) {
    const unvisited = getNeighbors(cell, grid);
    for (const neighbor of unvisited) {
        neighbor.distance = cell.distance + 1;
        neighbor.previous = cell;
    }
}

function getNeighbors(cell, grid) {
    const neighbors = [];
    const { col, row } = cell;
    // Gets the Top Cell
    if(row > 0)
        neighbors.push(grid[row - 1][col])
    // Gets the Bottom Cell
    if(row < grid.length - 1)
        neighbors.push(grid[row + 1][col])
    // Gets the Left Cell
    if(col > 0)
        neighbors.push(grid[row][col - 1]);
    // Gets the Right Cell
    if(col < grid[0].length - 1)
        neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.visited);
}

export function getShortestPath(end) {
    const pathOrder = [];
    let currentCell = end;
    if(currentCell.previous === null){
    } else {
        while(currentCell !== null) {
            pathOrder.unshift(currentCell);
            currentCell = currentCell.previous;
        } 
    }
    return pathOrder;
}


function getStart(grid) {
    var start;
    for(var col = 0; col < grid.length; col++){
        for(var row = 0; row < grid[0].length; row++){
            if(grid[col][row].startCell === true){
                start = grid[col][row];
            }
        }
    }
    return start;
}