class Display {
  constructor(elements, $) {
    this.elements = elements;
    // JQuery
    this.$ = $;
    this.tabColorIndex = 0;
    this.tabColors = [
      "#2de11d",
      "#4848e8",
      "#e84d4d",
      "Orange",
      "Violet",
      "#820ee8",
      "#8e7fc7",
      "#ff008b",
      "#4dc6e8",
      "#17abf5",
      "#4c69bd",
      "#e251dc",
      "#bbb70e",
    ];
  } // End constructor

  //Method
  displayNone(element) {
    this.$(element).slideUp("slow");
  } // End displayNone(element)

  //Method
  displayBlock(element) {
    this.$(element).slideDown("slow");
  } // End displayBlock(element)

  //Method
  clearFileCabDisplay() {
    this.elements.fileCabList.innerHTML = "";
  } // End clearFileCabDisplay()

  //Method
  clearPrimaryDisplay() {
    this.elements.mainFolderList.innerHTML = "";
  } // End clearPrimaryDisplay()

  //Method
  clearSubDisplay() {
    this.elements.subFolderList.innerHTML = "";
  } // End clearSubDisplay()

  //Method
  clearNoteDisplay() {
    this.elements.noteList.innerHTML = "";
  } // End clearNoteDisplay()

  // Method
  paintFileCabTabs(mapedArray) {
    // this.hideSetttingsForm();
    this.clearFileCabDisplay();
    this.clearPrimaryDisplay();
    this.clearSubDisplay();
    this.clearNoteDisplay();
    // this.displayNone(this.elements.renameFileCabForm);
    this.displayNone(this.elements.headingMainFolder);
    this.displayNone(this.elements.headingSubFolder);
    this.displayNone(this.elements.headingNote);

    // this will paint all file cabinets tabs
    // make variable for html
    let html = "";
    mapedArray.forEach((element, index) => {
      html += `<li data-index="${index}" class="fileCab">${element}</li>`;
    });
    // paint file cab tabs
    this.elements.fileCabList.innerHTML = html;
    // color tabs
    const tabList = document.getElementsByClassName("fileCab");
    this.colorSetOfTabs(tabList);
    return -243;
  } // End paintFileCabTabs(mapedArray)

  // Method
  paintMainFolderTabs(mapedArray) {
    this.clearPrimaryDisplay();
    this.clearSubDisplay();
    this.clearNoteDisplay();
    // this.displayNone(this.elements.renameFileCabForm);
    this.displayNone(this.elements.headingMainFolder);
    this.displayBlock(this.elements.headingMainFolder);
    this.displayNone(this.elements.mainFolderList);
    this.displayNone(this.elements.headingSubFolder);
    this.displayNone(this.elements.headingNote);

    // make a variable to hold html
    let html = "";

    mapedArray.forEach((element, index) => {
      html += `<li data-index="${index}" class="main">${element}</li>`;
    });
    // paint main folder tabs
    this.elements.mainFolderList.innerHTML = html;

    this.displayBlock(this.elements.mainFolderList);
    // color tabs
    const tabList = document.getElementsByClassName("main");
    this.colorSetOfTabs(tabList);
  } // End paintMainFolderTabs(deleteMode, mapedArray)

  // Method
  paintSubFolderTabs(mappedSecondaryArray) {
    this.clearSubDisplay();
    this.clearNoteDisplay();
    this.displayNone(this.elements.headingSubFolder);
    this.displayBlock(this.elements.headingSubFolder);
    this.displayNone(this.elements.subFolderList);
    this.displayNone(this.elements.headingNote);

    // make variable for html
    let html = "";

    mappedSecondaryArray.forEach((element, index) => {
      html += `<li data-index="${index}" class="sub">${element}</li>`;
    });
    this.elements.subFolderList.innerHTML = html;

    this.displayBlock(this.elements.subFolderList);
    // color tabs
    const tabList = document.getElementsByClassName("sub");
    this.colorSetOfTabs(tabList);
  } // End paintSubFolderTabs(deleteMode, mappedSecondaryArray)

  //Method
  paintNotes(noteArray) {
    this.displayNone(this.elements.headingNote);
    this.displayBlock(this.elements.headingNote);

    this.displayNone(this.elements.noteList);
    // clear the div
    this.clearNoteDisplay();
    // build div
    noteArray.forEach((note, index) => {
      //######################## Now build the Note #################################
      const newElement = document.createElement("h4");
      newElement.className = "note";
      newElement.setAttribute("data-index", `${index}`);

      newElement.appendChild(document.createTextNode(`${note.text}`));

      // insert the note
      this.elements.noteList.appendChild(newElement);
    });

    this.displayBlock(this.elements.noteList);
  } // paintNotes(deleteMode, noteArray)

  //Method
  colorSetOfTabs(htmlCollection) {
    for (const item of htmlCollection) {
      item.style.backgroundColor = this.tabColors[this.tabColorIndex];
      if (this.tabColorIndex === this.tabColors.length - 1) {
        this.tabColorIndex = 0;
      } else {
        this.tabColorIndex++;
      }
    }
  } // End colorSetOfTabs(htmlCollection)
} // End Display class
