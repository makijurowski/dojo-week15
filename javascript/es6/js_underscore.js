/* jshint esversion: 6 */

function each(arr, callback) {
    for(let i = 0; i < arr.length; i++) {
        callback(arr[i]);
    }
}

var _ = {
    print: function(arr, callback) {
        for(let i = 0; i < arr.length; i++) {
            callback(arr[i]);
        }
        return;
    },
    map: function(arr, callback) {
        let temp = [];
        for(let i = 0; i < arr.length; i++) {
            temp.push(callback(arr[i]));
        }
        return temp;
    },
    reduce: function(arr, callback, memo) {
        let value = 0;
        for(let i = 0; i < arr.length; i++) {
            value += callback(arr[i], memo);
        }
        return value;
    },
    find: function(arr, callback) {
        for(let i = 0; i < arr.length; i++) {
            if (callback(arr[i])) {
                return arr[i];
            }
        }
    },
    filter: function(arr, callback) {
        let temp = [];
        for(let i = 0; i < arr.length; i++) {
            if (callback(arr[i])) {
                temp.push(arr[i]);
            }
        }
        return temp;
    },
    reject: function(arr, callback) {
        let temp = [];
        for(let i = 0; i < arr.length; i++) {
            if (!callback(arr[i])) {
                temp.push(arr[i]);
            }
        }
        return temp;
    }
};

// Test code
var useEach = _.print([1, 2, 4, 5, 6], function(num){ console.log(num); });
var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
var odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
var mapping = _.map([1, 2, 3], function(num){ return num + 2; });
var sum = _.reduce([1, 2, 3], function(num, memo){ return num + memo; }, 1);
var findIt = _.find([1, 2, 3], function(num){ return num % 2 == 0; });
console.log(odds);