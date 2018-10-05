const functions = require('firebase-functions');
var admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
var firestore = admin.firestore();

exports.funmop = functions.https.onRequest((request, response) => {
    switch (request.body.result.action) {
        case 'admission_enquiry':
        let params = request.body.result.parameters;
        firestore.collection('admission').add(params)
            .then(() => {

                response.send({
                    speech:
                        `${params.name}, Thank you for reaching out to us. What information you would like to know?`
                });
            })
            .catch((e => {

                console.log("error: ", e);

                response.send({
                    speech: "something went wrong when writing on database"
                });
            }))
        
        
  break;

        case 'email':
        firestore.collection('email').get()
        .then((querySnapshot) => {
            //if(querySnapshot.exists)
            //{
            var orders = [];
            querySnapshot.forEach((doc) => { orders.push(doc.data()) });
            var speech = `Here is the Email ID\n`;

            orders.forEach((eachOrder, index) => {
                speech += `${eachOrder.id}\n`
            })

            response.send({
                speech: speech
            });
       // }
        //else{
           // response.send({speech:"Email id doesn't exist. Make sure whether you typed the right one :D"})
       // }
        })
        .catch((err) => {
            console.log('Error getting documents', err);

            response.send({
                speech: "something went wrong when reading from database"
            })
        })
break;
        case 'UG':
        let ug= request.body.result.parameters.cname;
        if(ug=="UG")
        {
        firestore.collection('ug course').get()
                .then((querySnapshot) => {

                    var orders = [];
                    querySnapshot.forEach((doc) => { orders.push(doc.data()) });
                    var speech = `Here are the UG courses in our college\n`;

                    orders.forEach((eachOrder) => {
                        speech += `${eachOrder.cname}\n`
                    })

                    response.send({
                        speech: speech
                    });
                })
                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })
            }
            
            if(ug=="PG")
            {
        firestore.collection('PG').get()
                .then((querySnapshot) => {

                    var orders = [];
                    querySnapshot.forEach((doc) => { orders.push(doc.data()) });
                    var speech = `Here are the PG courses in our college\n`;

                    orders.forEach((eachOrder) => {
                        speech += `${eachOrder.course_name}\n`
                    })

                    response.send({
                        speech: speech
                    });
                })
                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })
            }
            
            break;
        
            case 'eligibility_criteria':
            let ip= request.body.result.parameters.cname;
            firestore.collection('UG').where("course_name","==",ip).get()
                .then((querySnapshot) => {

                    var orders = [];
                    querySnapshot.forEach((doc) => { orders.push(doc.data()) });
                    var speech = `Eligibility criteria for\n`;

                    orders.forEach((eachOrder) => {
                        speech += `${eachOrder.course_name} is ${eachOrder.eligibility_criteria}\n`
                    })

                    response.send({
                        speech: speech
                    });
                })
                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })
            break;
            case 'highlights':
            let ip3= request.body.result.parameters.cname;
            firestore.collection('UG').where("course_name","==",ip3).get()
                .then((querySnapshot) => {

                    var orders = [];
                    querySnapshot.forEach((doc) => { orders.push(doc.data()) });
                    var speech="";

                    orders.forEach((eachOrder) => {
                        speech += `${eachOrder.desc}\n`
                    })

                    response.send({
                        speech: speech
                    });
                })
                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })
            
            
            break;
            
            case 'category':
            let ip1= request.body.result.parameters.ccat;
        firestore.collection('UG').where("description","==",ip1).get()
                .then((querySnapshot) => {

                    var orders = [];
                    querySnapshot.forEach((doc) => { orders.push(doc.data()) });
                    var speech = `The `+ip1 + ` courses are`;

                    orders.forEach((eachOrder) => {
                        //speech+=ip1
                        speech += ` ${eachOrder.course_name}\n`
                    })

                    response.send({
                        speech: speech
                    });
                })
                .catch((err) => {
                    console.log('Error getting documents', err);

                    response.send({
                        speech: "something went wrong when reading from database"
                    })
                })
            
            
            break;
            case 'timing':
            let shift= request.body.result.parameters.shift;
            if(shift=="Shift I")
            {
            firestore.collection('timing').get()
            .then((querySnapshot) => {
                //if(querySnapshot.exists)
                //{
                var orders = [];
                querySnapshot.forEach((doc) => { orders.push(doc.data()) });
                var speech = `Timings for Shift I:\n`;
    
                orders.forEach((eachOrder, index) => {
                    speech += `${eachOrder.shift1}\n`
                })
    
                response.send({
                    speech: speech
                });
           // }
            //else{
               // response.send({speech:"Email id doesn't exist. Make sure whether you typed the right one :D"})
           // }
            })
            .catch((err) => {
                console.log('Error getting documents', err);
    
                response.send({
                    speech: "something went wrong when reading from database"
                })
            })
        }
        if(shift=="Shift II")
            {
            firestore.collection('timing').get()
            .then((querySnapshot) => {
                //if(querySnapshot.exists)
                //{
                var orders = [];
                querySnapshot.forEach((doc) => { orders.push(doc.data()) });
                var speech = `Timings for Shift II:\n`;
    
                orders.forEach((eachOrder, index) => {
                    speech += `${eachOrder.shift2}\n`
                })
    
                response.send({
                    speech: speech
                });
           // }
            //else{
               // response.send({speech:"Email id doesn't exist. Make sure whether you typed the right one :D"})
           // }
            })
            .catch((err) => {
                console.log('Error getting documents', err);
    
                response.send({
                    speech: "something went wrong when reading from database"
                })
            })
        }
    break;   
}
});