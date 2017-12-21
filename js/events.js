$(document).ready(function () {
    SDK.Event.getEvents(function(err, events){
        if(err) console.log(err);
        var $eventTable = $('#eventTable');

        events.forEach(function (event) {

            $eventTable.append(
                "<tr>" +
                "<td>" + event.eventName + "</td>" +
                "<td>" + event.owner + "</td>" +
                "<td>" + event.location + "</td>" +
                "<td>" + event.price + "</td>" +
                "<td>" + event.eventDate + "</td>" +
                "<td>" + event.description + "</td>" +
                "</tr>");
        });
    });
})