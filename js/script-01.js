import gallery from "./data/gallery-items.js";

const gallaryList = document.querySelector('[data-attr="gallery"]');
const modalItem = document.querySelector(".modal");
const closeBtnlItem = document.querySelector(".close-button");
const galleryLinkItem = document.querySelector(".gallery__item");
let galleryModalImage;

console.log("closeBtnlItem", closeBtnlItem);

function createPictureMarkup({ description, original, preview }) {
  return `<li class="gallery__item">
    <a
        class="gallery__link"
        href="${original}"
    >
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${description}"
            alt="${description}"
        />
    </a>
</li>`;
}

function createPictureMarkupInModal(description, original) {
  return modalItem.insertAdjacentHTML(
    "afterbegin",
    `<div class="gallery__modal__image">
        <img
            class="gallery__image"
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

appendGalleryMarkup(gallery);

closeBtnlItem.addEventListener("click", onClickCloseBtnItem);

function onClickCloseBtnItem() {
  closeBtnlItem.classList.toggle("close");
  modalItem.classList.toggle("close");

  modalItem.textContent = "";
  console.log("onClickCloseBtnItem -> modalItem", modalItem);
}

gallaryList.addEventListener("click", onClickGalleryLinkItem);

function onClickGalleryLinkItem(e) {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }
  let original = e.target.closest(".gallery__link").getAttribute("href");
  let description = e.target.getAttribute("alt");
  createPictureMarkupInModal(description, original);

  galleryModalImage = document.querySelector(".gallery__modal__image");
  console.log(galleryModalImage);

  closeBtnlItem.classList.toggle("close");
  modalItem.classList.toggle("close");
  document.addEventListener("keydown", onEscKeyDown);
}

function onEscKeyDown(e) {
  if (e.key === "Escape") {
    onClickCloseBtnItem();
    document.removeEventListener("keydown", onEscKeyDown);
  }
}
