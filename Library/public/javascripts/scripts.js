function deleteBook(id)
{
    const xhttp = new XMLHttpRequest();
    const url = "/users/" + id;
    xhttp.open("DELETE", url, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            res = JSON.parse(this.responseText);
            if (res.ok)
                window.open('/users', '_self');
        }
    };
    xhttp.send(null);
}

function externalSave(newBookInfo)
{
    const xhttp = new XMLHttpRequest();
    const url = "/users/save";
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            res = JSON.parse(this.responseText);
            if (res.ok)
                location.reload();
        }

    };
    const data = JSON.stringify(newBookInfo);
    xhttp.send(data);
}

function returnBook(id)
{
    const xhttp = new XMLHttpRequest();
    const url = "/users/return/" + id;
    xhttp.open("DELETE", url, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            res = JSON.parse(this.responseText);
            if (res.ok)
                location.reload();
        }
    };
    xhttp.send(null);
}