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

function show_info(i){}

get_gallery();