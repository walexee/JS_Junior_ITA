var app = app || {};
var service = app.dataService || (app.dataService = {});

(function (vm) {
    var url = '/api/employee';

    vm.getEmployees = function () {
        return $.get(url);
    };

    vm.addEmployee = function (employee) {
        return $.post(url, employee);
    };

    vm.updateEmployee = function (employee) {
        var putUrl = url + '/' + employee.id;

        return $.ajax(putUrl, {
            data: JSON.stringify(employee),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            method: 'PUT'
        });
    }

    vm.deleteEmployee = function () {
        var deleteUrl = url + '/' + employee.id;

        return $.ajax(deleteUrl, {
            //dataType: 'json',
            //contentType: 'application/json; charset=utf-8',
            method: 'DELETE'
        });
    }

})(service);
