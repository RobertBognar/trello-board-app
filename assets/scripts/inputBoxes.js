// Show & Hide Input Boxes Added To HTML Attributes
function showInputBox(column) {
    addButtons[column].style.visibility = 'hidden';
    itemSaveButton[column].style.display = 'flex';
    itemAddContainer[column].style.display = 'flex';
  }
 
  function hideInputBox(column) {
    addButtons[column].style.visibility = 'visible';
    itemSaveButton[column].style.display = 'none';
    itemAddContainer[column].style.display = 'none';
    addToColumn(column);
  }
  