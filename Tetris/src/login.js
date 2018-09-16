function saveName() {
    let loginName = document.getElementById("name").value;
    if (loginName === "")
        localStorage["tetris.username"] = "Undefined Player";
    else localStorage["tetris.username"] = loginName;
}