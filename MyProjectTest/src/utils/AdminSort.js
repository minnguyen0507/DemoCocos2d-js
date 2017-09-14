/**
 * Created by MinNguyen on 9/14/2017.
 */

    // 1. Bubble sort. ( sắp xếp bằng cách đổi )
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
}

