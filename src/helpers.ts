import axios from "axios";

export const reset = () => {
  axios
    .get(
      "https://magiclab-twitter-interview.herokuapp.com/kamil-albrycht/reset"
    )
    .then(res => {
      console.log("reset OK");
    })
    .catch(err => {
      console.log("reset PROBLEM");
    });
};
