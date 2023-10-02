let wrapperContent = document.querySelector(".content");
let inpDesc = document.querySelector(".inp-desc");
let inpDescEdit = document.querySelector(".inp-desc-edit");
let inpPrice = document.querySelector(".inp-price");
let inpPriceEdit = document.querySelector(".inp-price-edit");
let inpImage = document.querySelector(".inp-image");
let inpImageEdit = document.querySelector(".inp-image-edit");
let btnAdd = document.querySelector(".btn-add");
let save = document.querySelector(".save");
let btnShowModal = document.querySelector(".btn-show-modal");
let modal = document.querySelector(".modal");
let modalEdit = document.querySelector(".modal-edit");
let closeModal = document.querySelector(".close");
let closeEdit = document.querySelector(".close-edit");
let imgList = document.querySelectorAll(".img-list");
let nullPost = document.querySelector(".null-post");
let modalInfo = document.querySelector(".modal-info");
let closeInfo = document.querySelector(".close-info");
let titleInfo = document.querySelector(".title-info");
let priceInfo = document.querySelector(".price-info");
let imgInfo = document.querySelector(".img-info");
let post = null;
let editButton = null;
let data = [
  {
    id: 1,
    image: "./img/post-1.jpg",
    title: "Sofa set",
    price: "69.99" + "$",
    isComplete: false,
  },
  {
    id: 2,
    image: "./img/post-2.jpg",
    title: "Empreror bed",
    price: "21.99" + "$",
    isComplete: false,
  },
  {
    id: 3,
    image: "./img/post-3.jpg",
    title: "Entertainment center",
    price: "29.98" + "$",
    isComplete: false,
  },
];

function get() {
  wrapperContent.innerHTML = "";
  data.forEach((e) => {
    // Посты
    post = document.createElement("div");
    post.classList.add("post");
    let sold = document.createElement("p");
    sold.classList.add("sold");
    sold.innerHTML = "Куплено";
    // Главный Контейнер
    wrapperContent.append(post);
    // Контейнер изображения
    let wrapperImage = document.createElement("div");
    wrapperImage.classList.add("wrapper-image");
    // Изображения
    let image = document.createElement("img");
    image.src = e.image;
    wrapperImage.append(image);
    // Панель управления
    let controlPanel = document.createElement("div");
    controlPanel.classList.add("control-panel");
    // Контейнер - иконки слева
    let wrapperIconLeft = document.createElement("div");
    wrapperIconLeft.classList.add("wrapper-icon-left");
    // Иконки слева - delete
    let deleteButton = document.createElement("i");
    deleteButton.classList.add("delete");
    deleteButton.classList.add("fa-solid");
    deleteButton.classList.add("fa-trash-can");
    // Иконки слева - edit
    editButton = document.createElement("i");
    editButton.classList.add("edit");
    editButton.classList.add("fa-regular");
    editButton.classList.add("fa-pen-to-square");
    wrapperIconLeft.append(deleteButton, editButton);
    // Контейнер описание поста
    let wrapperText = document.createElement("div");
    wrapperText.classList.add("wrapper-text");
    let titleText = document.createElement("p");
    let priceText = document.createElement("p");
    titleText.innerHTML = e.title;
    priceText.innerHTML = e.price;
    wrapperText.append(titleText, priceText);
    // Контейнер - иконки справа
    let wrapperIconRight = document.createElement("div");
    wrapperIconRight.classList.add("wrapper-icon-right");
    // Иконка выбор товара checkbox
    let checkButton = document.createElement("input");
    checkButton.type = "checkbox";
    checkButton.checked = e.isComplete;
    checkButton.classList.add("check-post");
    // Иконка информация о товаре
    infoButton = document.createElement("span");
    infoButton.classList.add("info");
    infoButtonContent = document.createElement("p");
    infoButtonContent.innerHTML = "i";
    infoButton.append(infoButtonContent);
    wrapperIconRight.append(checkButton, infoButton);
    controlPanel.append(wrapperIconLeft, wrapperText, wrapperIconRight);
    post.append(sold, wrapperImage, controlPanel);

    // Функция "Удалить пост" - вызов

    deleteButton.onclick = () => {
      deletePost(e.id);
    };
    // Функция "Checked" - вызываем
    checkButton.onclick = () => {
      completePost(e.id);
      console.log(data);
    };

    // Функция checked при клике изменить посты
    if (e.isComplete === true) {
      post.style.opacity = "0.8";
      sold.style.display = "block";
    } else {
      post.style.opacity = "1";
      sold.style.display = "none";
    }

    // Открыть модальное окно для изменения
    editButton.onclick = () => {
      editOpen(e.id);
    };
    closeEdit.onclick = () => {
      modalEdit.style.display = "none";
    };

    // Открыть модальное окно информация о посте
    infoButton.onclick = () => {
      modalInfo.style.display = "block";
      imgInfo.src = e.image;
      titleInfo.innerHTML = e.title;
      priceInfo.innerHTML = e.price;
    };

    closeInfo.onclick = () => {
      modalInfo.style.display = "none";
    };
  });
}
get();

// Функция checked Создаем
function completePost(id) {
  data = data.map((e) => {
    if (e.id === id) e.isComplete = !e.isComplete;
    return e;
  });
  get();
}

// Открыть модальное окно
btnShowModal.onclick = () => {
  modal.style.display = "block";
};

// Добавляем изображение в поле ввода по клику
imgList.forEach((e) => {
  e.onclick = () => {
    inpImage.value = e.src;
  };
});

// Закрыть модальное окно
closeModal.onclick = () => {
  modal.style.display = "none";
};

// Функция Delete Post - создаем
function deletePost(id) {
  data = data.filter((e) => {
    return e.id !== id;
  });
  if (data.length === 0) {
    nullPost.style.display = "block";
  }
  get();
}

// Функция открыть изменить пост
let changedId = null;
function editOpen(id) {
  modalEdit.style.display = "block";
  changeData = data.find((e) => e.id === id);
  console.log(changeData.price);
  inpDescEdit.value = changeData.title;
  inpPriceEdit.value = changeData.price;
  inpImageEdit.value = changeData.image;
  changedId = id;
}

// Функция Сохранить
save.onclick = () => {
  console.log("TRUE");
  data = data.map((e) => {
    if (e.id === changedId) {
      e.title = inpDescEdit.value;
      e.price = inpPriceEdit.value;
      e.image = inpImageEdit.value;
    }
    return e;
  });
  get();
};

//   Функция "Добавить пост" - вызов

btnAdd.onclick = () => {
  if (inpDesc.value === "" || inpPrice.value === "" || inpImage.value === "") {
    alert("Заполните поля!");
  } else {
    let newData = {
      id: new Date().getTime(),
      image: inpImage.value,
      title: inpDesc.value,
      price: inpPrice.value + "$",
      isComplete: false,
    };
    data.push(newData);
    inpDesc.value = "";
    inpPrice.value = "";
    inpImage.value = "";
    nullPost.style.display = "none";
    get();
  }
};
