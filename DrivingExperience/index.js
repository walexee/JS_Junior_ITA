(function(){
    var car = new Car();

    $('button#btn-drive').click(function(e) {
        e.preventDefault();

        var speed = parseInt($('#speed-value').val());
        car.drive(speed);
    });

    $('button#btn-reset').click(function(e) {
        e.preventDefault();

        car.resetForNewTrip();
    });

     $('button#btn-refuel').click(function(e) {
        e.preventDefault();

        car.refuel();
    });
})();

function Car() {
    'use strict';

    var odometerReading = 0;
    var currentTripReading = 0;
    var fuelCapacity = 15; //gallons
    var fuelAmount = fuelCapacity; 
    var pixelsPerMove = 10;
    var tripsPerFullTank = 5;
    var trackLength = $('#track').width();
    var $car = $('div#car');
    var $odometer = $('#odometer h1');
    var $fuelGuage = $('#fuel-guage h1');
    var $currentTrip = $('#current-trip h1');
    var $speed = $('#speed h1');
    var gallonsPerMove = pixelsPerMove * fuelCapacity/(trackLength * tripsPerFullTank );

    //speed 1 - 10
    function drive(speed) {
        currentTripReading = 0;

        var timeInterval = 100/speed; 
        var interval = setInterval(function() {
            if (currentTripReading >= trackLength) {
                clearInterval(interval);
            }
            
            var carMoved = moveCar();

            if (!carMoved) {
                clearInterval(interval);
                return;
            }

            currentTripReading += pixelsPerMove;
            odometerReading += pixelsPerMove;

            $odometer.text(odometerReading);
            $fuelGuage.text(fuelAmount.toFixed(2));
            $currentTrip.text(currentTripReading);
            $speed.text(speed);

        }, timeInterval);
    }

    function refuel(gallons) {
        fuelAmount = fuelCapacity;
        $fuelGuage.text(fuelAmount.toFixed(2));
    }

    function displayOdometerReading() {
        $odometer.text(odometerReading.toString());
    }

    function moveCar() {
        if (fuelAmount < gallonsPerMove) {
            return false;
        }

        fuelAmount -= gallonsPerMove;
        $car.css('left', currentTripReading);

        return true;
    }

    function reset() {
        currentTripReading = 0;
        $currentTrip.text(currentTripReading);
        $car.css('left', 0);
    }

    return {
        drive: drive,
        refuel: refuel,
        resetForNewTrip: reset
    };
}