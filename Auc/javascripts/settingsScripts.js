let settings;

function save_settings() {
    let settings = {};
    settings.date = $("#date_input").val();
    settings.time = $("#time_input").val();
    settings.sell_timeout = $("#stime_input").val();
    settings.info_interval = $("#timeout_input").val();
    $.ajax({
        url: "/settings",
        method: "PUT",
        data: settings,
        success: () =>{
            location.reload();
        }
    })
}

function get_settings() {
    $.get("/settings2", {parameters: "to", server: "side"})
        .done((data)=>{
            settings = data;
            set_settings(settings)
        })
}

function set_settings(settings) {
    $("#date_input").val(settings.date);
    $("#time_input").val(settings.time);
    $("#stime_input").val(settings.sell_timeout);
    $("#timeout_input").val(settings.info_interval);
}

get_settings();