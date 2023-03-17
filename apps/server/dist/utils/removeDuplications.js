"use strict";
exports.__esModule = true;
exports.removeDuplications = void 0;
var removeDuplications = function (id, array) {
    array.map(function (el) {
        if (array.includes(el)) {
            if (el.fromId.toString() === id) {
                el.userInfo = el.toIdUserInfo;
                var searchID_1 = el.toId.toString();
                array = array.filter(function (el) { return el.fromId.toString() !== searchID_1; });
            }
            else {
                el.userInfo = el.fromIdUserInfo;
                var searchID_2 = el.fromId.toString();
                array = array.filter(function (el) { return el.toId.toString() !== searchID_2; });
            }
        }
    });
    return array;
};
exports.removeDuplications = removeDuplications;
