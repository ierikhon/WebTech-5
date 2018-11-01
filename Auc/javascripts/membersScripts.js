let members;

function get_members() {
    $.get("/members2", {parameters: "to", server: "side"})
        .done((data)=>{
            members = data;
            set_members(members);
        });
}

function set_members(members) {
    let table = $('#members_table');
    for (let i = 0; i < members.length; i++){
        let row = $('<tr>').attr("scope", "row");
        let name = $('<td>').text(members[i]["name"]);
        let surname = $('<td>').text(members[i]["surname"]);
        let phone = $('<td>').text(members[i]["phone"]);
        let button = $('<td>').append(
            $('<button>').addClass("w3-btn").addClass("w3-green").text("Show info")
                .attr("onclick", "show_info(" + i + ")"),
            $('<button>').addClass("w3-btn").addClass("w3-red").text("Delete")
                .attr("onclick", "remove_member(" + i + ")")
        );
        row.append(name).append(surname).append(phone).append(button);
        table.append(row);
    }
}

function remove_member(i)
{
    $.ajax({
        url: "/members/" + i,
        method: "DELETE",
        success: () =>{
            location.reload();
        }
    })
}

function show_dummy(){
    $("#name_input").val(" ");
    $("#surname_input").val(" ");
    $("#phone_input").val(" ");
    $("#descr_input").text(" ");
    $("#modal").show();
}

function show_info(i){
    $("#name_input").val(members[i]["name"]);
    $("#surname_input").val(members[i]["surname"]);
    $("#phone_input").val(members[i]["phone"]);
    $("#index_info").text(i.toString());
    $("#modal").show();
}

function dismiss_modal()
{
    $("#modal").hide();
}

function add_member(){
    let member = {};
    member.name = $("#name_input").val();
    member.surname = $("#surname_input").val();
    member.phone = $("#phone_input").val();
    let obj = {
        "img": member
    };
    let id = $("#index_info").text();
    if (id !== "")
        obj.id = parseInt(id);
    else
        obj.id = -1;
    $.ajax({
        url: "/members",
        method: "PUT",
        data: obj,
        success: () =>{
            location.reload();
        }
    })
}

get_members();