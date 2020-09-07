module.exports = {
    isUnit: function (unit){
        const UNITS = ['days', 'day', 'hours', 'hour', 'minutes', 'minute']
        if (typeof unit === 'string') {
            if (UNITS.includes(unit.toLowerCase())) return true
            return false
        }
    },
    generate_pages: function (content, page_entries) {
        let pages = [];
        let last_index = 0
        console.log('reminders', content.length)
        let pages_required = Math.ceil(content.length / 10)
        console.log('pr', pages_required)
        

        for (let i = 0; i < pages_required; i++) {
            //console.log('first if iter', i)
            let page = [];
            for (let i = 0; i < page_entries; i++) {
                //console.log('page begin', page)
                
                if (typeof content[last_index] === 'undefined') {
                    //console.log('undefined last ele', content[last_index])
                    break

                } 
                //console.log('sec if iter', i)
                //console.log('12', content[last_index])
                //console.log('lastindex', last_index);

                
                page.push(content[last_index])
                last_index = last_index + 1
                //console.log('page end', page)
                
                
            }
            pages.push(page.join('\n'))	
        }
        return pages				
    },
    display_page: function  (pages, page_number) {
        console.log('p#', page_number)
        console.log('page#', typeof page_number)
        //console.log('page#', page_number)
        if (page_number <= 0 || typeof page_number === 'undefined'){
            console.log('page#', typeof page_number)
            page_number = 1;
            console.log('page#', typeof page_number)

        } 

        return message.channel.send(`ID\t Reminder\n${pages[page_number-1]}\n\npage ${page_number}/${pages.length}`, { code: 'md' })
        
    },
    ordinal_suffix: function (i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    },
    decodeHtml: function (str) {
        var map =
        {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&#039;': "'"
        };
        return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m) {return map[m];});
    },
    escapeHtml: function (text) {
        var map = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    },
    shuffleArray: function (array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    },
    checkStringIncludesArray: function (array, value) {
        array.some(value => value === array)
    }
}