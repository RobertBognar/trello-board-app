//Importing HTML Elements
//Defining getElementById, querySelector & querySelectorAll through function for code shortening
function getByid(param) {
    return document.getElementById(`${param}`);
}

function getSelector(param) {
    return document.querySelector(`${param}`);
}

function getSelectorAll(param) {
    return document.querySelectorAll(`${param}`);
}

//Buttons Container
const addButtons = getSelectorAll('.add-btn');
const itemSaveButton = getSelectorAll('.save');
const itemAddContainer = getSelectorAll('.add-container');
const addItems = getSelectorAll('.add-item');
const containers = getSelectorAll('.drag-container');

//Item Lists
const listColumns = getSelectorAll('.drag-item-list');
const backlogListElements = getByid('backlog-list');
const progressListElements = getByid('progress-list');
const completeListElements = getByid('complete-list');
const onHoldListElements = getByid('on-hold-list');

//Check For Item Loading
let loadUpdate = false;

//Defining Empty Log Arrays
let backlogArray = [];
let progressArray = [];
let completeArray = [];
let onHoldArray = []; backlogArray
let listArrays = [];

//Drag & Drop Functionality
let draggedItem;
let dragging = false;
let currentColumn;
