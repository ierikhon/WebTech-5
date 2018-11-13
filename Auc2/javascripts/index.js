//@flow

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function go() {
    let name = $('#name').val();
    $('#goButton').attr('href', '/start/' + name);
    setCookie('username', name, 1);
}
