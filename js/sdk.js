const SDK = {
    login: function(email, password, callback){
        //hardcoded test bruger
        if(email ===  "mote12@cbs.dk" && password === "Haps1234"){
            var data = {idStudent: 67, firstName: "Morten", lastName: "Ottesen", email: "mote12@cbs.dk"};
            sessionStorage.setItem("token", email + "-token");
            sessionStorage.setItem("bruger", JSON.stringify(data));
            callback(null, data)
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
}