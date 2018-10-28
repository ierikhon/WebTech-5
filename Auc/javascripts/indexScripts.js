let gallery;

function get_gallery() {
    $.get("/gallery", {parameters: "to", server: "side"})
        .done((data)=>{
            gallery = data;
            set_gallery(gallery);
        });
}

function set_gallery(gallery){
    let table = $('#gallery_table');
    for (let i = 0; i < gallery.length; i++){
        let row = $('<tr>').attr("scope", "row");
        let number = $('<th>').text(i);
        let name = $('<td>').text(gallery[i]["name"]);
        let author = $('<td>').text(gallery[i]["author"]);
        let button = $('<td>').append(
            $('<button>').addClass("w3-btn").addClass("w3-green").text("Swow info")
                .attr("onclick", "show_info(" + i + ")")
        );
        row.append(number).append(name).append(author).append(button);
        table.append(row);
    }
}

function show_info(i){
    $("#name_input").val(gallery[i]["name"]);
    $("#url_input").val(gallery[i]["url"]);
    $("#author_input").val(gallery[i]["author"]);
    $("#descr_input").text(gallery[i]["description"]);
    $("#sprice_input").val(gallery[i]["start_price"]);
    $("#minstep_input").val(gallery[i]["min_step"]);
    $("#maxstep_input").val(gallery[i]["max_step"]);
    $("#modal").show();
}

function dismiss_modal()
{
    $("#modal").hide();
}

function show_dummy(){
    $("#name_input").val(" ");
    $("#url_input").val(" ");
    $("#author_input").val(" ");
    $("#descr_input").text(" ");
    $("#sprice_input").val(" ");
    $("#minstep_input").val(" ");
    $("#maxstep_input").val(" ");
    $("#modal").show();
}

get_gallery();