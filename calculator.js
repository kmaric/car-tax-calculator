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
        return round(kw * 1.35962, 5);
    }

    function fromHpToKw(hp) {
        return round(hp * 0.7355, 5);
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

    function getPriceByKw(kw) {  
        var sum = 0.00;

        if(kw <= 24.99) 
            return sum;
        
        if(kw <= 66.99) {
            return round((kw - 24) * 0.682, 2);
        }            
        
        if(kw <= 97.99) {
            sum = round(41 * 0.682, 2);         //previous tax grade in full
            sum = round((kw - 67) * 0.726, 2);  //current tax grade
        }            
        else {
            sum += round(41 * 0.682, 2);           //previous tax grade in full
            sum += round(30 * 0.726, 2);           //previous tax grade in full
            sum += round((kw - 98) * 0.825, 2);    //current tax grade
        }          

        return sum;
    }

    function calculate() {
        var price = getPriceByKw(kilowats);

        var resultPerYear = round(price * 12, 2);
        var divider = parseTextToNumber(multiplicator);
        var frequency = getFrequencyDivider(divider);        

        var result = round(round(resultPerYear / frequency, 2) / divider, 2);
        result = round(result, 2)
        displayResult(result, multiplicator);
    }

    function getFrequencyDivider(divider) {
        switch(divider) {
            case 1.1:
                return 1;
            case 1.08:
                return 4;
            case 1.06:
                return 2;
            default:
                return 12;
        }
    }

    function round(number, decimals) {
        var rounded = (Math.round(number * 100) / 100).toFixed(decimals);
        return parseTextToNumber(rounded);
    }

    function displayResult(result, rate) {
        var text;

        switch(rate) {
            case "1.1":
                text = "pro Jahr";
                break;
            case "1.06":
                text = "pro Halbjahr";
                break;
            case "1.08":
                text = "pro Quartal";
                break;
            default:
                text = "pro Monat";
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