$(document).ready(function () {
    SDK.Event.hentEvents(function(err, events){
        if(err) console.log(err);
        var $eventTable = $('#eventTable');

        events.forEach(function (event) {

            $eventTable.append(
                "<tr>" +
                "<td>" + event.eventName + "</td>" +
                "<td>" + event.location + "</td>" +
                "<td>" + event.price + "</td>" +
                "<td>" + event.eventDate + "</td>" +
                "<td>" + event.description + "</td>" +
                "<td><button class='btn btn-success deltag-knap' data-event='" + event.idEvent + "'>Deltag</button></td>" +
                "<td><button class='btn btn-primary deltagere-knap' data-event='" + event.idEvent + "'>Vis deltagere</button></td>" +
                "</tr>");
        });

        $(".deltag-knap").click(function () {
            var e = this;
            SDK.Event.deltag(e.dataset.event)
        })

        $(".deltagere-knap").click(function () {
            var e = this;
            SDK.Event.visDeltagere(e.dataset.event)
        })


    });
})