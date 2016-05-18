var bs = require('nodestalker'),
    client = bs.Client('127.0.0.1:11300'),
    tube = 'alprd';


function validate(plate){
    console.log(plate.length);
    if(plate.length == 6){
        var firstChar = plate.charAt(0);
        var secondChar = plate.charAt(1);
        var thirdChar = plate.charAt(2);
        
        var firstNum = plate.charAt(3);
        var secondNum = plate.charAt(4);
        var thirdNum = plate.charAt(5);
        if(firstChar.match(/[A-Z]/i) && secondChar.match(/[A-Z]/i) && thirdChar.match(/[A-Z]/i)){
            if(firstNum.match(/[0-9]/i) && secondNum.match(/[0-9]/i) && thirdNum.match(/[0-9]/i)){
                return true;
            }
        }
    }else{
        if(plate.length == 7){
            var firstChar = plate.charAt(0);
            var secondChar = plate.charAt(1);
            
            var firstNum = plate.charAt(2);
            var secondNum = plate.charAt(3);
            var thirdNum = plate.charAt(4);

            var thirdChar = plate.charAt(5);
            var fourthChar = plate.charAt(6);
            if(firstChar.match(/[A-Z]/i) && secondChar.match(/[A-Z]/i) ){
                if(firstNum.match(/[0-9]/i) && secondNum.match(/[0-9]/i) && thirdNum.match(/[0-9]/i)){
                    if(thirdChar.match(/[A-Z]/i) && fourthChar.match(/[A-Z]/i) ){
                        return true;
                    }
                }
            }
        }else{
            return false;
        }
    }
}    

module.exports = {

    init:function( plates, socketH){
        client.watch(tube).onSuccess(function(data) {
            function resJob() {
                client.reserve().onSuccess(function(job) {

                    json = JSON.parse(job.data);

                    var plate = json.results[0].plate;
                    var confidence = json.results[0].confidence;
                    var uuid = json.uuid;;
                    var aux = { 'id' : plate, 'confidence' : confidence, 'uuid' : uuid}
                    

                    if(validate(""+plate)){
                        if(plates.isEmpty() || !(plates.getLast().id == aux.id)){
                            plates.add(aux);
                            socketH.emitNewPlate(aux);
                            console.log("OK - Added: " + plate, ':', confidence);
                        }else{
                            console.log("REPEATED - NOT Added: " + plate, ':', confidence);
                        }
                        
                    }else{
                        console.log("VALIDATION - NOT added: " + plate, ':', confidence);
                    }
                    

                    client.deleteJob(job.id).onSuccess(function(del_msg) {
                        console.log('message', del_msg);
                        resJob();
                    });
                });
            }
            resJob();
        });
    }
    
};
