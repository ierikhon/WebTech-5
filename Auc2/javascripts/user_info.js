socket = io.connect('http://localhost:3030');
socket.on('user_here', (msg)=> {
    $.ajax({
        url: '/users/' + msg.name,
        method: 'GET',
        success: (member) => {
            if (member.newes) {
                let table = $('#user_table');
                let row = $('<tr>').attr("scope", "row");
                let name = $('<td>').text(member.mem["name"]);
                let money = $('<th>').text(member.mem["money"] + '$');
                let button = $('<td>').append(
                    $('<button>').addClass("w3-btn").addClass("w3-green").text("Show aquisitions")
                        .attr("onclick", "show_info('" + member.mem["name"] + "')"));

                row.append(name).append(money).append(button);
                table.append(row);
            }
        }
    });
});

function show_info(name) {
    $.ajax({
        url: '/users/' + name,
        method: 'GET',
        success: (member) => {
            for (let paint of member.mem["Aquisitions"])
                $('#aqu').append("<p>" + paint.name + "for" + paint.price + "$" + "</p>");

            $('#umodal').show();
        }
    });
}