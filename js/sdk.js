const SDK = {

    Bruger: {
        opretBruger: function(fornavn, efternavn, email, password, callback){
            if(fornavn && efternavn && email && password){
                var id = new Date().getTime();
                sessionStorage.setItem("token", email + "-token");
                sessionStorage.setItem("bruger", JSON.stringify({idStudent: id, firstName: fornavn, lastName: efternavn, email: email, password: password}));
                callback(null, data)
            } else{
                var err = "Oprettelsen mislykkedes"
                callback(err)
            }
        },

        login: function(email, password, callback){
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
        getEvents: function(callback) {
            callback(null,data.events)
        }
    }

}

var data = {
    brugere: [
        {idStudent: 67, firstName: "Morten", lastName: "Ottesen", email: "mote12@cbs.dk", password: "Haps1234"},
        {idStudent: 92, firstName: "Frank", lastName: "Hvam", email: "fh@gmail.com", password: "frank"},
        {idStudent: 30, firstName: "Alberto", lastName: "Contador", email: "ac@gmail.com", password: "alberto"},
        {idStudent: 56, firstName: "Morten", lastName: "Breum", email: "mb@gmail.com", password: "morten"}
    ],

    events: [
        {idEvent: 63, eventName: "DØK Hyttetur", owner: "67", location: "Frederikberg", price: 250, eventDate: "10-04-2018", description: "Vi glæder os til at se jer", isDeletede: 0, deltagere: [67,30,92,56]},
        {idEvent: 64, eventName: "DØK Ski", owner: "67", location: "Val T", price: 4000, eventDate: "04-12-2018", description: "FEST I Val T", isDeletede: 0, deltagere: [67,92,56]},
        {idEvent: 66, eventName: "Torsdagsfest", owner: "92", location: "Nexus", price: 35, eventDate: "10-04-2017", description: "Det blir fest", isDeletede: 0, deltagere: [92,56]},
        {idEvent: 68, eventName: "DØK Jul", owner: "30", location: "Bit-Lab", price: 350, eventDate: "24-12-2017", description: "DØK Jul for de mest inkarnerede DØK'ere", isDeletede: 0, deltagere: [92,30,56]},
        {idEvent: 70, eventName: "Julebord", owner: "30", location: "Østerbrohallen", price: 230, eventDate: "09-12-1997", description: "Julefrokost. Fri bar", isDeletede: 0, deltagere: [30,56]},
        {idEvent: 71, eventName: "Makroøkonomi", owner: "56", location: "sps16", price: 0, eventDate: "29-11-2017", description: "Dette er så sjovt", isDeletede: 0, deltagere: [56]}
    ]
}