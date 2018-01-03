(function($) {
    console.log("js file loaded");
    
    var kilowats;
    var horsePower;
    var multiplicator;

    function validateNumbers() {
        var valid = true;
        var kw = $("#kw").val();
        var ps = $("#ps").val();

        console.log("kilowats: ", kw, " horsePower: ", ps, " multiplicator: ", multiplicator);

        if($.isNumeric(kw)) {
            kilowats = kw;
        } else {
            valid = false;   
        }
        if($.isNumeric(ps)){
            horsePower = ps;
        } else {
            valid = false;
        }
        
        return valid;
    }  

    function validateFormInputs() {        
        return validateNumbers() && multiplicator !== undefined;
    }

    function selectHandler() {
        
        multiplicator = $("#optionSelect").val();
        console.log(multiplicator);
    }

    function onSuccess() {
        calculate();                
    }

    function calculate() {
        console.log("kilowats " + kilowats, " horsePower: ", horsePower,  "multiplicator " + multiplicator);
        var result = kilowats * horsePower * multiplicator
        displayResult(result, multiplicator);
    }

    function displayResult(result, rate) {
        $("#amount").val(result);

        var text;

        switch(rate) {
            case "1":
                text = "per year";
                break;
            case "1.1":
                text = "per half year";
                break;
            case "1.2":
                text = "";
                break;
            default:
                text = "per month";
                break;
        }

        $(".result-appendix").html(text);
        $("#result").show();
    }

    function submitAndProcessForm() {        
        console.log("submitAndProcessForm", validateFormInputs());
       
        return validateFormInputs() ? onSuccess() : false;
    }    

    $(document).ready(function() {        
        $("#calculatorForm").on("submit", function(event){    
            submitAndProcessForm();        
            return false;
        });

        $("#optionSelect").on("change", selectHandler).trigger("change");        
        $(".number").on("blur", validateNumbers);       
        // $("#result").hide(); 
    });

})(jQuery);