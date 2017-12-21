const SDK = {

    resetData: function(callback){
      sessionStorage.clear();
      sessionStorage.setItem("data", JSON.stringify(data))
        callback(null, "");
    },

    Bruger: {
        opretBruger: function(fornavn, efternavn, email, password, callback){
            if(fornavn && efternavn && email && password){
                var id = new Date().getTime();
                sessionStorage.setItem("token", email + "-token");
                sessionStorage.setItem("bruger", JSON.stringify({idStudent: id, firstName: fornavn, lastName: efternavn, email: email, password: password, deltager: []}));
                callback(null, data)
            } else{
                var err = "Oprettelsen mislykkedes"
                callback(err)
            }
        },

        login: function(email, password, callback){
            var storage = sessionStorage.getItem('data');
            if(storage) {
                var opdateretData = data.brugere.concat(storage.brugere)
                opdateretData = data.events.concat(storage.events)
                sessionStorage.setItem('data', JSON.stringify(opdateretData));
            }

            var user = null;
            function isEmail(bruger) {
                if(bruger.email === email) user = bruger;
            }
            data.brugere.find(isEmail);
            if(user && user.password === password){
                sessionStorage.setItem("token", email + "-token");
                sessionStorage.setItem("bruger", JSON.stringify(user));
                callback(null, user)
            } else{
                var err = "Ugyldigt login";
                callback(err)
            }
        },

        logout: function () {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("bruger");

            window.location.href = "index.html";
        }
    },

    Event: {
        opretEvent: function(eventNavn, placering, dato, pris, beskrivelse, callback){
            if(eventNavn && placering && dato && pris && beskrivelse){
                var id = new Date().getTime();
                var bruger = JSON.parse(sessionStorage.getItem('bruger'));
                data.events.push({idEvent: id, eventName: eventNavn, owner: bruger.idStudent, location: placering, price: pris, eventDate: dato, description: beskrivelse, isDeletede: 0, deltagere: [bruger]});
                callback(null, data)
            } else{
                var err = "Oprettelsen mislykkedes"
                callback(err)
            }
        },

        redigerEvent: function(idEvent, eventNavn, placering, dato, pris, beskrivelse, callback){
            if(idEvent && eventNavn != "" && placering != "" && dato != "" && pris != null && beskrivelse != ""){
                function isId(event){
                    return event.idEvent == idEvent
                }
                var eventIndex = data.events.findIndex(isId)
                console.log(eventIndex)
                data.events[eventIndex].eventName = eventNavn;
                data.events[eventIndex].location = placering;
                data.events[eventIndex].price = pris;
                data.events[eventIndex].eventDate = dato;
                data.events[eventIndex].description = beskrivelse;
                //data.events.push({idEvent: id, eventName: eventNavn, owner: bruger.idStudent, location: placering, price: pris, eventDate: dato, description: beskrivelse, isDeletede: 0, deltagere: [bruger]});
                console.log(data.events[0])
                callback(null, data);
            } else{
                var err = "Redigering mislykkedes"
                callback(err)
            }
        },

        sletEvent: function(idEvent, callback){
            function isId(event){
                return event.idEvent == idEvent
            }
            var eventIndex = data.events.findIndex(isId)
            data.events.splice(eventIndex, 1)
            console.log(data.events.splice(data.events))
            callback(null, data)
        },

        hentEvent: function (idEvent, callback){
            function isId(event){
                return event.idEvent == idEvent
            }
            var eventIndex = data.events.findIndex(isId)
            callback(null, data.events[eventIndex])
        },

        hentEvents: function (callback) {
            callback(null, data.events)
        },

        hentTilmeldteEvents: function (callback){
            var bruger = JSON.parse(sessionStorage.getItem('bruger'));
            callback(null, bruger.deltager)
        },

        deltag: function (idEvent) {
            var valgteEvent = null;
            function isId(event) {
                if (event.idEvent == idEvent) valgteEvent = event;
            }

            data.events.find(isId);
            var bruger = JSON.parse(sessionStorage.getItem('bruger'));
            valgteEvent.deltagere.push(bruger)
            alert("Du er blevet tilmeldt \"" + valgteEvent.eventName + "\"");
        },

        visDeltagere: function (idEvent) {
            var valgteEvent = null;
            function isId(event) {
                if (event.idEvent == idEvent) valgteEvent = event;
            }

            data.events.find(isId);
            var deltagere = '';
            valgteEvent.deltagere.forEach(function (deltager) {
                deltagere += deltager.firstName + " " + deltager.lastName + "\n";
            })
            alert(deltagere)
        }
    }
}



var data = {
    brugere: [
        {idStudent: 67, firstName: "Morten", lastName: "Ottesen", email: "mote12@cbs.dk", password: "Haps1234", deltager: [{idEvent: 63, eventName: "DØK Hyttetur", owner: "67", location: "Frederikberg", price: 250, eventDate: "10-04-2018", description: "Vi glæder os til at se jer", isDeletede: 0},{idEvent: 64, eventName: "DØK Ski", owner: "67", location: "Val T", price: 4000, eventDate: "04-12-2018", description: "FEST I Val T", isDeletede: 0}, {idEvent: 70, eventName: "Julebord", owner: "30", location: "Østerbrohallen", price: 230, eventDate: "09-12-1997", description: "Julefrokost. Fri bar", isDeletede: 0}]},
        {idStudent: 92, firstName: "Frank", lastName: "Hvam", email: "fh@gmail.com", password: "frank", deltager: [{idEvent: 63, eventName: "DØK Hyttetur", owner: "67", location: "Frederikberg", price: 250, eventDate: "10-04-2018", description: "Vi glæder os til at se jer", isDeletede: 0},{idEvent: 64, eventName: "DØK Ski", owner: "67", location: "Val T", price: 4000, eventDate: "04-12-2018", description: "FEST I Val T", isDeletede: 0}, {idEvent: 66, eventName: "Torsdagsfest", owner: "92", location: "Nexus", price: 35, eventDate: "10-04-2017", description: "Det blir fest", isDeletede: 0},{idEvent: 68, eventName: "DØK Jul", owner: "30", location: "Bit-Lab", price: 350, eventDate: "24-12-2017", description: "DØK Jul for de mest inkarnerede DØK'ere", isDeletede: 0}]},
        {idStudent: 30, firstName: "Alberto", lastName: "Contador", email: "ac@gmail.com", password: "alberto", deltager: [{idEvent: 63, eventName: "DØK Hyttetur", owner: "67", location: "Frederikberg", price: 250, eventDate: "10-04-2018", description: "Vi glæder os til at se jer", isDeletede: 0},{idEvent: 68, eventName: "DØK Jul", owner: "30", location: "Bit-Lab", price: 350, eventDate: "24-12-2017", description: "DØK Jul for de mest inkarnerede DØK'ere", isDeletede: 0},{idEvent: 70, eventName: "Julebord", owner: "30", location: "Østerbrohallen", price: 230, eventDate: "09-12-1997", description: "Julefrokost. Fri bar", isDeletede: 0}]},
        {idStudent: 56, firstName: "Morten", lastName: "Breum", email: "mb@gmail.com", password: "morten", deltager: [{idEvent: 63, eventName: "DØK Hyttetur", owner: "67", location: "Frederikberg", price: 250, eventDate: "10-04-2018", description: "Vi glæder os til at se jer", isDeletede: 0},{idEvent: 64, eventName: "DØK Ski", owner: "67", location: "Val T", price: 4000, eventDate: "04-12-2018", description: "FEST I Val T", isDeletede: 0},{idEvent: 66, eventName: "Torsdagsfest", owner: "92", location: "Nexus", price: 35, eventDate: "10-04-2017", description: "Det blir fest", isDeletede: 0},{idEvent: 68, eventName: "DØK Jul", owner: "30", location: "Bit-Lab", price: 350, eventDate: "24-12-2017", description: "DØK Jul for de mest inkarnerede DØK'ere", isDeletede: 0},{idEvent: 70, eventName: "Julebord", owner: "30", location: "Østerbrohallen", price: 230, eventDate: "09-12-1997", description: "Julefrokost. Fri bar", isDeletede: 0},{idEvent: 71, eventName: "Makroøkonomi", owner: "56", location: "sps16", price: 0, eventDate: "29-11-2017", description: "Dette er så sjovt", isDeletede: 0}]}
    ],

    events: [
        {idEvent: 63, eventName: "DØK Hyttetur", owner: "67", location: "Frederikberg", price: 250, eventDate: "10-04-2018", description: "Vi glæder os til at se jer", isDeletede: 0, deltagere: [{idStudent: 67, firstName: "Morten", lastName: "Ottesen", email: "mote12@cbs.dk", password: "Haps1234"},{idStudent: 30, firstName: "Alberto", lastName: "Contador", email: "ac@gmail.com", password: "alberto"},{idStudent: 92, firstName: "Frank", lastName: "Hvam", email: "fh@gmail.com", password: "frank"},{idStudent: 56, firstName: "Morten", lastName: "Breum", email: "mb@gmail.com", password: "morten"}]},
        {idEvent: 64, eventName: "DØK Ski", owner: "67", location: "Val T", price: 4000, eventDate: "04-12-2018", description: "FEST I Val T", isDeletede: 0, deltagere: [{idStudent: 67, firstName: "Morten", lastName: "Ottesen", email: "mote12@cbs.dk", password: "Haps1234"},{idStudent: 92, firstName: "Frank", lastName: "Hvam", email: "fh@gmail.com", password: "frank"},{idStudent: 56, firstName: "Morten", lastName: "Breum", email: "mb@gmail.com", password: "morten"}]},
        {idEvent: 66, eventName: "Torsdagsfest", owner: "92", location: "Nexus", price: 35, eventDate: "10-04-2017", description: "Det blir fest", isDeletede: 0, deltagere: [{idStudent: 92, firstName: "Frank", lastName: "Hvam", email: "fh@gmail.com", password: "frank"},{idStudent: 56, firstName: "Morten", lastName: "Breum", email: "mb@gmail.com", password: "morten"}]},
        {idEvent: 68, eventName: "DØK Jul", owner: "30", location: "Bit-Lab", price: 350, eventDate: "24-12-2017", description: "DØK Jul for de mest inkarnerede DØK'ere", isDeletede: 0, deltagere: [{idStudent: 92, firstName: "Frank", lastName: "Hvam", email: "fh@gmail.com", password: "frank"},{idStudent: 30, firstName: "Alberto", lastName: "Contador", email: "ac@gmail.com", password: "alberto"},{idStudent: 56, firstName: "Morten", lastName: "Breum", email: "mb@gmail.com", password: "morten"}]},
        {idEvent: 70, eventName: "Julebord", owner: "30", location: "Østerbrohallen", price: 230, eventDate: "09-12-1997", description: "Julefrokost. Fri bar", isDeletede: 0, deltagere: [{idStudent: 30, firstName: "Alberto", lastName: "Contador", email: "ac@gmail.com", password: "alberto"},{idStudent: 56, firstName: "Morten", lastName: "Breum", email: "mb@gmail.com", password: "morten"},{idStudent: 67, firstName: "Morten", lastName: "Ottesen", email: "mote12@cbs.dk", password: "Haps1234"}]},
        {idEvent: 71, eventName: "Makroøkonomi", owner: "56", location: "sps16", price: 0, eventDate: "29-11-2017", description: "Dette er så sjovt", isDeletede: 0, deltagere: [{idStudent: 56, firstName: "Morten", lastName: "Breum", email: "mb@gmail.com", password: "morten"}]}
    ]
}