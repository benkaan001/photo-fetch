const inputEl = document.querySelector("input");
const searchBtn = document.querySelector(".search-btn");
const loadBtn = document.querySelector(".load-btn");

let searchInput = "";
let currentPage;

// event listener for the input entry

inputEl.addEventListener("input", (event) => {
  event.preventDefault();
  searchInput = event.target.value;
  console.log(searchInput);
});

// get images to display

async function getImages(currentPage) {
  const baseURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=12`;
  const apiKey = "563492ad6f91700001000001aa263508ec134ddeb8ad875e9de15518";
  const data = await fetch(baseURL, {
    method: "GET",
    headers: {
      Accept: "application/JSON",
      Authorization: apiKey,
    },
  });
  const response = await data.json();
  console.log(response);
}

// const apiKey = "563492ad6f91700001000001aa263508ec134ddeb8ad875e9de15518";
