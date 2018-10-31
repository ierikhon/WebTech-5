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
                .attr("onclick", "show_info(" + i + ")"),
        $('<button>').addClass("w3-btn").addClass("w3-red").text("Delete")
            .attr("onclick", "remove_element(" + i + ")")
        );
        row.append(number).append(name).append(author).append(button);
        table.append(row);
    }
}

function remove_element(i)
{
    $.ajax({
        url: "/" + i,
        method: "DELETE",
        success: () =>{
            location.reload();
        }
    })
}

function show_info(i){
    $("#name_input").val(gallery[i]["name"]);
    $("#url_input").val(gallery[i]["url"]);
    $("#author_input").val(gallery[i]["author"]);
    $("#descr_input").text(gallery[i]["description"]);
    $("#sprice_input").val(gallery[i]["start_price"]);
    $("#minstep_input").val(gallery[i]["min_step"]);
    $("#maxstep_input").val(gallery[i]["max_step"]);
    $("#index_info").text(i.toString());
    $("#for_input").prop('checked', gallery[i]["for_auction"]);
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

function add_image(){
    let image = {};
    image.name = $("#name_input").val();
    image.url = $("#url_input").val();
    image.author = $("#author_input").val();
    image.description = $("#descr_input").val();
    image.start_price = $("#sprice_input").val();
    image.min_step = $("#minstep_input").val();
    image.max_step = $("#maxstep_input").val();
    image.for_auction = $("#for_input").is(":checked");
    let obj = {
        "img": image
    };
    let id = $("#index_info").text();
    if (id !== "")
        obj.id = parseInt(id);
    else
        obj.id = -1;
    $.ajax({
        url: "/",
        method: "PUT",
        data: obj,
        success: () =>{
            location.reload();
        }
    })
}

get_gallery();