import gallery from "./data/gallery-items.js";

const gallaryList = document.querySelector('[data-attr="gallery"]');
const modalItem = document.querySelector(".modal");
const closeBtnlItem = document.querySelector(".close-button");
const rightBtnlItem = document.querySelector(".right-button");
const leftBtnlItem = document.querySelector(".left-button");
const galleryLinkItem = document.querySelector(".gallery__item");
const bodyItem = document.querySelector("body");

let galleryModalImage;
const galleryOriginalImagesArray = [];
let currentImage;
let currentImageIndex;

appendGalleryMarkup(gallery);
gallaryList.addEventListener("click", onClickGalleryLinkItem);
gallery.forEach((image) => {
  galleryOriginalImagesArray.push(image.original);
});

function createPictureMarkup({ description, original, preview }) {
  return `<li class="gallery__item">
    <a
        class="gallery__link"
        href="${original}"
    >
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
</li>`;
}

function createPictureMarkupInModal(description, original) {
  bodyItem.classList.add("modal-open");

  return modalItem.insertAdjacentHTML(
    "afterbegin",
    `<div class="gallery__modal__image">
        <img
            class="lightbox__image"
            src="${original}"
            data-source="${description}"
            alt="${description}"
        />
        </div>`
  );
}

function createGalleryMarkup(gallery) {
  return gallery.map((item) => createPictureMarkup(item)).join("");
}

function appendGalleryMarkup(gallery) {
  return gallaryList.insertAdjacentHTML(
    "afterbegin",
    createGalleryMarkup(gallery)
  );
}

function onClickCloseBtnItem() {
  closeBtnlItem.classList.toggle("close");
  rightBtnlItem.classList.toggle("close");
  leftBtnlItem.classList.toggle("close");
  modalItem.classList.toggle("close");
  bodyItem.classList.remove("modal-open");

  modalItem.textContent = "";
  //   console.log("onClickCloseBtnItem -> modalItem", modalItem);
}

function onClickGalleryLinkItem(e) {
  e.preventDefault();

  currentImage = e.target.dataset.source;
  //   console.log("appendGalleryMarkup -> currentImage", currentImage);

  currentImageIndex = galleryOriginalImagesArray.indexOf(currentImage);
  //   console.log("onClickGalleryLinkItem -> currentImageIndex", currentImageIndex);

  if (e.target.nodeName !== "IMG") {
    return;
  }
  let original = e.target.closest(".gallery__link").getAttribute("href");
  let description = e.target.getAttribute("alt");
  createPictureMarkupInModal(description, original);

  galleryModalImage = document.querySelector(".gallery__modal__image");
  //   console.log(galleryModalImage);

  closeBtnlItem.classList.toggle("close");
  modalItem.classList.toggle("close");
  rightBtnlItem.classList.toggle("close");
  leftBtnlItem.classList.toggle("close");

  document.addEventListener("keydown", onEscKeyDown);
  modalItem.addEventListener("click", onBackdropClick);
  rightBtnlItem.addEventListener("click", onRightBtnClick);
  leftBtnlItem.addEventListener("click", onLeftBtnlClick);
  closeBtnlItem.addEventListener("click", onClickCloseBtnItem);
}

function onEscKeyDown(e) {
  if (e.key === "Escape") {
    onClickCloseBtnItem();
    document.removeEventListener("keydown", onEscKeyDown);
  }
}
function onBackdropClick(e) {
  if (e.target.nodeName !== "IMG") {
    onClickCloseBtnItem();
    modalItem.removeEventListener("click", onBackdropClick);
  }
}

function onRightBtnClick() {
  modalItem.textContent = "";
  //   currentImageIndex += 1;

  if (currentImageIndex < galleryOriginalImagesArray.length - 1) {
    currentImageIndex += 1;
  } else {
    currentImageIndex += 1 - galleryOriginalImagesArray.length;
  }

  return modalItem.insertAdjacentHTML(
    "afterbegin",
    `<div class="gallery__modal__image">
        <img
            class="lightbox__image"
            src="${galleryOriginalImagesArray[currentImageIndex]}"
           
        />
        </div>`
  );
}

function onLeftBtnlClick() {
  modalItem.textContent = "";
  //   currentImageIndex += 1;

  if (currentImageIndex > 0) {
    currentImageIndex -= 1;
  } else {
    currentImageIndex += galleryOriginalImagesArray.length - 1;
  }

  return modalItem.insertAdjacentHTML(
    "afterbegin",
    `<div class="gallery__modal__image">
        <img
            class="lightbox__image"
            src="${galleryOriginalImagesArray[currentImageIndex]}"
           
        />
        </div>`
  );
}
