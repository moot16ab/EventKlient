$(document).ready(function(){
    $("#log-ind-knap").on("click", function(){
        var email = $("#inputEmail").val();
        var password = $("#inputPassword").val();

        SDK.Bruger.login(email, password, function (err, data) {
            if(err){
                alert(err)
            } else{
                window.location.href = "events.html";
            }
        })
    })
});