$(document).ready(function(){
    var valgteEventId = sessionStorage.getItem("valgteEvent")
    SDK.Event.hentEvent(valgteEventId, function (err, data) {
        if(err) console.log(err)
        $("#inputEventRedigerNavn").val(data.eventName);
        $("#inputEventRedigerPlacering").val(data.location);
        $("#inputEventRedigerDato").val(data.eventDate);
        $("#inputEventRedigerPris").val(data.price);
        $("#inputEventRedigerBeskrivelse").val(data.description);
    })




    $("#rediger-event-knap").on("click", function(){
        var eventNavn = $("#inputEventRedigerNavn").val();
        var placering = $("#inputEventRedigerPlacering").val();
        var dato = $("#inputEventRedigerDato").val();
        var pris = $("#inputEventRedigerPris").val();
        var beskrivelse = $("#inputEventRedigerBeskrivelse").val();



        SDK.Event.redigerEvent(valgteEventId, eventNavn, placering, dato, pris, beskrivelse, function(err, data) {
            if(err){
                alert(err)
            } else{
                alert("Eventer er ændret!")
                window.location.href = "events.html";
            }
        })
    })

    $("#slet-event-knap").on("click", function(){
        SDK.Event.sletEvent(valgteEventId, function (err, data) {
            if(err){
                alert(err)
            } else{
                alert("Eventet er slettet!")
                window.location.href = "events.html";
            }
        });
    })
});