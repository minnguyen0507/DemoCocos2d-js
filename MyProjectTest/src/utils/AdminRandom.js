/**
 * Created by MinNguyen on 9/14/2017.
 */

        // 1. Tạo số ngẫu nhiên bất bì
        // 2. Tạo số ngẫu nhiên theo thời gian
        // 3. tạo số ngẫu nhiên trong 1 khoảng
        // 4. Tạo 1 mảng số ngãu nhiên trong 1 khoảng
var AdminRandom = AdminRandom || {};

AdminRandom.randomListArray = function (listArray, lenght, start,end) {
    for (var i = 0; i < lenght; i++){
        listArray[i] = Math.floor((Math.random() * end) + start);
    }
    return listArray;
};

AdminRandom.randomBetweenNumber = function (start, end) { //random 1 số từ khoảng a đến b
    return Math.floor((Math.random() * end) + start);
};