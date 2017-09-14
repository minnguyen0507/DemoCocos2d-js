/**
 * Created by MinNguyen on 9/14/2017.
 */

    // 1. Bubble sort. ( sắp xếp nổi bọt )
    // 2. Quick sort. ( sắp xếp nhanh)
    // 3. Simple selection sort. (sắp xếp chọn)
    // 4. Heap sort.  (sắp xếp vun đống)
    // 5. Simple insertion sort. ( sắp xếp chèn)
    // 6. Shell sort.              (sắp xếp theo độ dài giảm dần)
    // 7. Merge sort.               ( sắp xếp trộn)

var AdminSort = AdminSort || {};


AdminSort.sortNumberAsc = function (a, b) {
    return a - b;
};

AdminSort.sortNumberDesc = function (a, b) {
     //return (a > b ? - 1 : (a < b ? 1 : 0)); //  nếu a > b trả về - 1 ,  nếu a < b thì trả về giá trị trong ngoặc ( nếu a < b thì trả về 1, nếu a > b trả về 0)
    //VD ( A < B ? 5 : 3 =>> trả về giá trị trước or sau dấu : , nếu A < B thì trả về giá trị 5, và ngược lại)
     return b - a;
};

AdminSort.bubbleSort = function (listArray) {
    var len = listArray.length;

    for (var i = 0; i < len ; i++) {
        for(var j = 0 ; j < len - i - 1; j++){ // this was missing
            if (listArray[j] > listArray[j + 1]) {
                // swap
                var temp = listArray[j];
                listArray[j] = listArray[j+1];
                listArray[j + 1] = temp;
            }
        }
    }
    return listArray;
};

AdminSort.quickSort = function (listArray, left, right) {
    var i = left;
    var j = right;
    var temp;

    pivotidx = (left + right) / 2;
    var pivot = parseInt(listArray[pivotidx.toFixed()]);

    /* partition */
    while (i <= j)
    {
        while (parseInt(listArray[i]) < pivot){
            i++;
        }
        while (parseInt(listArray[j]) > pivot){
            j--;
        }
        if (i <= j)
        {
            temp = listArray[i];
            listArray[i] = listArray[j];
            listArray[j] = temp;
            i++;
            j--;
        }
    }

    if (left < j){
        AdminSort.quickSort(listArray, left, j);
    }
    if (i < right)
    {
        AdminSort.quickSort(listArray, i, right);
    }
    return listArray;

};

AdminSort.selectionSort = function (listArray) {
    for (var i = 0; i < listArray.length;i++){
         var min = i;
         for (var j = i + 1; j < listArray.length; j++){
             if (listArray[j] < listArray[min]){
                 min = j;
             }
         }
        var temp = listArray[i];
        listArray[i] = listArray[min];
        listArray[min] = temp;
    }
    return listArray;
};

