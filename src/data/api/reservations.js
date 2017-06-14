import { db, dbRef } from '../config/firebase'

let dbReservations = dbRef.child("reservations");
let reservationsRef = db.ref("reservations")

export function createRequest(data, next, error) {
    dbReservations.push(data)
        .then(response => {
            next(response);
        }, errorResponse => {
            error(errorResponse);
        })
}

export function listRequests(next) {
    reservationsRef.on('value', function (snapshot) {
        let reservations = [];
        snapshot.forEach(function (childSnapshot) {
            let childData = childSnapshot.val();
            reservations.push(
                {
                    data: childData,
                    ref: childSnapshot.ref,
                    key: childSnapshot.key
                }
            );
        });
        next(reservations);
    })
}

export function listenRequests(onAdd,onRemove){
    reservationsRef.on('child_added', function(snapshot){
        onAdd(snapshot);
    });
    reservationsRef.on('child_removed', function(snapshot)
    {
        onRemove(snapshot);
    });
}