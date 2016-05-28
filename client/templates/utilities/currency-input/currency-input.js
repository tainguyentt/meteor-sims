Template.currencyInput.events({
    'keyup input': function(event) {
      console.log(event.which);
        if (event.which >= 37 && event.which <= 40) {
            event.preventDefault();
        }
        var $this = $(event.target);
        var num = $this.val().replace(/,/gi, "");
        var num2 = num.split(/(?=(?:\d{3})+$)/).join(",");
        $this.val(num2);
    }
});
