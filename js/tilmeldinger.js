$(document).ready(function () {
    SDK.loadData(function (err, data) {
        if (err) {
            alert(err)
        } else {
            SDK.Event.hentTilmeldteEvents(function (err, events) {
                if (err) console.log(err);

                var bruger = JSON.parse(sessionStorage.getItem("bruger"));
                var $eventTable = $('#eventTable');

                events.forEach(function (event) {

                    $eventTable.append(
                        "<tr>" +
                        "<td>" + event.eventName + "</td>" +
                        "<td>" + event.location + "</td>" +
                        "<td>" + event.price + "</td>" +
                        "<td>" + event.eventDate + "</td>" +
                        "<td>" + event.description + "</td>" +
                        "<td><button class='btn btn-primary deltagere-knap' data-event='" + event.idEvent + "'>Vis deltagere</button></td>" +
                        "<td><button class='btn btn-danger rediger-knap' data-event='" + event.idEvent + "' data-owner='" + event.owner + "'>Rediger / Slet</button></td>" +
                        "</tr>");
                });


                $(".rediger-knap").click(function () {
                    var e = this;
                    if (e.dataset.owner == bruger.idStudent) {
                        sessionStorage.setItem("valgteEvent", e.dataset.event);
                        SDK.saveData(function (err, data) {
                            if (err) {
                                alert(err)
                            } else {
                                window.location.href = "redigerEvent.html";

                            }
                        })
                    } else {
                        alert("Du kan ikke redigere eller slette en anden brugers event.")
                    }
                })

                $(".deltagere-knap").click(function () {
                    var e = this;
                    SDK.Event.visDeltagere(e.dataset.event)
                })

                var $mitEvent = $('.mitEvent');


            });
        }
    })

})