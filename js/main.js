var websiteName = document.getElementById("websiteName");
var websiteUrl = document.getElementById("websiteUrl");
var data = document.getElementById("data");
var submitButton = document.getElementById("submit");
var count = document.getElementById("count");
var search = document.getElementById("search");
var searchResult = document.getElementById("searchResult");
var nameVaild = document.getElementById("nameVaild");
var urlVaild = document.getElementById("urlVaild");
var iconDanger = document.getElementById("iconDanger");
var iconSuccess = document.getElementById("iconSuccess");
var idx = 0;
if (JSON.parse(localStorage.getItem("websites")) != null) {
  allWebsites = JSON.parse(localStorage.getItem("websites"));
  displayWebsites();
} else {
  var allWebsites = [];
}

function changeBtnUpdate() {
  submitButton.innerHTML = "Update";
}

function changeBtnSubmit() {
  submitButton.innerHTML = "Submit";
}

function clr() {
  websiteName.value = "";
  websiteUrl.value = "";
  nameVaild.innerHTML = "";
  urlVaild.innerHTML = "";
  iconSuccess.innerHTML = "";
  iconDanger.innerHTML = "";
}

function websitesCounter() {
  count.innerHTML = `${allWebsites.length}`;
}

function displayWebsites() {
  var websiteData = "";
  for (var i = 0; i < allWebsites.length; i++) {
    websiteData += `<div class="col-md-4">
    <div class="card p-3">
      <h4 class="my-3  text-capitalize">${allWebsites[i].name}</h4>
      <div
        class="btn-group d-flex align-items-center justify-content-around w-100 rounded-2"
        role="group"
        aria-label="Basic example"
      >
        <button type="button" class="btn">
          <a href="${allWebsites[i].url}" target="_blank" class="text-white w-100 d-block">
            <i class="fa-solid fa-eye"></i>
          </a>
        </button>
        <button type="button" class="btn" onclick="updateWebsite(${i});">
        <a href="#home" class = "text-white w-100 d-block"> <i class="fa-solid fa-pencil"></i> </a>
      </button>
        <button type="button" class="btn" onclick = "deleteWebsite(${i});">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  </div>`;
  }

  data.innerHTML = websiteData;
  websitesCounter();
}

function urlValidation() {
  var urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(websiteUrl.value);
}

function nameValidation() {
  var nameRegex = /^[a-z A-Z]{3,}$/;
  return nameRegex.test(websiteName.value);
}

function addWebsite() {
  var website = {
    name: websiteName.value,
    url: websiteUrl.value,
  };
  if (urlValidation() && nameValidation()) {
    if (submitButton.innerHTML.includes("Submit")) {
      allWebsites.push(website);
    } else {
      allWebsites.splice(idx, 1, website);
      changeBtnSubmit();
    }
    localStorage.setItem("websites", JSON.stringify(allWebsites));
    displayWebsites();
    clr();
    nameVaild.innerHTML = "";
    urlVaild.innerHTML = "";
    iconSuccess.innerHTML = "";
    iconDanger.innerHTML = "";
    swal("", "Website URL Added Successfully", "success");
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Site Name or Url is not valid, Please follow the rules",
    });
    nameVaild.innerHTML = "Site name must contain at least 3 characters";
    urlVaild.innerHTML = "Site URL must be a valid one : https://example.com";
    iconSuccess.innerHTML = `<i class="fa-solid fa-circle-exclamation text-danger"></i
    >`;
    iconDanger.innerHTML = `<i class="fa-solid fa-circle-exclamation text-danger"></i
    >`;
  }
}

function updateWebsite(indx) {
  idx = indx;
  console.log(idx);
  websiteName.value = allWebsites[idx].name;
  websiteUrl.value = allWebsites[idx].url;
  changeBtnUpdate();
}

function deleteWebsite(indx) {
  allWebsites.splice(indx, 1);
  displayWebsites();
  localStorage.setItem("websites", JSON.stringify(allWebsites));
}

function reset() {
  allWebsites = [];
  localStorage.setItem("websites", JSON.stringify(allWebsites));
  displayWebsites();
}

function searchWebsites() {
  var websiteData = "";
  var result = 0;
  for (var i = 0; i < allWebsites.length; i++) {
    if (
      allWebsites[i].name
        .toLocaleLowerCase()
        .trim()
        .includes(search.value.trim().toLocaleLowerCase())
    ) {
      websiteData += `<div class="col-md-4">
      <div class="card p-3">
        <h4 class="my-3  text-capitalize">${allWebsites[i].name}</h4>
        <div
          class="btn-group d-flex align-items-center justify-content-around w-100 rounded-2"
          role="group"
          aria-label="Basic example"
        >
          <button type="button" class="btn">
            <a href="https://${allWebsites[i].url}" target="_blank" class="text-white w-100 d-block">
              <i class="fa-solid fa-eye"></i>
            </a>
          </button>
          <button type="button" class="btn" onclick = "updateWebsite(${i});">
          <a href="#home" class = "text-white w-100 d-block"> <i class="fa-solid fa-pencil"></i> </a>
          </button>
          <button type="button" class="btn" onclick = "deleteWebsite(${i});">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>`;
      result++;
    }
  }
  data.innerHTML = websiteData;
  if (result == 0 || result == allWebsites.length) {
    searchResult.innerHTML = "";
  } else {
    searchResult.innerHTML = `Search Results : ${result}`;
  }
}
