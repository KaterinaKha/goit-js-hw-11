import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs, API_KEY, URL_PREFIX } from './scripts/models/refs';
import searchImages from './scripts/searchImages';

refs.formEl.addEventListener('submit', onSerachButtonSubmit);

function onSerachButtonSubmit(e) {
  e.preventDefault();
  const input = refs.formEl.elements.searchQuery;
  let searchQuery = input.value.trim();
  // console.log(searchQuery);

  if (!searchQuery) return;

  searchImages(searchQuery)
    .then(({ data, config }) => {
      console.log(data);

      if (data.hits.length === 0) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      // if (data.hits.length > 0) {
      //   Notify.info(`Hooray! We found ${data.totalHits} images.`);
      // }
    })
    .catch(error => Notify.failure(error.message));

  refs.formEl.reset();
}
