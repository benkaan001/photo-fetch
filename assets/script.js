const apiKey = "563492ad6f91700001000001aa263508ec134ddeb8ad875e9de15518";
const galleryEl = document.querySelector(".gallery");
const searchForm = document.querySelector(".header form");
const loadAnchorEl = document.querySelector(".load-ancor");
const h1El = document.querySelector("h1");

let defaulPageNumber = 1;
let defaultSearchInput = "";
let pageNumber;

document.addEventListener("DOMContentLoaded", () => {
  getImages(defaulPageNumber);
});
searchForm.addEventListener("submit", (e) => {
  // defaulPageNumber = 1;
  loadSearchedImages(e);
});
loadAnchorEl.addEventListener("click", (e) => {
  loadMoreImages(e);
});
h1El.addEventListener("click", () => {
  // defaulPageNumber = 1;
  galleryEl.innerHTML = "";
  getImages(defaulPageNumber);
});

async function getImages(pageNumber) {
  loadAnchorEl.setAttribute("data-img", "curated");
  const baseURL = `https://api.pexels.com/v1/curated?page=${pageNumber}&per_page=12`;
  const data = await fetchImages(baseURL);
  generatePage(data.photos);
}
async function fetchImages(baseURL) {
  const response = await fetch(baseURL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: apiKey,
    },
  });
  const data = await response.json();

  return data;
}
function generatePage(photos) {
  photos.forEach((photo) => {
    const item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = `
          <a href='${photo.src.original}' target="_blank">
            <img src="${photo.src.medium}">
            <h3><i>Created By:</i> ${photo.photographer}</h3>
          </a>
          `;
    galleryEl.appendChild(item);
  });
}
async function loadSearchedImages(e) {
  loadAnchorEl.setAttribute("data-img", "search");
  e.preventDefault();
  galleryEl.innerHTML = "";
  const newSearchInput = e.target.querySelector("input").value;
  defaultSearchInput = newSearchInput;
  const baseURL = `https://api.pexels.com/v1/search?query=${newSearchInput}&page=1&per_page=12`;
  const data = await fetchImages(baseURL);
  generatePage(data.photos);
  e.target.reset();
}
async function getMoreSearchedImages(pageNumber) {
  // console.log(newSearchInput)
  const baseURL = `https://api.pexels.com/v1/search?query=${defaultSearchInput}&page=${pageNumber}&per_page=12`;
  const data = await fetchImages(baseURL);
  console.log(data);
  generatePage(data.photos);
}

function loadMoreImages(e) {
  let pageNumber = defaulPageNumber++;
  console.log(pageNumber);
  const loadMoreData = e.target.getAttribute("data-img");
  if (loadMoreData === "curated") {
    // load next page for curated]
    getImages(pageNumber);
  } else {
    // load next page for search
    getMoreSearchedImages(pageNumber);
  }
}
