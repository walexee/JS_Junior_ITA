var app = app || {};
var common = app.common || (app.common = {});

common.Modal = function (modalSelector) {
    var $modal = $(modalSelector);

    this.open = function () {
        $modal.modal('show');
    };
};