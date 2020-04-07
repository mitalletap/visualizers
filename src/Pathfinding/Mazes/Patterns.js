export function smilyFaceMaze(grid){
    var visited = []
    var values = [7, 8, 16, 17, 18];

    for(var x = 0; x < 19; x++){
        if(values.includes(x)){
            visited.push(grid[28][x])
            visited.push(grid[29][x])
            visited.push(grid[39][x])
            visited.push(grid[40][x])
        }
    }

    for(var x = 30; x <= 38; x++){
        visited.push(grid[x][18])
    }

    for(var x = 30; x <= 38; x++){
        visited.push(grid[x][19])
    }
    return visited;
}