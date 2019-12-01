module.exports = {
    //remove option from argument, returns argument without option
    remove_option: function (argument, option_name) {
        let argument_copy = argument.slice(0);
        option_index = argument.indexOf(option_name);
        if (option_index > 0){
            argument_copy.splice(option_index, 1)
            return argument_copy;
        }
        else return argument;
    },
    // removes all non-number characters from string, returns the remaining number.
    return_number: function (str) { 
        var num = str.replace(/[^0-9]/g, ''); 
        return parseInt(num, 10); 
    }
};