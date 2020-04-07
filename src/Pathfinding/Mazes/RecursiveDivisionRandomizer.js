export function recursiveDivisionRandomizerMaze(grid, height, width){
    var visited = recursiveDivisionRandomizer(grid, 1, width - 2, 1, height - 2);
    return visited;
}


export function recursiveDivisionRandomizer(grid, minWidth, maxWidth, minHeight, maxHeight){

    var visited = []
    var orientation;
    var windowWidth = maxWidth - minWidth;
    var windowHeight = maxHeight - minHeight;
    windowWidth > windowHeight ? orientation = 'vertical' : orientation = 'horizontal';

    if(windowWidth <= 1 || windowHeight <= 1){
        return visited;
    }

    if(orientation === 'vertical'){
        var possibleColumns = [];
        var openRows = [];
        var randomColumnIndex;
        var randomRowIndex;
        var selectedColumn;
        var selectedRow;

        for(var a = minWidth + 1; a <= maxWidth; a += 1){
            possibleColumns.push(a);
        }
        for(var b = minHeight + 1; b <= maxHeight + 1; b += 1){
            openRows.push(b);
        }
        console.log(possibleColumns)
        console.log(openRows)

        randomColumnIndex = Math.floor(Math.floor(Math.random() * possibleColumns.length));
        randomRowIndex = Math.floor(Math.floor(Math.random() * openRows.length));

        selectedColumn = possibleColumns[randomColumnIndex];
        selectedRow = openRows[randomRowIndex];


        console.log(`Horizontal Split: selected Column at ${selectedRow} with Entrance at ${selectedColumn} with heights ${minHeight} and ${maxHeight}`)
        for(var a = minHeight; a <= maxHeight; a+=1){
            if(a === selectedRow) { continue };
            visited.push({
                row: a,
                col: selectedColumn,
                wall: true
            })
        }
        
        visited = visited.concat(recursiveDivisionRandomizer(grid, minWidth, selectedColumn - 1, minHeight, maxHeight));
        visited = visited.concat(recursiveDivisionRandomizer(grid, selectedColumn + 1, maxWidth, minHeight, maxHeight));
    } else {
        var possibleRows = [];
        var openColumns = [];
        var randomColumnIndex;
        var randomRowIndex;
        var selectedColumn;
        var selectedRow;

        for(var a = minHeight + 1; a <= maxHeight; a += 1){
            possibleRows.push(a);
        }

        for(var b = minWidth + 1; b <= maxWidth + 1; b += 1){
            openColumns.push(b);
        }

        randomRowIndex = Math.floor(Math.floor(Math.random() * possibleRows.length));
        randomColumnIndex = Math.floor(Math.floor(Math.random() * openColumns.length));

        selectedRow = possibleRows[randomRowIndex];
        selectedColumn = openColumns[randomColumnIndex]
        console.log(`Vertical Split: selected Row at ${selectedRow} with Entrance at ${selectedColumn} with widths ${minWidth} and ${maxWidth}`)

        for(var a = minWidth; a <= maxWidth; a+=1){
            if(a === selectedColumn) { continue };
            visited.push({
                row: selectedRow,
                col: a,
                wall: true
            })
        }

        visited = visited.concat(recursiveDivisionRandomizer(grid, minWidth, maxWidth, minHeight, selectedRow - 1));
        visited = visited.concat(recursiveDivisionRandomizer(grid, minWidth, maxWidth, selectedRow + 1, maxHeight));

    }

    return visited;
}