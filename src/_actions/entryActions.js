import axios from "axios";

export const postEntry = entry => {
  axios
    .post("/api/v1/entry", entry)
    .then(data => console.log(data))
    // data.data =  {
    //     "delivered": false,
    //     "_id": "5c33b2497d82d1df58e139b4",
    //     "recipient": "5c304d3e5ac77665045e5e6d",
    //     "mood": "#ff0000",
    //     "description": "Hey Peg, this is the first time I've tried writing a message, so I hope it goes okay.",
    //     "userId": "5c1952ec34c153f010125a00",
    //     "createdAt": "2019-01-07T20:10:49.924Z",
    //     "updatedAt": "2019-01-07T20:10:49.924Z",
    //     "__v": 0
    // }
    .catch(err => console.log(err));
};
