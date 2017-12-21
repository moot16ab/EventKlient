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
                "<td><button class='btn btn-success'>Deltag</button></td>" +
                "<td><button class='btn btn-primary' onclick=''>Vis deltagere</button></td>" +
                "</tr>");
        });


    });
})