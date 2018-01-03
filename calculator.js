(function($) {
       
    var kilowats;
    var horsePower;
    var multiplicator;

    function parseTextToNumber(input) {
        if(typeof(input) !== 'string')
            return input;

        var local = input.replace(",", ".").toLocaleString("de");
        return Number(local);
    }

    function validateNumbers(element) {
        var valid = true;
        var kw = parseTextToNumber($("#kw").val());
        var ps = parseTextToNumber($("#ps").val());

        if(element){
            if(element[0].id === "kw") {
                ps = fromKwToHp(kw);
                $("#ps").val(ps.toFixed(2));
            } else  {
                kw = fromHpToKw(ps)
                $("#kw").val(kw.toFixed(2));
            }    
        }
        
        if($.isNumeric(parseTextToNumber(kw))) {
            kilowats = kw;
        } else {
            valid = false;   
        }
        if($.isNumeric(parseTextToNumber(ps))){
            horsePower = ps;
        } else {
            valid = false;
        }

        return valid && (kilowats > 0 && horsePower > 0) ? true : false;
    }  

    function fromKwToHp(kw) {
        return kw * 1.34102209;
    }

    function fromHpToKw(hp) {
        return hp * 0.745699872;
    }

    function validateFormInputs() {        
        return validateNumbers() && multiplicator !== undefined;
    }

    function selectHandler() {        
        multiplicator = $("#optionSelect").val();
    }

    function onSuccess() {
        calculate();                
    }

    function getPriceByJKw(kw) {        
            if(kw < 25) 
                return 0;
            else if(kw < 90.99)
                return kw * 0.62;
            else if(kw < 110.99)
                return kw * 0.66;
            else
                return kw * 0.75;
    }

    function calculate() {
        var price = getPriceByJKw(kilowats);
        console.log('price', price);

        var result = price * parseTextToNumber(multiplicator);
        result = (Math.round(result * 100) / 100).toFixed(2);
        displayResult(result, multiplicator);
    }

    function displayResult(result, rate) {
        var text;

        switch(rate) {
            case "1":
                text = "per year";
                break;
            case "1.06":
                text = "per half year";
                break;
            case "1.08":
                text = "per quarter";
                break;
            default:
                text = "per month";
                break;
        }

        $("#amount").val(result);
        $(".result-appendix").html(text);
        $("#result").show();
    }

    function submitAndProcessForm() {               
        return validateFormInputs() ? onSuccess() : false;
    }    

    $(document).ready(function() {        
        $("#calculatorForm").on("submit", function(event){    
            event.preventDefault();
            submitAndProcessForm();        
            return false;
        });

        $("#optionSelect").on("change", selectHandler).trigger("change");        
        $(".number").toLocaleString('de');
        $(".number").on("blur", function() {
            validateNumbers($(this));
        });       
        $("#result").hide(); 
    });

})(jQuery);