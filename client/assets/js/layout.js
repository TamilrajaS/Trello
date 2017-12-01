function headerBuild () {
  var element = createHtml('header')
  var leftDiv = createHtml('div', {'class': 'col-6'}, element)
  createHtml('img', {'src': './assets/img/logo.png', 'alt': 'Logo', 'title': 'Trello'}, leftDiv)
  var headRightDiv = createHtml('div', {'class': ['col-6', 'text-right', 'user-txt']}, element)
  headRightDiv.textContent = 'Welcome Admin'
  return element
}
document.body.appendChild(headerBuild())

function sectionBuild () {
  var element = createHtml('section')
  var innerElement = createHtml('div', {'class': 'grid-container'}, element)
  createHtml('div', {'class': 'row'}, innerElement)
  return element
}
document.body.appendChild(sectionBuild())

function cardBuild (id, addId) {
  try {
    var element = createHtml('div', { 'class': 'col-3' })
    var cardElement = createHtml('div', { 'class': 'card' }, element)
    var cardHeaderElement = createHtml('div', { 'class': 'card-title' }, cardElement)
    var footerFlag
    var headerContent
    switch (id) {
      case 'taskDiv':
        headerContent = 'Task List'
        footerFlag = 1
        break
      case 'devDiv':
        headerContent = 'In Development'
        break
      case 'qaDiv':
        headerContent = 'Q & A'
        break
      case 'completedDiv':
        headerContent = 'Completed'
        break
      default:
        break
    }
    var headerTitleDiv = createHtml('h3', '', cardHeaderElement)
    headerTitleDiv.textContent = headerContent
    createHtml('div', { 'class': 'card-content', 'id': id }, cardElement)
    if (footerFlag) {
      createHtml('div', { 'class': ['card-footer', 'fa', 'fa-plus-circle'], 'id': addId }, cardElement)
    }
    return element
  } catch (e) {
    console.log(e)
  }
}
// Task Card Creation
var findRowElement = document.getElementsByClassName('row')[0]
var cardArr = { 'addTask': 'taskDiv', 'addDev': 'devDiv', 'addQa': 'qaDiv', 'addCompleted': 'completedDiv' }
for (var key in cardArr) {
  findRowElement.appendChild(cardBuild(cardArr[key], key))
}

function moveModelBuild () {
  try {
    var element = modelBuild('moveModal', 'Move', 0)
    var cardContentDiv = element.getElementsByClassName('card-content dialog-cont')[0]
    var formElement = createHtml('form', { 'id': 'moveForm', 'name': 'moveForm', 'onsubmit': 'return false;' }, cardContentDiv)
    var rowDiv
    var rowLabelDiv
    var rowInputDiv
    rowDiv = createHtml('div', { 'class': 'dailog-row' }, formElement)
    rowLabelDiv = createHtml('div', { 'class': 'inp-label' }, rowDiv)
    rowLabelDiv.textContent = 'Developer Name'
    rowInputDiv = createHtml('div', '', rowDiv)
    var selectElement = createHtml('select', { 'id': 'devDeveloperId' }, rowInputDiv)
    var option = document.createElement('option')
    option.value = ''
    option.text = 'Please select the developer'
    option.selected = true
    selectElement.add(option)
    createHtml('span', { 'id': 'errDevDeveloperId', 'class': 'error-msg' }, rowInputDiv)

    rowDiv = createHtml('div', { 'class': 'dailog-row' }, formElement)
    rowInputDiv = createHtml('div', '', rowDiv)
    createHtml('input', { 'type': 'hidden', 'id': 'devTaskId', 'value': 0 }, rowInputDiv)
    var buttonDiv = createHtml('button', { 'id': 'btnTaskMove' }, rowInputDiv)
    buttonDiv.textContent = 'Save'
    return element
  } catch (e) {
    console.log(e)
  }
}
document.body.appendChild(moveModelBuild())

function taskModelBuild () {
  try {
    var element = modelBuild('taskModal', 'Task', 1)
    var cardContentDiv = element.getElementsByClassName('card-content dialog-cont')[0]
    var formElement = createHtml('form', { 'id': 'taskForm', 'name': 'taskForm', 'onsubmit': 'return false;' }, cardContentDiv)
    var rowDiv
    var rowLabelDiv
    var rowInputDiv

    rowDiv = createHtml('div', { 'class': 'dailog-row' }, formElement)
    rowLabelDiv = createHtml('div', { 'class': 'inp-label' }, rowDiv)
    rowLabelDiv.textContent = 'Task Name'
    rowInputDiv = createHtml('div', '', rowDiv)
    createHtml('input', { 'id': 'taskName', 'value': '', 'placeholder': 'Please enter the task name' }, rowInputDiv)
    createHtml('span', { 'id': 'errTaskName', 'class': 'error-msg' }, rowInputDiv)

    rowDiv = createHtml('div', { 'class': 'dailog-row' }, formElement)
    rowLabelDiv = createHtml('div', { 'class': 'inp-label' }, rowDiv)
    rowLabelDiv.textContent = 'Task Desc'
    rowInputDiv = createHtml('div', '', rowDiv)
    createHtml('input', { 'id': 'taskDesc', 'value': '', 'placeholder': 'Please enter the task description' }, rowInputDiv)

    rowDiv = createHtml('div', { 'class': 'dailog-row' }, formElement)
    rowLabelDiv = createHtml('div', { 'class': 'inp-label' }, rowDiv)
    rowLabelDiv.textContent = 'Developer Name'
    rowInputDiv = createHtml('div', '', rowDiv)
    var selectElement = createHtml('select', { 'id': 'taskDeveloperId' }, rowInputDiv)
    var option = document.createElement('option')
    option.value = ''
    option.text = 'Please select the developer'
    option.setAttribute('selected', true)
    selectElement.add(option)

    rowDiv = createHtml('div', { 'class': 'dailog-row' }, formElement)
    rowLabelDiv = createHtml('div', { 'class': 'inp-label' }, rowDiv)
    rowLabelDiv.textContent = 'Comments'
    rowInputDiv = createHtml('div', '', rowDiv)
    createHtml('textarea', { 'id': 'taskDeveloperComments', 'rows': 4, 'placeholder': 'Please enter the Comments' }, rowInputDiv)

    rowDiv = createHtml('div', { 'class': 'dailog-row' }, formElement)
    createHtml('input', { 'type': 'hidden', 'id': 'taskId', 'value': 0 }, rowDiv)
    createHtml('input', { 'type': 'hidden', 'id': 'taskAction', 'value': 'create' }, rowDiv)
    var buttonDiv = createHtml('button', { 'id': 'btnTaskAdd' }, rowDiv)
    buttonDiv.textContent = 'Save'

    return element
  } catch (e) {
    console.log(e)
  }
}
document.body.appendChild(taskModelBuild())

function modelBuild (id, title, closeId) {
  try {
    var element = createHtml('div', { 'class': 'modal', 'id': id })
    var topDiv = createHtml('div', { 'class': 'modal-content' }, element)
    var cardDiv = createHtml('div', { 'class': 'card' }, topDiv)
    var cardTitleDiv = createHtml('div', { 'class': 'card-title' }, cardDiv)
    var cardTitleHeader = createHtml('h3', '', cardTitleDiv)
    cardTitleHeader.textContent = title
    var cardTitleSpan = createHtml('span', { 'class': 'close', 'id': closeId }, cardTitleHeader)
    cardTitleSpan.innerHTML = '&times;'
    createHtml('div', { 'class': ['card-content', 'dialog-cont'] }, cardDiv)
    return element
  } catch (e) {
    console.log(e)
  }
}

function createHtml (type, inputJson, appendDiv) {
  var element = document.createElement(type)
  if (inputJson) {
    for (var key in inputJson) {
      if (Array.isArray(inputJson[key]) && key === 'class') {
        while (inputJson[key].length > 0) {
          element.classList.add(inputJson[key].shift())
        }
      } else {
        element.setAttribute(key, inputJson[key])
      }
    }
  }
  if (appendDiv) {
    appendDiv.appendChild(element)
  }
  return element
}
