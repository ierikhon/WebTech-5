function sort()
{
    const xhttp = new XMLHttpRequest();
    const url = "/users";
    xhttp.open("POST", url, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            res = JSON.parse(this.responseText);
            if (res.ok)
                location.reload();
        }
    };
    xhttp.send(null);
 }