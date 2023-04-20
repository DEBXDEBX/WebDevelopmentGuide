"use strict";

// Global variable's
// current File Cab Index
let fcI = -243;
// current Main Folder Index
let mfI = -243;
// current Sub Folder Index
let sfI = -243;
// current note Index
let nI = -243;

// create elements object
const el = new Elements();
// create audio object
const sound = new Audio();
// Pass elements to display
const display = new Display(el, $);

// This is the Main array that holds all the file cab objects
const fileCabArray = [];

// This enables JQuery ToolTips
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// The start of program exicution.
window.onload = function () {
  startUp();
};

// Start Up
function startUp() {
  // load json file
  loadJSONData("./webDevelopment.json");
}
// ###########################################
// ############ XMLHttpRequest ###############
// ###########################################

//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", END_POINT);
//   xhr.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status === 200) {
//       const myData = JSON.parse(this.responseText);
//       const fileCab = new FileCabinet(myData.name, myData.mainFolderArray);
//       fileCabArray.push(fileCab);
//       renderFileCabs();
//     }
//   };

//   xhr.send();

// ###########################################
// ############# END XMLHttpRequest###########
// ###########################################

//*************************************************** */
// Helper functions
//*************************************************** */
async function loadJSONData(END_POINT) {
  try {
    const response = await fetch(END_POINT);
    const myData = await response.json();
    const fileCab = new FileCabinet(myData.name, myData.mainFolderArray);
    fileCabArray.push(fileCab);
    renderFileCabs();
  } catch (error) {
    console.log(error);
  }
}
// **************************************************

//*************************************************** */
function removeActiveClass(element) {
  if (element) {
    element.classList.remove("active");
  }
}
// **************************************************
function renderFileCabs() {
  // function returns -243, -243 is used for close down of a file cabs
  fcI = display.paintFileCabTabs(mapNamesOut(fileCabArray));
}
// **************************************************
function renderMainFolders() {
  display.paintMainFolderTabs(mapNamesOut(fileCabArray[fcI].mainFolderArray));
}
// ***************************************************
function renderSubFolders() {
  display.paintSubFolderTabs(
    mapNamesOut(fileCabArray[fcI].mainFolderArray[mfI].subFolderArray)
  );
}
// ****************************************************
function renderNotes() {
  display.paintNotes(
    fileCabArray[fcI].mainFolderArray[mfI].subFolderArray[sfI].noteArray
  );
}

// *******************************************************************
function mapNamesOut(array) {
  const mapedArray = array.map((item) => item.name);
  return mapedArray;
} // End mapNamesOut(array)

// *************************************************************
//  file cab Code
// *************************************************************
// file cab UL *************************************************
el.fileCabList.addEventListener("click", (e) => {
  // event delegation
  if (e.target.classList.contains("fileCab")) {
    const element = document.querySelector(".fileCab.active");
    removeActiveClass(element);

    // add active class
    e.target.classList.add("active");
    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);
    if (isNaN(index)) {
      return;
    }
    fcI = index;
    sound.tabAudio.play();
    renderMainFolders();
  }
}); // End

// main UL *****************************************************
el.mainFolderList.addEventListener("click", (e) => {
  if (e.target.classList.contains("main")) {
    const element = document.querySelector(".main.active");
    removeActiveClass(element);
    // add active class
    e.target.classList.add("active");

    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);

    if (isNaN(index)) {
      return;
    }
    mfI = index;

    sound.tabAudio.play();
    renderSubFolders();
    return;
  }
}); // End

// *************************************************************
//  Sub Folder Code
// *************************************************************
// Sub Folder UL
el.subFolderList.addEventListener("click", (e) => {
  if (e.target.classList.contains("sub")) {
    const element = document.querySelector(".sub.active");
    removeActiveClass(element);
    // add active class
    e.target.classList.add("active");
    // End code to set the active class

    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);

    if (isNaN(index)) {
      return;
    }
    sfI = index;

    sound.tabAudio.play();
    // send the note array to the Display
    renderNotes();
    return;
  }
}); // End
