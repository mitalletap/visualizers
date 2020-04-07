// Height === Rows
// Width === Columns

export function recursiveDivisionMaze(height, width){
    // Starting Height and Width should be 1 and Ending Height and Width should be -1 to account for the border
    var visited = recursiveDivision(1, width - 1, 1, height - 1);

    return visited;
}

// maxCol = 30
// maxRow = 15
export function recursiveDivision(minRows, maxRows, minCols, maxCols){ 
    var visited = [];
    var orientation;
    var windowWidth = maxRows - minRows;
    var windowHeight = maxCols - minCols;
    console.log(windowWidth, windowHeight)
    windowWidth > windowHeight ? orientation = 'vertical' : orientation = 'horizontal';
    console.log(orientation)

    if(minCols > maxCols|| minRows > maxRows){
        return visited;
    }

    if(windowWidth <= 2 || windowHeight <= 2){
        return visited;
    }


    if(orientation === 'vertical'){
        console.log("Bisecting Vertically!")
        var possibleWalls = [];
        var possibleOpenings = [];
        var randomColumn;
        var randomRow;
        // Add all height values to the list of possible walls
        for(var a = minRows; a < maxRows; a++){
            possibleWalls.push(a);
        }

        // Add all width values to the list of possible openings
        for(var a = minCols; a < maxCols; a++){
            possibleOpenings.push(a);
        }

        console.log("MAX ROWS: " + maxRows)
        console.log("MAX COLUMNS: " + maxCols)
        console.log(possibleOpenings.length)

        randomColumn = Math.floor(Math.random() * (possibleOpenings.length - minRows) + minRows);
        randomRow = Math.floor(Math.random() * (possibleWalls.length - minCols) + minCols);
        
        console.log(minRows, randomRow, maxRows)
        console.log(minCols, randomColumn, maxCols)

        for(var a = minRows; a <= maxRows; a++){
            if(a === randomRow) { continue };
            visited.push({
                row: randomColumn,
                col: a,
                wall: true
            })
        }
        // console.log(`Vertical Bisection Recursive Left Values MinCol: ${minCols} and MaxCol: ${randomColumn - 1}`)
        // visited = visited.concat(recursiveDivision(minRows, maxRows, minCols, randomColumn - 1));
        // console.log(`Vertical Bisection Recursive Right Values MinCol: ${randomColumn + 1} and MaxCol: ${maxCols}`)
        // visited = visited.concat(recursiveDivision(minRows, maxRows, randomColumn + 1, maxCols));


    } else {

        console.log("Bisecting Horizontally!")
        var possibleWalls = [];
        var possibleOpenings = [];
        var randomColumn;
        var randomRow;
        // Add all height values to the list of possible walls

        for(var a = minRows; a < maxRows; a++){
            possibleOpenings.push(a);
        }

        // Add all width values to the list of possible openings
        for(var a = minCols; a < maxCols; a++){
            possibleWalls.push(a);
        }

        console.log("MAX ROWS: " + maxRows)
        console.log("MAX COLUMNS: " + maxCols)
        console.log(possibleOpenings.length)

        randomRow = Math.floor(Math.random() * (possibleOpenings.length - minRows) + minRows);
        randomColumn = Math.floor(Math.random() * (possibleWalls.length - minCols) + minCols);
        
        console.log(minRows, randomRow, maxRows)
        console.log(minCols, randomColumn, maxCols)

        for(var a = minCols; a <= maxCols; a++){
            if(a === randomColumn) { continue };
            visited.push({
                row: a,
                col: randomRow,
                wall: true
            })
        }
        // console.log(`Horizontal Bisection Recursive Left Values MinRow: ${minRows} and maxRows: ${randomRow - 1}`)
        // visited = visited.concat(recursiveDivision(minRows, randomRow - 1, minCols, maxCols));

        // console.log(`Horizontal Bisection Recursive Right Values MinRow: ${randomRow + 1} and MaxRow: ${maxRows}`)
        // visited = visited.concat(recursiveDivision(randomRow + 1, maxRows, minCols, maxCols));




    }
    return visited;

}





























































// export function recursiveDivision(grid, minHeight, maxHeight, minWidth, maxWidth, orientation){

//     var visited = []
//     var orientation;
//     var windowWidth = maxWidth - minWidth;
//     var windowHeight = maxHeight - minHeight;

//     if(windowWidth <= 3 || windowHeight <= 3){
//         return visited;
//     }

//     // if(maxHeight <= minHeight || maxWidth <= minWidth){
//     //     return visited;
//     // }

//     if(orientation === 'vertical'){
//         console.log("Entering Vertical");
//         var possibleColumns = [];
//         var openRows = [];
//         var randomColumnIndex;
//         var randomRowIndex;
//         var selectedColumn;
//         var selectedRow;

//         for(var a = minWidth; a < maxWidth; a += 1){
//             possibleColumns.push(a);
//         }
//         for(var b = minHeight; b < maxHeight; b += 1){
//             openRows.push(b);
//         }

//         randomColumnIndex = Math.floor(Math.random() * possibleColumns.length);
//         randomRowIndex = Math.floor(Math.random() * openRows.length);

//         selectedColumn = possibleColumns[randomColumnIndex];
//         selectedRow = openRows[randomRowIndex];


//         console.log(`Vertical Split Split: selected Row at ${selectedRow} with Entrance at ${selectedColumn}`)
//         console.log(`Widths/Cols ${minWidth} and ${maxWidth} and Heights/Rows ${minHeight} and ${maxHeight}`)
//         for(var a = minHeight; a <= maxHeight; a++){
//             if(a === selectedRow) { continue };
//             visited.push({
//                 row: a,
//                 col: selectedColumn,
//                 wall: true
//             })
//         }

        
//         // visited = visited.concat(recursiveDivision(grid, minWidth, selectedColumn - 2, minHeight, maxHeight));
//         // visited = visited.concat(recursiveDivision(grid, selectedColumn + 2, maxWidth, minHeight, maxHeight));
        

//         if (maxHeight - minHeight > selectedColumn - 1 - minWidth) {
//             // console.log(`HORIZONTAL: ${maxHeight} - ${minHeight} > ${selectedColumn} - 1 - ${minWidth}`);
//             visited = visited.concat(recursiveDivision(grid, minHeight, maxHeight, minWidth, selectedColumn - 1, 'horizontal'));
//           } else {
//             // console.log(`VERTICAL: ${maxHeight} - ${minHeight} < ${selectedColumn} - 1 - ${minWidth}`);
//             visited = visited.concat(recursiveDivision(grid, minHeight, maxHeight, minWidth, selectedColumn - 1, orientation));
//           }
//           if (maxHeight - minHeight > maxWidth - (selectedColumn + 1)) {
//             // console.log(`HORIZONTAL: ${maxHeight} - ${minHeight} > ${maxWidth} - (${selectedColumn} + 1) `);
//             visited = visited.concat(recursiveDivision(grid, minHeight, maxHeight, selectedColumn + 1, maxWidth, 'horizontal'));
//           } else {
//             // console.log(`VERTICAL: ${maxHeight} - ${minHeight} < ${maxWidth} - (${selectedColumn} + 1) `);
//             visited = visited.concat(recursiveDivision(grid, minHeight, maxHeight, selectedColumn + 1, maxWidth, orientation));
//         }

//     } else {
//         console.log("Entering Horizontal");
//         var possibleRows = [];
//         var openColumns = [];
//         var randomColumnIndex;
//         var randomRowIndex;
//         var selectedColumn;
//         var selectedRow;

//         for(var a = minHeight; a < maxHeight; a+=1){
//             possibleRows.push(a);
//         }

//         for(var b = minWidth; b < maxWidth; b+=1){
//             openColumns.push(b);
//         }

//         randomRowIndex = Math.floor(Math.random() * possibleRows.length);
//         randomColumnIndex = Math.floor(Math.random() * openColumns.length);

//         selectedRow = possibleRows[randomRowIndex];
//         selectedColumn = openColumns[randomColumnIndex]

//         for(var a = minWidth; a <= maxWidth; a++){
//             if(a === selectedColumn) { continue };
//             visited.push({
//                 row: selectedRow,
//                 col: a,
//                 wall: true
//             })
//         }

//         // visited = visited.concat(recursiveDivision(grid, minWidth, maxWidth, minHeight, selectedRow - 2));
//         // visited = visited.concat(recursiveDivision(grid, minWidth, maxWidth, selectedRow + 2, maxHeight));

//         console.log(`Horizontal Split: selected Row at ${selectedRow} with Entrance at ${selectedColumn}`)
//         console.log(`Widths/Cols ${minWidth} and ${maxWidth} and Heights/Rows ${minHeight} and ${maxHeight}`)
//         if (selectedRow - 1 - minHeight > maxWidth - minWidth) {
//             // console.log(`HORIZONTAL: ${selectedRow} - 1 - ${minHeight} > ${maxWidth} - ${minWidth}`);
//             visited = visited.concat(recursiveDivision(grid, minHeight, selectedRow - 1, minWidth, maxWidth, orientation));
//         } else {
//             // console.log(`VERTICAL: ${selectedRow} - 1 - ${minHeight} < ${maxWidth} - ${minWidth}`);
//             visited = visited.concat(recursiveDivision(grid, minHeight, selectedRow - 1, minWidth, maxWidth, 'vertical'));
//         }
//         if (maxHeight - (selectedRow + 1) > maxWidth - minWidth) {
//             // console.log(`HORIZONTAL: ${maxHeight} - (${selectedRow} + 1)  > ${maxWidth} - ${minWidth}`);
//             visited = visited.concat(recursiveDivision(grid, selectedRow + 1, maxHeight, minWidth, maxWidth, orientation));
//         } else {
//             // console.log(`VERTICAL: ${maxHeight} - (${selectedRow} + 1)  < ${maxWidth} - ${minWidth}`);
//             visited = visited.concat(recursiveDivision(grid, selectedRow + 1, maxHeight, minWidth, maxWidth, 'vertical'));
//         }
//     }

//     return visited;
// }

// export function recursiveDivision(grid, minHeight, maxHeight, minWidth, maxWidth, orientation){

//     var visited = []
//     var orientation;
//     var windowWidth = maxWidth - minWidth;
//     var windowHeight = maxHeight - minHeight;

//     if(windowWidth <= 3 || windowHeight <= 3){
//         return visited;
//     }

//     // if(maxHeight <= minHeight || maxWidth <= minWidth){
//     //     return visited;
//     // }

//     if(orientation === 'vertical'){
//         console.log("Entering Vertical");
//         var possibleColumns = [];
//         var openRows = [];
//         var randomColumnIndex;
//         var randomRowIndex;
//         var selectedColumn;
//         var selectedRow;

//         for(var a = minWidth; a < maxWidth; a += 1){
//             possibleColumns.push(a);
//         }
//         for(var b = minHeight; b < maxHeight; b += 1){
//             openRows.push(b);
//         }

//         randomColumnIndex = Math.floor(Math.random() * possibleColumns.length);
//         randomRowIndex = Math.floor(Math.random() * openRows.length);

//         selectedColumn = possibleColumns[randomColumnIndex];
//         selectedRow = openRows[randomRowIndex];


//         console.log(`Vertical Split Split: selected Row at ${selectedRow} with Entrance at ${selectedColumn}`)
//         console.log(`Widths/Cols ${minWidth} and ${maxWidth} and Heights/Rows ${minHeight} and ${maxHeight}`)
//         for(var a = minHeight; a <= maxHeight; a++){
//             if(a === selectedRow) { continue };
//             visited.push({
//                 row: a,
//                 col: selectedColumn,
//                 wall: true
//             })
//         }

        
//         // visited = visited.concat(recursiveDivision(grid, minWidth, selectedColumn - 2, minHeight, maxHeight));
//         // visited = visited.concat(recursiveDivision(grid, selectedColumn + 2, maxWidth, minHeight, maxHeight));
        

//         if (maxHeight - minHeight > selectedColumn - 1 - minWidth) {
//             // console.log(`HORIZONTAL: ${maxHeight} - ${minHeight} > ${selectedColumn} - 1 - ${minWidth}`);
//             visited = visited.concat(recursiveDivision(grid, minHeight, maxHeight, minWidth, selectedColumn - 1, 'horizontal'));
//           } else {
//             // console.log(`VERTICAL: ${maxHeight} - ${minHeight} < ${selectedColumn} - 1 - ${minWidth}`);
//             visited = visited.concat(recursiveDivision(grid, minHeight, maxHeight, minWidth, selectedColumn - 1, orientation));
//           }
//           if (maxHeight - minHeight > maxWidth - (selectedColumn + 1)) {
//             // console.log(`HORIZONTAL: ${maxHeight} - ${minHeight} > ${maxWidth} - (${selectedColumn} + 1) `);
//             visited = visited.concat(recursiveDivision(grid, minHeight, maxHeight, selectedColumn + 1, maxWidth, 'horizontal'));
//           } else {
//             // console.log(`VERTICAL: ${maxHeight} - ${minHeight} < ${maxWidth} - (${selectedColumn} + 1) `);
//             visited = visited.concat(recursiveDivision(grid, minHeight, maxHeight, selectedColumn + 1, maxWidth, orientation));
//         }

//     } else {
//         console.log("Entering Horizontal");
//         var possibleRows = [];
//         var openColumns = [];
//         var randomColumnIndex;
//         var randomRowIndex;
//         var selectedColumn;
//         var selectedRow;

//         for(var a = minHeight; a < maxHeight; a+=1){
//             possibleRows.push(a);
//         }

//         for(var b = minWidth; b < maxWidth; b+=1){
//             openColumns.push(b);
//         }

//         randomRowIndex = Math.floor(Math.random() * possibleRows.length);
//         randomColumnIndex = Math.floor(Math.random() * openColumns.length);

//         selectedRow = possibleRows[randomRowIndex];
//         selectedColumn = openColumns[randomColumnIndex]

//         for(var a = minWidth; a <= maxWidth; a++){
//             if(a === selectedColumn) { continue };
//             visited.push({
//                 row: selectedRow,
//                 col: a,
//                 wall: true
//             })
//         }

//         // visited = visited.concat(recursiveDivision(grid, minWidth, maxWidth, minHeight, selectedRow - 2));
//         // visited = visited.concat(recursiveDivision(grid, minWidth, maxWidth, selectedRow + 2, maxHeight));

//         console.log(`Horizontal Split: selected Row at ${selectedRow} with Entrance at ${selectedColumn}`)
//         console.log(`Widths/Cols ${minWidth} and ${maxWidth} and Heights/Rows ${minHeight} and ${maxHeight}`)
//         if (selectedRow - 1 - minHeight > maxWidth - minWidth) {
//             // console.log(`HORIZONTAL: ${selectedRow} - 1 - ${minHeight} > ${maxWidth} - ${minWidth}`);
//             visited = visited.concat(recursiveDivision(grid, minHeight, selectedRow - 1, minWidth, maxWidth, orientation));
//         } else {
//             // console.log(`VERTICAL: ${selectedRow} - 1 - ${minHeight} < ${maxWidth} - ${minWidth}`);
//             visited = visited.concat(recursiveDivision(grid, minHeight, selectedRow - 1, minWidth, maxWidth, 'vertical'));
//         }
//         if (maxHeight - (selectedRow + 1) > maxWidth - minWidth) {
//             // console.log(`HORIZONTAL: ${maxHeight} - (${selectedRow} + 1)  > ${maxWidth} - ${minWidth}`);
//             visited = visited.concat(recursiveDivision(grid, selectedRow + 1, maxHeight, minWidth, maxWidth, orientation));
//         } else {
//             // console.log(`VERTICAL: ${maxHeight} - (${selectedRow} + 1)  < ${maxWidth} - ${minWidth}`);
//             visited = visited.concat(recursiveDivision(grid, selectedRow + 1, maxHeight, minWidth, maxWidth, 'vertical'));
//         }
//     }

//     return visited;
// }



// if (randomRowIndex - 2 - minHeight > maxWidth - minWidth) {
//     recursiveDivisionMaze(grid, minWidth, maxWidth, minHeight, randomRowIndex - 2);
//   } else {
//     recursiveDivisionMaze(grid, minWidth, maxWidth, minHeight, randomRowIndex - 2);
//   }
//   if (maxHeight - (randomRowIndex + 2) > maxWidth - minWidth) {
//     recursiveDivisionMaze(grid, minWidth, maxWidth, randomRowIndex + 2, maxHeight, );
//   } else {
//     recursiveDivisionMaze(grid, minWidth, maxWidth, randomRowIndex + 2, maxHeight);
//   }

// height === rows;
// width === cols;


