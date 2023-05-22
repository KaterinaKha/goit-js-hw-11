import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './scripts/models/refs';
import searchImages from './scripts/searchImages';
import addImageMarkup from './scripts/models/markups';

refs.formEl.addEventListener('submit', onSerachButtonSubmit);
refs.loadMorebutton.addEventListener('click', onLoadMoreButtonClick);
let searchQuery = '';
let page = 1;

function onSerachButtonSubmit(e) {
  e.preventDefault();
  clearGallery();
  const input = refs.formEl.elements.searchQuery;
  searchQuery = input.value.trim();

  if (!searchQuery) return;
  else {
    page = 1;
    searchImages(searchQuery, page)
      .then(({ data, config }) => {
        console.log(data, config);

        if (data.hits.length === 0) {
          throw new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        addImageMarkup(data.hits, refs);
        Notify.info(`Hooray! We found ${data.totalHits} images.`);
      })

      .catch(error => Notify.failure(error.message));

    refs.formEl.reset();
  }
}

function clearGallery() {
  refs.galleryEl.innerHTML = '';
}

function onLoadMoreButtonClick() {
  page += 1;
  searchImages(searchQuery, page).then(({ data, config }) => {
    addImageMarkup(data.hits, refs, page);
  });
}
