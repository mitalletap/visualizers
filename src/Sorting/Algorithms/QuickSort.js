export function quickSortAlgo(array) {
    const animations = [];
    if(array.length <= 1) return array;
    const auxArray = array.slice();
    quickSort(auxArray, 0, auxArray.length - 1, animations);
    console.log(auxArray)
    return animations;
}

function quickSort(arr, low, high, animations) {
    if(low < high) {
        var index = partition(arr, low, high, animations);
        quickSort(arr, low, index - 1, animations);
        quickSort(arr, index + 1, high, animations);
    }

}

function partition(arr, low, high, animations) {
    var pivot = arr[high];
    var i = (low - 1);

    for(var j = low; j <= high - 1; j++) {
        if(arr[j] < pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i+1, high);
    animations.push([i, arr[j]])
    return i+1;

}


function swap(arr, a, b) {
    var t = arr[a];
    arr[a] = arr[b];
    arr[b] = t;
    return arr;
}