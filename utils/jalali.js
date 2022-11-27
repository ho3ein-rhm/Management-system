const moment  = require('jalali-moment');

exports.findeDate = data => {
    return moment(data).locale("fa").format("D MMM YYYY");
}