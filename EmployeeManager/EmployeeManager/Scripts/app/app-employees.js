var app = app || {};
var employees = app.employees || (app.employees = {});

(function (vm, service, common) {
    var modal = new common.Modal('#employee-modal');

    vm.init = function () {
        service.getEmployees().done(populateEmployeeRows);

        $('button#btn-add').click(function () {
            modal.open().done(function (data) {
                if (data) {
                    addEmployee(data);
                }
            });
        });
    };

    function populateEmployeeRows(data) {
        var html = '';

        for (var i = 0; i < data.length; i++) {
            html += getEmployeeRow(data[i]);
        }

        $('#employee-rows').html(html);
    }

    function getEmployeeRow(emp) {
        var html = '';

        html += '<tr>';
        html += '<td>' + emp.Firstname + '</td>';
        html += '<td>' + emp.Lastname + '</td>';
        html += '<td>' + emp.JobTitle + '</td>';
        html += '<td>' + emp.Email + '</td>';
        html += '<td>' + emp.PhoneNumber + '</td>';
        html += '</tr>';

        return html;
    }

    function addEmployee(data) {
        service.addEmployee(data).done(function (emp) {
            var html = getEmployeeRow(emp);

            $('#employee-rows').append(html);
        });
    }

})(employees, app.dataService, app.common);