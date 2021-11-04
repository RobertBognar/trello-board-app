//Fetching Columns From LocalStorage If It Is Possible, If Not Setting Default Ones
function fetchColumns() {
  backlogArray = localStorage.backlogItem ? JSON.parse(localStorage.backlogItem) : ['Sample1', 'Sample2'];
  progressArray = localStorage.progressItem ? JSON.parse(localStorage.progressItem) : ['Sample3', 'Sample4'];
  completeArray = localStorage.completeItem ? JSON.parse(localStorage.completeItem) : ['Sample5', 'Sample6'];
  onHoldArray = localStorage.onHoldItem ? JSON.parse(localStorage.onHoldItem) : ['Sample7', 'Sample8'];
}

//Set localStorage Arrays
function updateFetchedColumns() {
  listArrays = [backlogArray, progressArray, completeArray, onHoldArray];
  const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]));
  });
}

//Removing Empty Values In Arrays
function filterArray(array) {
  const filteredArray = array.filter(item => item !== null);
  return filteredArray;
}

//Creating DOM Elements For Each Item Column
function createItem(columnEl, column, item, index) {
  const listEl = document.createElement('li');
  listEl.textContent = item;
  listEl.id = index;
  listEl.classList.add('drag-item');
  listEl.draggable = true;
  listEl.setAttribute('onfocusout', `updateItem(${index}, ${column})`);
  listEl.setAttribute('ondragstart', 'drag(event)');
  listEl.contentEditable = true;
  columnEl.appendChild(listEl);
}

//Creating Function To Callback in DOM Update Section For Displaying Current Or New Added Tasks
//Creating Function To Callback in DOM Arrays Update Section
function backlogDomUpdate() {
  backlogListElements.textContent = '';
  backlogArray.forEach((backlogItem, index) => {
    createItem(backlogListElements, 0, backlogItem, index);
  });
  backlogArray = filterArray(backlogArray);
}

function backlogArrayUpdate() {
  backlogArray = [];
  for (let i = 0; i < backlogListElements.children.length; i++) {
    backlogArray.push(backlogListElements.children[i].textContent);
  }
}

function progressLogDomUpdate() {
  progressListElements.textContent = '';
  progressArray.forEach((progressItem, index) => {
    createItem(progressListElements, 1, progressItem, index);
  });
  progressArray = filterArray(progressArray);
}

function progressLogArrayUpdate() {
  progressArray = [];
  for (let i = 0; i < progressListElements.children.length; i++) {
    progressArray.push(progressListElements.children[i].textContent);
  }
}

function completeLogDomUpdate() {
  completeListElements.textContent = '';
  completeArray.forEach((completeItem, index) => {
    createItem(completeListElements, 2, completeItem, index);
  });
  completeArray = filterArray(completeArray);
}

function completeLogArrayUpdate() {
  completeArray = [];
  for (let i = 0; i < completeListElements.children.length; i++) {
    completeArray.push(completeListElements.children[i].textContent);
  }
}

function onHoldLogDomUpdate() {
  onHoldListElements.textContent = '';
  onHoldArray.forEach((onHoldItem, index) => {
    createItem(onHoldListElements, 3, onHoldItem, index);
  });
  onHoldArray = filterArray(onHoldArray);
}

function onHoldLogArrayUpdate() {
  onHoldArray = [];
  for (let i = 0; i < onHoldListElements.children.length; i++) {
    onHoldArray.push(onHoldListElements.children[i].textContent);
  }
}

//Updating Current DOM, Resetting HTML, Filtering Arrays, Updating LocalStorage Or Showing Current Ones
function domUpdate() {
  if (!loadUpdate) {
    fetchColumns();
  }
  backlogDomUpdate();
  progressLogDomUpdate();
  completeLogDomUpdate();
  onHoldLogDomUpdate();

  loadUpdate = true;
  updateFetchedColumns();
}

//Updating Items & Arrays Value For New Items Added
function updateItem(id, column) {
  const selectedArray = listArrays[column];
  const selectedColumn = listColumns[column].children;
  if (!dragging) {
    if (!selectedColumn[id].textContent) {
      delete selectedArray[id];
    } else {
      selectedArray[id] = selectedColumn[id].textContent;
    }
    domUpdate();
  }
}

//Adding New Columns
function addToColumn(column) {
  const itemText = addItems[column].textContent;
  const selectedArray = listArrays[column];
  selectedArray.push(itemText);
  addItems[column].textContent = '';
  domUpdate(column);
}

//Arrays Container Updates
function arraysUpdate() {
  backlogArrayUpdate();
  progressLogArrayUpdate();
  completeLogArrayUpdate();
  onHoldLogArrayUpdate();
  domUpdate();
}

//Drag & Drop Functions Added To HTML Enabling Cross Adding & Drop & Dragging
//Preventing Default To Disable Page Refreshing After Functions
function dragEnterOn(column) {
  currentColumn = column;
}

function dragLeave(e) {

}

function drag(e) {
  draggedItem = e.target;
  dragging = true;
}

function allowDropTo(e) {
  e.preventDefault();
}

function dropItemTo(e) {
  e.preventDefault();
  const parent = listColumns[currentColumn];
  parent.appendChild(draggedItem);
  dragging = false;
  arraysUpdate();
}

domUpdate();
