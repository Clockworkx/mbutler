module.exports = {
    isUnit: function (unit){
        const UNITS = ['days', 'day', 'hours', 'hour', 'minutes', 'minute']
        if (typeof unit === 'string') {
            if (UNITS.includes(unit.toLowerCase())) return true
            return false
        }
    }
}