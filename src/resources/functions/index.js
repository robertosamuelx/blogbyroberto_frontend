export function formatDate(value){
    let date = String(value).split('T')[0];
    let day = date.split('-')[2];
    let month = date.split('-')[1];
    let year = date.split('-')[0];

    let time = String(value).split('T')[1];
    let hour = time.split(':')[0];
    let minute = time.split(':')[1];
    return day + '/' + month + '/' + year + '   ' + hour + ':' + minute;
}

export function formatSize(value){
    const sizes = ['Bytes', 'KB', 'MB'];
    if (value == 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(value) / Math.log(1024)));
    return Math.round(value / Math.pow(1024, i), 2) + ' ' + sizes[i];
}