(function() {
	'use strict';
	
	var numOfDice = 1;
	
	$('#num-of-dice').change(function(e) {
		var numString = $(this).val();
		
		numOfDice = parseInt(numString);
		
		createDiceBlocks();
	});
	
	$('#dice-roll').click(function(e){
		e.preventDefault();
		
		$('.dice-block').each(function(evt){
			var dice = new Dice();
			var val = dice.roll();
			
			$(this).text(val);
		});
	});
	
	function createDiceBlocks() {
		var ohtml = '';
		
		for (var i = 0; i < numOfDice; i++) {
			ohtml += '<div class="dice-block"></div>';
		}
		
		ohtml += '<div class="clear"></div>';
		
		$('.dice-blocks-container').html(ohtml);
	}
	

	var loopValues = '';
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 5; j++) {
			loopValues += '(' + i + ',' + j + ') ';
		}
	}
	
	console.log(loopValues);
})();

function Dice() {
}

Dice.prototype.roll = function(numOfSides) {
	var sides = numOfSides || 6;
	var num = Math.ceil(Math.random() * sides);
	
	return num;
};