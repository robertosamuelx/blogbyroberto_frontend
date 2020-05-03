

export function format(value){
    let date = String(value).split('T')[0];
    let day = date.split('-')[2];
    let month = date.split('-')[1];
    let year = date.split('-')[0];

    let time = String(value).split('T')[1];
    let hour = time.split(':')[0];
    let minute = time.split(':')[1];
    return day + '/' + month + '/' + year + '   ' + hour + ':' + minute;
}