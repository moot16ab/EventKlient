$(document).ready(function(){
    $("#opret-event-knap").on("click", function(){
        var eventNavn = $("#inputEventNavn").val();
        var placering = $("#inputEventPlacering").val();
        var dato = $("#inputEventDato").val();
        var pris = $("#inputEventPris").val();
        var beskrivelse = $("#inputEventBeskrivelse").val();


        SDK.Event.opretEvent(eventNavn, placering, dato, pris, beskrivelse, function (err, data) {
            if(err){
                alert(err)
            } else{
                alert("Begivenhed oprettet!")
                window.location.href = "events.html";
            }
        })
    })
});