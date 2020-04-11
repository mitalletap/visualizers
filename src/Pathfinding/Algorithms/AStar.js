
export function astar(grid, start, end){
    var open = []
    var closed = []
    start = addNeighbors(start, grid, grid.length, grid[0].length)
    start.f = start.g = start.h = 0;
    open.push(start);
    while(open.length > 0) {
        var current = getSmallestElementInList(open);

        if(current === end){
            var curr = current;
            var ret = []
            while(curr.parent) {
                ret.push(curr);
                curr = curr.parent;
            }
            ret.push(curr);
            return ret.reverse();
        }

        closed.push(current);
        open = removeFromList(open, current);
        current = addNeighbors(current, grid, grid.length, grid[0].length)
        var neighbors = current.neighbors

        for(var i = 0; i < neighbors.length; i++){
            var neighbor = neighbors[i];
            if(closed.includes(neighbor) || neighbor.wall === true)
                continue;

            var gScore = current.g + 1;
            var gScoreIsBest = false;

            if(!open.includes(neighbor)){
                gScoreIsBest = true;
                neighbor.h = heuristic(neighbor, end);
                open.push(neighbor);
            } else if(gScore < neighbor.g) {
                gScoreIsBest = true;
            }

            if(gScoreIsBest === true) {
                neighbor.parent = current;
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;
            }
        }
    }
    return []
}

function getSmallestElementInList(list) {
    var lowest = Number.MAX_SAFE_INTEGER;
    for(var i = 0; i < list.length; i++){
        if(list[i].f < lowest){
            lowest = list[i];
        }
    }
    return lowest;
}

function removeFromList(list, element) {
    for(var i = list.length - 1; i >= 0; i--){
        if(list[i] === element){
            list.splice(i, 1);
        }
    }
    return list
}

function addNeighbors(current, grid, cols, rows) {
    var col = current.col;
    var row = current.row;
    var neighborsArray = [];
    if(col < cols - 1){
        neighborsArray.push(grid[col + 1][row])
    }
    if(col > 0){
        neighborsArray.push(grid[col - 1][row])
    }
    if(row < rows - 1){
        neighborsArray.push(grid[col][row + 1])
    }
    if(row > 0){
        neighborsArray.push(grid[col][row - 1])
    }
    current.neighbors = neighborsArray;
    return current;
}

function heuristic(a, b) {
    var d1 = Math.pow(b.col - a.col, 2) + (Math.pow(b.row - a.row, 2))
    var d2 = Math.pow(b.col - a.col, 2) + (Math.pow(b.row - a.row, 2))
    return Math.sqrt(d1 + d2);
}
