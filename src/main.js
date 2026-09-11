import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import {getImagesByQuery} from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector(".form");
const loadMoreButton = document.querySelector(".load-more");

let page = 1;
let query = "";

form.addEventListener("submit", async event => {
  event.preventDefault();
  page = 1;
  hideLoadMoreButton();

  query = event.currentTarget.elements["search-text"].value.trim();
  
    const input = event.currentTarget.elements["search-text"];
    if (query === "") {
  return;
}
    clearGallery();
    showLoader();

    
  try {
  const data = await getImagesByQuery(query, page);

  if (data.hits.length === 0) {
    iziToast.error({
      title: "Error",
      message: "Sorry, there are no images matching your search query. Please try again!",
    });
    return;
  }

  if (data.totalHits > data.hits.length) {
  showLoadMoreButton();
} else {
  hideLoadMoreButton();
  iziToast.info({
    message: "We're sorry, but you've reached the end of search results.",
  });
} 

  input.value = "";
  createGallery(data.hits);

 
} catch (error) {
  iziToast.error({
    title: "Error",
    message: "Something went wrong. Please try again later.",
  });
} finally {
  hideLoader();
  }
  });

loadMoreButton.addEventListener("click", async event => {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);
    const cardHeight = document.querySelector(".gallery-item").getBoundingClientRect().height;

    window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});

    if (page * 15 >= data.totalHits) {
  hideLoadMoreButton();
  iziToast.info({
    message: "We're sorry, but you've reached the end of search results.",
  });
} else {
  showLoadMoreButton();
}

   } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again later.",
    });
  } finally {
  hideLoader();
}
})