var app = app || {};
var common = app.common || (app.common = {});

common.Modal = function (modalSelector) {
    var $modal = $(modalSelector);
    var deferred;
    var vm = this;

    init();

    vm.open = function () {
        deferred = $.Deferred();
        $modal.modal('show');

        return deferred.promise();
    };

    vm.close = function () {
        $modal.modal('hide');
    };

    function init() {
        $('button#btn-cancel').click(function () {
            if (deferred) {
                deferred.resolve(false);
                vm.close();
            }
        });

        $('button#btn-save').click(function () {
            if (deferred) {
                var data = common.getFormData('#employee-form');
                deferred.resolve(data);
                vm.close();
            }
        });
    }
};

common.getFormData = function (formSelector) {
    var data = {};

    $(formSelector).find('input').each(function (index, element) {
        data[element.name] = element.value;
    });

    return data;
};