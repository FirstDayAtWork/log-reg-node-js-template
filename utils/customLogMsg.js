export function dateNow(){
    let day = new Date().getDate() > 9 ? new Date().getDate() : `0${new Date().getDate()}`;
    let month = new Date().getMonth() + 1 > 9 ? new Date().getDate() + 1 : `0${new Date().getMonth() + 1}`;
    let year = new Date().getFullYear();
    let hours = new Date().getHours() > 9 ? new Date().getHours() : `0${new Date().getHours()}`;
    let mins = new Date().getMinutes() > 9 ? new Date().getMinutes() : `0${new Date().getMinutes()}`;
    let secs = new Date().getSeconds() > 9 ? new Date().getSeconds() : `0${new Date().getSeconds()}`;

    return `${day}/${month}/${year} ${hours}:${mins}:${secs}`;
}