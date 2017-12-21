$(document).ready(function(){
    $("#reset").on("click", function(){
        SDK.resetData(function (err, data) {
            if(err){
                alert(err)
            } else{
                window.location.href = "index.html";
            }
        })
    })
});