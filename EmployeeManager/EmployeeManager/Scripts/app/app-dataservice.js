var app = app || {};
var service = app.dataService || (app.dataService = {});

(function (vm) {
    var url = '/api/employee';

    vm.getEmployees = function () {
        return $.get(url);
    };

    vm.saveEmployee = function () {

    };

    vm.deleteEmployee = function () {

    }

})(service);
