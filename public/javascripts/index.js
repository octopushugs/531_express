// it'd be a lot cooler to do with react, but right now
// the focus is on learning express.js, so we're sticking the the jQuery dinosaur

var index531 = function() {
  this.init();
};

index531.prototype = {
  init: function() {
    let self = this;

    $('#rm__submit-btn').on('click', function() {
      self.getMaxes();
    });
  },
  getMaxes: function() {
    let payload = $('.max-form').serialize();

    $.post('/calculate', payload, function(data) {
      $('.results-col').html(data);
    });
  }
}

$(function() {
  var newIndex = new index531();
});