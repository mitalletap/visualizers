export function recursiveDivisionMaze(grid, height, width){
    var visited = recursiveDivision(grid, 1, width - 2, 1, height - 2);
    return visited;
}


export function recursiveDivision(grid, minWidth, maxWidth, minHeight, maxHeight){

    var visited = []
    var orientation;
    var windowWidth = maxWidth - minWidth + 3;
    var windowHeight = maxHeight - minHeight + 3;
    windowWidth > windowHeight ? orientation = 'vertical' : orientation = 'horizontal';
    

    if(windowWidth <= 2 || windowHeight <= 2){
        return visited;
    }

    if(orientation === 'vertical'){
        var possibleColumns = [];
        var openRows = [];
        var randomColumnIndex;
        var randomRowIndex;
        var selectedColumn;
        var selectedRow;

        for(var a = minWidth; a <= maxWidth; a += 1){
            possibleColumns.push(a);
        }
        for(var b = minHeight; b <= maxHeight + 1; b += 1){
            openRows.push(b);
        }
        console.log("Vertical")
        console.log(openRows)

        randomColumnIndex = Math.floor(Math.random() * possibleColumns.length / 2.05);
        randomRowIndex = Math.floor(Math.random() * openRows.length / 2.05);

        selectedColumn = possibleColumns[randomColumnIndex];
        selectedRow = openRows[randomRowIndex];

        var realMinHeight = minHeight;
        var realMaxHeight = maxHeight;

        for(let a = realMinHeight; a <= realMaxHeight; a+=2){
            if(a === selectedRow) { continue };
            visited.push({
                row: a,
                col: selectedColumn,
                // wall: Math.random() >= 0.6
                wall: true
            })
        }
        
        visited = visited.concat(recursiveDivision(grid, minWidth, selectedColumn - 1, minHeight, maxHeight ));
        visited = visited.concat(recursiveDivision(grid, selectedColumn + 1, maxWidth, minHeight, maxHeight));
    } else {

        var possibleRows = [];
        var openColumns = [];
        var randomColumnIndex;
        var randomRowIndex;
        var selectedColumn;
        var selectedRow;

        for(var a = minHeight; a <= maxHeight; a += 1){
            possibleRows.push(a);
        }

        for(var b = minWidth; b <= maxWidth + 1; b += 1){
            openColumns.push(b);
        }
        console.log("Horizontal")
        console.log(openColumns)

        randomRowIndex = Math.floor(Math.random() * possibleRows.length / 2.05);
        randomColumnIndex = Math.floor(Math.random() * openColumns.length / 2.05);

        selectedRow = possibleRows[randomRowIndex];
        selectedColumn = openColumns[randomColumnIndex]

        var realMinWidth = minWidth;
        var realMaxWidth = maxWidth;


        for(var a = realMinWidth; a <= realMaxWidth; a+=2){
            if(a === selectedColumn) { continue };
            visited.push({
                row: selectedRow,
                col: a,
                // wall: Math.random() >= 0.6
                wall: true
            })
        }

        visited = visited.concat(recursiveDivision(grid, minWidth, maxWidth, minHeight, selectedRow - 1,));
        visited = visited.concat(recursiveDivision(grid, minWidth, maxWidth, selectedRow + 1, maxHeight));

    }

    return visited;
}




















function chooseOrientation(width, height) {
    if(width < height){
        return 0
    } else if(height < width){
        return 1
    } else {
        var value;
        Math.random(2) === 0 ? value = 0 : value = 1;
        return value;
    }
}



// for (var x = 2; x < 3; x++){
    //     for(var y = 0; y < 10; y++){
    //         const cell = grid[x][y];
    //         cell.wall = true;
    //         visited.push(cell);
    //     }
    // }





    // export function recursiveDivision(grid, x, y, w, h, visited){
    
    //     // Base Case to Determine if Maze should keep constructing
    //     if(w < 10 || h < 10)
    //         return;
    
    //     // Check to determine orientation
    //     // If width is less than the height, set the orientation to Horizontal
    //     // If the width is greater than the height, set the orientation to Vertical
    
    //     var orientation;
    //     w <= h ? orientation = 1 : orientation = 0;
    //     console.log(orientation === 1 ? "Vertical" : "Horizontal");
    //     console.log(w, h);
    //     // Get Vertical Split
    //     if(orientation === 0){
    //             // Get a random vertical line and set it as the split
    //         console.log("Width is lower than the height");
    //         var split = Math.floor(Math.random() * w) + 1
    //         var entrance = Math.floor(Math.random() * h) + 1;
    //         // console.log(split, entrance, split - x - 1, w - split - 1)
    
    //         for(var a = 0; a <= h; a++){
    //             if(a !== entrance){
    //                 const cell = grid[split][a]
    //                 cell.wall = true;
    //                 visited.push(cell);
    //             }
    //         }
            
    //         // recursiveDivision(grid, 0,         0, split - x - 1,    h, visited);
    //         // recursiveDivision(grid, w - split - 1, y, w,            h, visited);
            
    //     }
    
    //     return visited;
    // }