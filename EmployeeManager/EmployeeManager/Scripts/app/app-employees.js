var app = app || {};
var employees = app.employees || (app.employees = {});

(function (vm, service, common) {
    var modal = new common.Modal('#employee-modal');

    vm.init = function () {
        service.getEmployees().done(populateEmployeeRows);

        $('button#btn-add').click(function () {
            modal.open();
        });
    };

    function populateEmployeeRows(data) {
        var html = '';

        for (var i = 0; i < data.length; i++) {
            html += '<tr>';
            html += '<td>' + data[i].Firstname + '</td>';
            html += '<td>' + data[i].Lastname + '</td>';
            html += '<td>' + data[i].JobTitle + '</td>';
            html += '<td>' + data[i].Email + '</td>';
            html += '<td>' + data[i].PhoneNumber + '</td>';
            html += '</tr>';
        }

        $('#employee-rows').html(html);
    }

})(employees, app.dataService, app.common);