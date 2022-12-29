import { galleryItems } from "./gallery-items.js";

console.log(galleryItems);

const galleryEl = document.querySelector(".gallery");

// Version 1
// const createItem = ({ preview, original, description } = {}) => {
//   return `<div class="gallery__item">
//            <a class="gallery__link" href = ${original}>
//              <img class="gallery__image" src = ${preview} alt = ${description} data-source = "${original}" />
//            </a>
//          </div>`;
// };

// const img = galleryItems.map((image) => {
//   return createItem(image);
// });

// galleryEl.innerHTML = img.join("");
// console.log(galleryEl);

// Version 2
const createImg = (galleryItems) => {
  const setOfItems = [];

  galleryItems.forEach((el) => {
    const { preview, original, description } = el;

    const itemEl = document.createElement("div");
    itemEl.classList.add("gallery__item");

    const linkEl = document.createElement("a");
    linkEl.classList.add("gallery__link");
    linkEl.href = original;

    const imgEl = document.createElement("img");
    imgEl.classList.add("gallery__image");
    imgEl.src = preview;
    imgEl.alt = description;
    imgEl.dataset.source = original;

    itemEl.append(linkEl);
    linkEl.append(imgEl);
    setOfItems.push(itemEl);
  });

  galleryEl.append(...setOfItems);
};

createImg(galleryItems);
console.log(galleryEl);

let lightbox = null;

const onKeyDown = (event) => {
  if (event.key === "Escape") {
    console.log(event);

    lightbox.close();
  }
};

const zoomImg = (event) => {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  lightbox = basicLightbox.create(
    `<img src="${event.target.dataset.source}" alt = "${event.target.alt}" width="800" height="600" />`,

    {
      onShow: (lightbox) => {
        galleryEl.addEventListener("keydown", onKeyDown);
      },

      onClose: (lightbox) => {
        galleryEl.removeEventListener("keydown", onKeyDown);
      },
    }
  );

  lightbox.show();
};

galleryEl.addEventListener("click", zoomImg);
