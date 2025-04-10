///////////////////////////////////////////
// FIRST CLASS
///////////////////////////////////////////

// DRONES

const dronesContainer = document.querySelector(".drones-container");

fetch("https://aero-verge.herokuapp.com/dronesArr")
  .then((response) => response.json())
  .then((data) => getData(data));

function getData(drones) {
  drones.array.forEach((drone) => renderDrone(drone));
}

function renderDrone(drone) {
  const html = `
    <h1>${drone.title}</h1>
    <img src="${drone.image1}" alt="">
    <p>Price : ${drone.price}</p>
`;

  dronesContainer.insertAdjacentHTML("afterbegin", html);
}

// POSTS

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => renderPosts(data));

function renderPosts(posts) {
  posts.forEach((post) => console.log(post));
}

// COMMENTS

fetch("https://jsonplaceholder.typicode.com/comments")
  .then((response) => response.json())
  .then((data) => console.log(data));

///////////////////////////////////////////
// SECOUND CLASS
///////////////////////////////////////////

// Synchronous JavaScript

const a = 10;
const b = 20;
const sum = a + b;
console.log(sum);
console.log(b);
console.log(a - b);

setTimeout(() => {
  console.log("first");
}, 5000); // executes asynchronous way

console.log("second");
console.log(sum);
console.log("last");

/* AJAX - Asynchronous Javascript  and XML(Extensible Markup Language) --- create an communication line with server or database in which you can use data remotely

 - AJAX stands for Asynchronous JavaScript And XML. In a nutshell, it is the use of the XMLHttpRequest object to communicate with servers. It can send and receive information in various formats, including JSON, XML, HTML, and text files. AJAX's most appealing characteristic is its "asynchronous" nature, which means it can communicate with the server, exchange data, and update the page without having to refresh the page.

 The two major features of AJAX allow you to do the following:

  1. Make requests to the server without reloading the page
  2. Receive and work with data from the server
 */

/* API - Application Programming Interface - browser serves API

Application Programming Interfaces (APIs) are constructs made available in programming languages to allow developers to create complex functionality more easily. They abstract more complex code away from you, providing some easier syntax to use in its place.

Browser APIs : DOM, Geolocation API, Intersection Observer, Internationalization API 

Browser APIs are built into your web browser and are able to expose data from the browser and surrounding computer environment and do useful complex things with it. For example, the Web Audio API provides JavaScript constructs for manipulating audio in the browser — taking an audio track, altering its volume, applying effects to it, etc. In the background, the browser is actually using some complex lower-level code (e.g. C++ or Rust) to do the actual audio processing. But again, this complexity is abstracted away from you by the API.

Common browser APIs :

    1. APIs for manipulating documents loaded into the browser. For example DOM - (Document Object Model) API, which allows you to manipulate HTML and CSS — creating, removing and changing HTML, dynamically applying new styles to your page, etc.  Every time you see a popup window appear on a page or some new content displayed, for example, that's the DOM in action.

    2. APIs that fetch data from the server to update small sections of a webpage on their own are very commonly used. This seemingly small detail has had a huge impact on the performance and behavior of sites — if you just need to update a stock listing or list of available new stories, doing it instantly without having to reload the whole entire page from the server can make the site or app feel much more responsive and "snappy". The main API used for this is the Fetch API, although older code might still use the XMLHttpRequest API. You may also come across the term Ajax, which describes this technique.

    3. APIs for drawing and manipulating graphics are widely supported in browsers — the most popular ones are Canvas and WebGL, which allow you to programmatically update the pixel data contained in an HTML <canvas> element to create 2D and 3D scenes.

    4. Audio and Video APIs like HTMLMediaElement, the Web Audio API, and WebRTC allow you to do really interesting things with multimedia such as creating custom UI controls for playing audio and video, displaying text tracks like captions and subtitles along with your videos, grabbing video from your web camera to be manipulated via a canvas or displayed on someone else's computer in a web conference, or adding effects to audio tracks (such as gain, distortion, panning, etc.).

    5. Device APIs enable you to interact with device hardware: for example, accessing the device GPS to find the user's position using the Geolocation API.

    6. Client-side storage APIs enable you to store data on the client-side, so you can create an app that will save its state between page loads, and perhaps even work when the device is offline. There are a number of options available, e.g. simple name/value storage with the Web Storage API, and more complex database storage with the IndexedDB API.
 */

const wrapper = document.querySelector(".country-wrapper");

const btn = document.querySelector(".btn");

// CLASSICAL WAY OF AJAX CALL(XML FORMAT)

btn.addEventListener("click", function () {
  const input = document.querySelector(".input-country");
  const inputValue = input.value;

  const request = new XMLHttpRequest();

  request.open("GET", ` https://restcountries.com/v2/name/${inputValue}`);

  request.send();

  console.log(request.responseText);

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data); // destructured data array

    renderData(data);
  });
});

function renderData(country) {
  console.log(country);

  const html = `

    <div class="country">
      <h1>${country.name}</h1>
      <p>Population : ${(country.population / 1000000).toFixed(2)} M people</p>
      <p>Capital : ${country.capital}</p>
      <p>Language : ${country.language[0].name}</p>
    </div>`;

  wrapper.insertAdjacentHTML("afterbegin", html);
}

///////////////////////////////////////////
// THIRD CLASS
///////////////////////////////////////////

// MODERN WAY OF AJAX CALL(JSON FORMAT)

const wrapperjson = document.querySelector(".wrapper");

fetch("https://jsonplaceholder.typecode.com/posts")
  .then((response) => {
    console.log(response);
    if (!response.ok)
      throw new Error(`Something Went Wrong! - ${response.status}`);
    return response.json();
  })
  .then((data) => renderPost(data))
  .catch((error) => renderErrorMsg(error));

function renderPost(posts) {
  posts.forEach((post) => {
    const html = `
  <p> ${post.id}</p>
  <h2>${post.title} </h2>
  <p> ${post.body}</p>
  `;
    wrapperjson.insertAdjacentHTML("beforeend", html);
  });
}

function renderErrorMsg(error) {
  wrapperjson.insertAdjacentText("afterbegin", error);
}

// Another Example

const container = document.querySelector(".container");

fetch("'https://fakestoreapi.com/products'")
  .then((response) => {
    if (!response.ok)
      throw new Error(`products not found!  (${response.status})`);
    return response.json();
  })
  .then((data) => renderData1(data))
  .catch((err) => renderError(err.message));

function renderData1(products) {
  products.forEach((product) => {
    const html = `

      <p>${product.id} </p>
      <h2>${product.id} </h2>
      <p>${product.price.toLocaleString("bn-BD", {
        style: "currency",
        currency: "BDT",
      })} </p>
      
      `;
    container.insertAdjacentHTML("afterbegin", html);
  });
}

function renderError(error) {
  container.insertAdjacentText("afterbegin", error);
}

// CLASS

class App {
  constructor() {
    this._fetchData;
  }

  _fetchData() {
    fetch("'https://fakestoreapi.com/products'")
      .then((response) => {
        if (!response.ok)
          throw new Error(`products not found!  (${response.status})`);
        return response.json();
      })
      .then((data) => this._renderData1(data))
      .catch((err) => this._renderError(err.message));
  }

  _renderData1(products) {
    products.forEach((product) => {
      const html = `
  
        <p>${product.id} </p>
        <h2>${product.id} </h2>
        <p>${product.price.toLocaleString("bn-BD", {
          style: "currency",
          currency: "BDT",
        })} </p>
        
        `;
      container.insertAdjacentHTML("afterbegin", html);
    });
  }

  _renderError(error) {
    container.insertAdjacentText("afterbegin", error);
  }
}

const myApp = new App();

///////////////////////////////////////////
// FOUR CLASS(MODERN API)
///////////////////////////////////////////

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => {
    console.log(response);

    if (!response.ok) throw new Error("Something Went Wrong");
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err.message);
  });

// POST DATA TO THE SERVER

const button = document.querySelector(".button");

button.addEventListener("click", function (e) {
  const userId = document.querySelector(".user-id").value;
  const title = document.querySelector(".title").value;
  const body = document.querySelector(".body").value;

  e.preventDefault();

  const data = {
    userId: userId,
    title: title,
    body: body,
  };

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => console.log(data));
});

// DIFFRENT WAY OF GETTING DATA(Efficient, optimized) using async function

// fetch => response.json() => data => catch

async function fetchData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    console.log(response);

    console.log(30 + 90);

    if (!response.ok) throw new Error("Something went wrong!");

    const data = response.json();
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
}

fetchData();

async function fetchPost() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error("Error Occurs!");

    const data = await res.json();
    console.log(data);
  } catch (err) {
    err.insertAdjacentText("afterbegin", err);
  }
}

fetchPost();
