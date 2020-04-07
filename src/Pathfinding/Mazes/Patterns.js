export function smilyFaceMaze(grid){
    var visited = []
    var current = grid[10][10];
    current.wall = true;
    visited.push(current)
    // for(var x = 16; x <=19; x++){

    //     grid[x][4].wall = true;
    //     grid[x][5].wall = true;
    //     grid[x][6].wall = true;
    //     grid[x][7].wall = true;
    //     grid[x][18].wall = true;
    //     grid[x][19].wall = true;
    //     grid[x][20].wall = true;
    //     grid[x][21].wall = true;

    //     visited.push(grid[x][4])
    //     visited.push(grid[x][5])
    //     visited.push(grid[x][6])
    //     visited.push(grid[x][7])
    //     visited.push(grid[x][18])
    //     visited.push(grid[x][19])
    //     visited.push(grid[x][20])
    //     visited.push(grid[x][21])
    // }


    // for(var x = 25; x <=28; x++){
    //     visited.push(grid[x][4])
    //     visited.push(grid[x][5])
    //     visited.push(grid[x][6])
    //     visited.push(grid[x][7])
    //     visited.push(grid[x][18])
    //     visited.push(grid[x][19])
    //     visited.push(grid[x][20])
    //     visited.push(grid[x][21])
    // }

    // for(var x = 20; x <= 25; x++){
    //     visited.push(grid[x][20])
    //     visited.push(grid[x][21])
    //     visited.push(grid[x][22])
    // }
    console.log(visited);
    return visited;
}