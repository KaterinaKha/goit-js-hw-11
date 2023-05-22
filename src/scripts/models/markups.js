function addImageMarkup(data) {
  return data
    .map(
      card =>
        ` <div class="photo-card">
  <a class = "gallery-link" href = "${card.largeImageURL}">
  <img class = "gallery-img" src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${card.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${card.views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${card.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${card.downloads}
    </p>
  </div>
</div>`
    )
    .join('');
}
