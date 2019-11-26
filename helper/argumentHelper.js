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
};