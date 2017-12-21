$(document).ready(function(){
    $("#opret-bruger-knap").on("click", function(){
        var fornavn = $("#inputOpretFornavn").val();
        var efternavn = $("#inputOpretEfternavn").val();
        var email = $("#inputOpretEmail").val();
        var password = $("#inputOpretPassword").val();

        SDK.Bruger.opretBruger(fornavn, efternavn, email, password, function (err, data) {
            if(err){
                alert(err)
            } else{
                alert("Kære " + fornavn + ", du er nu oprettet!")
                window.location.href = "events.html";
            }
        })
    })
});