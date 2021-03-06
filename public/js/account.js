/**
 * Developer: Vikram Bala
 * Contact: vikrambala2002@gmail.com
 * Github Repository: https://github.com/vbala29/Jazz-Improv-Bot#readme
 */

function deleteAccount() {
    fetch('http://ec2-52-204-233-92.compute-1.amazonaws.com:3000/deleteAccount', {
        method: 'DELETE',
        mode: 'cors',
    }).then(res => {
        window.location.href = '/login';
    }).catch(err => {
        alert("Unable to delete account, servor error. Please try later! (" + err + ")");
    })
}