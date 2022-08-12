// how to get all elements from the ejs and send a fetch request back to the server with the data from the DOM

// selects all elements with class fa-heart

// let addGallery = document.querySelectorAll(".fa-heart");
let removePrivateGallery = document.querySelectorAll(".fa-thumbs-down");
let addPrivateGallery = document.querySelectorAll(".fa-heart");

// let searchGallery = document
//   .querySelector("button")
//   .addEventListener("click", fetchDate);

//this one searches the date

// async function fetchDate() {
//   // goes to the parent element and then we specify what to select from
//   //   const imageCheck = this.parentNode.querySelector("img").src;

//   //   fetch request
//   try {
//     const response = await fetch("/getObject", {
//       // method can be either PUT, GET, POST, DELETE
//       method: "GET",
//       //   headers specify that we are using json
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

//this one will add to private gallery

// adds an eventlistener to each one and allows us to specify what function will run when it is clicked
Array.from(addPrivateGallery).forEach((x) => {
  x.addEventListener("click", addGalleryItem);
});
// function that runs after the element is clicked
async function addGalleryItem() {
  // goes to the parent element and then we specify what to select from
  const imageCheck = this.parentNode.querySelector("img").src;

  //   fetch request
  try {
    const response = await fetch("/addGallery", {
      // method can be either PUT, GET, POST, DELETE
      method: "PUT",
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

// this one will remove from private gallery

Array.from(removePrivateGallery).forEach((x) => {
  x.addEventListener("click", removeGalleryItem);
});

async function removeGalleryItem() {
  // goes to the parent element and then we specify what to select from
  const imageCheck = this.parentNode.querySelector("img").src;

  //   fetch request
  try {
    const response = await fetch("/removeGallery", {
      // method can be either PUT, GET, POST, DELETE
      method: "PUT",
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
