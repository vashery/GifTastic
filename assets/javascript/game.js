var apikey = "PAA7uDG1NuSSvqaXxvyXki6clWzT6hKz";
var categories = ["cat", "dog", "bird", "trash panda", "mouse", "rat", "bearded dragon", "snake", "tarantula"];


function displayCategories() {

    for (var i = 0; i < categories.length; i++) {

        $("#search-button-area").append("<button type='searchbutton' class='btn btn-lg btn-primary mr-2 mb-2 searchbutton'>" + categories[i] + "</button>")

    }
}

displayCategories();

function displayGif() {

    searchterm = $(this).text()
    getattribute = $(this).attr("type")
    carrythis = $(this)
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apikey + "&q=" + searchterm + "&limit=10&offset=0&rating=PG-13&lang=en"

    $.ajax({

        url: queryURL,
        method: "GET"

    }).then(function (response) {

        $("#gif-area").empty()

        for (var i = 0; i < response.data.length; i++) {

            $("#gif-area").append("<div animated='one' type='gifbutton' class='text-center gifclick " + response.data[i].id + "'><p>Rating: " + response.data[i].rating + "</p><img class='figure-img pull-left img-fluid m-2' src='" + response.data[i].images.downsized.url + "'></div>");
            $("[animated='one']").hide()
            $("#gif-area").append("<div id='" + response.data[i].id + "' animated='two' type='gifbutton' class='text-center gifclick " + response.data[i].id + "'><p>Rating: " + response.data[i].rating + "</p><img class='figure-img pull-left img-fluid m-2' src='" + response.data[i].images.downsized_still.url + "'></div>");

        }
    });
}

function changeAnimation() {

    getthisattr = $(this).attr("animated")
    getthisid = $(this).attr("class").split(" ").pop()

    if (getthisattr === "two") {

        $("." + getthisid + "[animated='two']").hide();
        $("." + getthisid + "[animated='one']").show();

    }

    else {

        $("." + getthisid + "[animated='one']").hide();
        $("." + getthisid + "[animated='two']").show();

    }
}

function addnewTerm() {

    $("#search-button-area").empty()
    newterm = $("#terminput").val().trim();
    categories.push(newterm);
    displayCategories();
    $("#terminput").val("")

}

$(document).on("click", ".searchbutton", displayGif);
$(document).on("click", ".gifclick", changeAnimation);
$(document).on("click", "#addtermbutton", addnewTerm);