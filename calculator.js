(function($) {
    console.log("js file loaded");
    
    var kilowats;
    var multiplicator;

    (function attachHandlers() {
        var form = document.getElementById("calculatorForm");
        $(form).submit(submitAndProcessForm);
    })();

    function validateFormInputs() {
        console.log("form submitted");
        return true;
    }

    function processForm(form) {
        console.log(form);


    }

    function onSuccess() {


        calculate();
    }

    function calculate(kw, multiplicator) {
        console.log("kilowats " + kw, "multiplicator " + multiplicator);
    }

    function submitAndProcessForm() {
        
        console.log("submitAndProcessForm");

        processForm(form);
        
        return validateFormInputs() ? onSuccess() : false;
    }    

    

})(jQuery);