import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './scripts/models/data.js';
import searchImages from './scripts/searchImages.js';
import addImageMarkup from './scripts/models/markups.js';
import LoadMoreBtn from './scripts/components/LoadMoreBtn.js';

let searchQuery = '';
let page = 1;
let totalPages = 0;

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

refs.formEl.addEventListener('submit', onSerachButtonSubmit);
loadMoreBtn.button.addEventListener('click', onLoadMoreButtonClick);

function onSerachButtonSubmit(e) {
  e.preventDefault();

  const input = refs.formEl.elements.searchQuery;
  searchQuery = input.value.trim();

  loadMoreBtn.show();
  clearGallery();

  if (!searchQuery) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loadMoreBtn.hide();
    return;
  } else {
    page = 1;
    loadMoreBtn.disable();
    searchImages(searchQuery, page)
      .then(({ data, config }) => {
        if (data.hits.length === 0) {
          loadMoreBtn.hide();
          throw new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        loadMoreBtn.disable();
        addImageMarkup(data.hits, refs, page);
        loadMoreBtn.enable();
        Notify.info(`Hooray! We found ${data.totalHits} images.`);

        if (
          data.hits.length >= data.totalHits ||
          data.totalHits / 40 < config.params.page
        ) {
          Notify.warning(
            "We're sorry, but you've reached the end of search results."
          );
          loadMoreBtn.hide();
        }
      })

      .catch(error => Notify.failure(error.message));
  }
  refs.formEl.reset();
}

function clearGallery() {
  refs.galleryEl.innerHTML = '';
}

function onLoadMoreButtonClick() {
  page += 1;
  searchImages(searchQuery, page)
    .then(({ data, config }) => {
      if (!searchQuery) return;
      addImageMarkup(data.hits, refs, page);
      if (
        data.hits.length >= data.totalHits ||
        data.totalHits / 40 < config.params.page
      ) {
        Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );

        loadMoreBtn.hide();
      }
    })

    .catch(error => Notify.failure(error.message));
}
