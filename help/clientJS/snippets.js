// how to get all elements from the ejs and send a fetch request back to the server with the data from the DOM

// selects all elements with class fa-heart
let pickFav = document.querySelectorAll(".fa-heart");

// adds an eventlistener to each one and allows us to specify what function will run when it is clicked
Array.from(pickFav).forEach((x) => {
  x.addEventListener("click", makeFav);
});

// function that runs after the element is clicked
async function makeFav() {
  // goes to the parent element and then we specify what to select from
  const imageCheck = this.parentNode.querySelector("img").src;

  //   fetch request
  try {
    const response = await fetch("/fav", {
      // method can be either PUT, GET, POST, DELETE
      method: "put",
      //   headers specify that we are using json
      headers: { "Content-Type": "application/json" },
      //   body of the json
      body: JSON.stringify({
        // takes the form of {key : value}
        hdurl: imageCheck,
      }),
    });
  } catch (err) {
    console.log(err);
  }
}
