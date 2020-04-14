export function createDisplay(length) {
    var display = []
    for (var index = 0; index < length.length; index++){
            display.push(length[index]);
    }
    return display;
}

export function handlePush(stack, index) {
    var selected = getNode(stack, index - 1)
    document.getElementById(`node-${index}`).classList.add('node-current');
    // document.getElementById(`node-${index}`).classList.add('node-visited');
    // animateGoingIntoStack(stack, index - 1)
}

export function handlePop(stack, index) {
    var selected = getNode(stack, index + 1);
    document.getElementById(`node-${index+1}`).classList.remove('node-visited');
}

function getNode(stack, index) {
    var selected = stack[index];
    return selected;
}