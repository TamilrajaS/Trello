function header_build() {
  var element = document.createElement('header');

  var headerLeftDiv = document.createElement('div');
  headerLeftDiv.classList.add('col-6');
  var imageTag = document.createElement('img');
  imageTag.src = "./assets/img/logo.png";
  imageTag.alt = "Logo";
  imageTag.title = "Trello";
  headerLeftDiv.appendChild(imageTag);
  element.appendChild(headerLeftDiv);

  var headerRightDiv = document.createElement('div');
  headerRightDiv.classList.add('col-6');
  headerRightDiv.classList.add('text-right');
  headerRightDiv.textContent = 'Welcome Admin';
  element.appendChild(headerRightDiv);
  return element;
}
document.body.appendChild(header_build());


function section_build() {
  var element = document.createElement('section');

  var topDiv = document.createElement('div');
  topDiv.classList.add('grid-container');

  var innerDiv = document.createElement('div');
  innerDiv.classList.add('row');
  topDiv.appendChild(innerDiv);

  element.appendChild(topDiv);
  return element;
}
document.body.appendChild(section_build());

function card_build(id, add_id) {
  try{
    var element = document.createElement('div');
    element.classList.add('col-3');

    var topDiv = document.createElement('div');
    topDiv.classList.add('card');
    element.appendChild(topDiv);

    var titleDiv = document.createElement('div');
    titleDiv.classList.add('card-title');
    var textHeader = document.createElement('h3');
    var footer_flag = 0;
    switch(id){
      case 'task_div':
        textHeader.textContent = 'Task List';
        footer_flag = 1;
        break;
      case 'dev_div':
        textHeader.textContent = 'In Development';
        break;
      case 'qa_div':
        textHeader.textContent = 'Q & A';
        break;
      case 'completed_div':
        textHeader.textContent = 'Completed';
        break;
    }
    titleDiv.appendChild(textHeader);
    topDiv.appendChild(titleDiv);

    var contentDiv = document.createElement('div');
    contentDiv.classList.add('card-content');
    contentDiv.id  = id;
    topDiv.appendChild(contentDiv);

    if(footer_flag == 1){
      var footerDiv = document.createElement('div');
      footerDiv.classList.add('card-footer');
      footerDiv.classList.add('fa');
      footerDiv.classList.add('fa-plus-circle');
      footerDiv.id  = add_id;
      topDiv.appendChild(footerDiv);
    }
    return element;
  }catch(e){
    console.log(e);
  }
}
// Task Card Creation
document.getElementsByClassName('row')[0].appendChild(card_build('task_div', 'add_task'));
// Development Card Creation
document.getElementsByClassName('row')[0].appendChild(card_build('dev_div', 'add_dev'));
// Q&A Card Creation
document.getElementsByClassName('row')[0].appendChild(card_build('qa_div', 'add_qa'));
// Completed Card Creation
document.getElementsByClassName('row')[0].appendChild(card_build('completed_div', 'add_completed'));

function move_model_build() {
  try{
    var element = model_build('moveModal', "Move", 0);
    var cardContentDiv = element.getElementsByClassName("card-content dialog-cont")[0];

    var formElement = create_form_build('move_form', 'return false;');
    cardContentDiv.appendChild(formElement);

    var rowDiv = document.createElement('div');
    rowDiv.classList.add('dailog-row');
    formElement.appendChild(rowDiv);

    var rowLabelDiv = document.createElement('div');
    rowLabelDiv.classList.add('inp-label');
    rowLabelDiv.appendChild(document.createTextNode('Developer Name'));
    rowDiv.appendChild(rowLabelDiv);

    var rowInputDiv = document.createElement('div');
    rowDiv.appendChild(rowInputDiv);

    var selectElement = create_combo_build('dev_developer_id', 'Please select the developer');
    rowInputDiv.appendChild(selectElement);

    var rowDiv = document.createElement('div');
    rowDiv.classList.add('dailog-row');
    formElement.appendChild(rowDiv);

    var rowFormDiv = document.createElement('div');
    rowDiv.appendChild(rowFormDiv);

    var rowInputDiv = create_input_build('dev_task_id', 'hidden', 0, '');
    rowFormDiv.appendChild(rowInputDiv);

    var rowInputDiv = create_button_build('btn_task_move', 'Save', '');
    rowFormDiv.appendChild(rowInputDiv);

    return element;
  }catch(e){
    console.log(e);
  }
}
document.body.appendChild(move_model_build());

function task_model_build() {
  try{
    var element = model_build('taskModal', "Task", 1);
    var cardContentDiv = element.getElementsByClassName("card-content dialog-cont")[0];

    var formElement = create_form_build('task_form', 'return false;');
    cardContentDiv.appendChild(formElement);

    var rowDiv = document.createElement('div');
    rowDiv.classList.add('dailog-row');
    formElement.appendChild(rowDiv);

    var rowLabelDiv = document.createElement('div');
    rowLabelDiv.classList.add('inp-label');
    rowLabelDiv.appendChild(document.createTextNode('Task Name'));
    rowDiv.appendChild(rowLabelDiv);

    var rowInputDiv = document.createElement('div');
    rowDiv.appendChild(rowInputDiv);

    var inputElement = create_input_build('task_name', 'text', '', 'Please enter the task name');
    rowInputDiv.appendChild(inputElement);

    var rowDiv = document.createElement('div');
    rowDiv.classList.add('dailog-row');
    formElement.appendChild(rowDiv);

    var rowLabelDiv = document.createElement('div');
    rowLabelDiv.classList.add('inp-label');
    rowLabelDiv.appendChild(document.createTextNode('Task Desc'));
    rowDiv.appendChild(rowLabelDiv);

    var rowInputDiv = document.createElement('div');
    rowDiv.appendChild(rowInputDiv);

    var inputElement = create_input_build('task_desc', 'text', '', 'Please enter the task description');
    rowInputDiv.appendChild(inputElement);

    var rowDiv = document.createElement('div');
    rowDiv.classList.add('dailog-row');
    formElement.appendChild(rowDiv);

    var rowLabelDiv = document.createElement('div');
    rowLabelDiv.classList.add('inp-label');
    rowLabelDiv.appendChild(document.createTextNode('Developer Name'));
    rowDiv.appendChild(rowLabelDiv);

    var rowInputDiv = document.createElement('div');
    rowDiv.appendChild(rowInputDiv);

    var selectElement = create_combo_build('task_developer_id', 'Please select the developer');
    rowInputDiv.appendChild(selectElement);

    var rowDiv = document.createElement('div');
    rowDiv.classList.add('dailog-row');
    formElement.appendChild(rowDiv);

    var rowLabelDiv = document.createElement('div');
    rowLabelDiv.classList.add('inp-label');
    rowLabelDiv.appendChild(document.createTextNode('Comments'));
    rowDiv.appendChild(rowLabelDiv);

    var rowInputDiv = document.createElement('div');
    rowDiv.appendChild(rowInputDiv);

    var inputElement = create_textarea_build('task_developer_comments', 4, '');
    rowInputDiv.appendChild(inputElement);

    var rowDiv = document.createElement('div');
    rowDiv.classList.add('dailog-row');
    formElement.appendChild(rowDiv);

    var rowFormDiv = document.createElement('div');
    rowDiv.appendChild(rowFormDiv);

    var rowInputDiv = create_input_build('task_id', 'hidden', 0, '');
    rowFormDiv.appendChild(rowInputDiv);

    var rowInputDiv = create_button_build('btn_task_add', 'Save', '');
    rowFormDiv.appendChild(rowInputDiv);

    return element;
  }catch(e){
    console.log(e);
  }
}
document.body.appendChild(task_model_build());


function model_build(id, title, close_id) {
  try{
    var element = document.createElement('div');
    element.id = id;
    element.classList.add('modal');

    var topDiv = document.createElement('div');
    topDiv.classList.add('modal-content');
    element.appendChild(topDiv);

    var cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    topDiv.appendChild(cardDiv);

    var cardTitleDiv = document.createElement('div');
    cardTitleDiv.classList.add('card-title');
    cardDiv.appendChild(cardTitleDiv);

    var cardTitleHeader = document.createElement('h3');
    var t = document.createTextNode(title);
    cardTitleHeader.appendChild(t);
    cardTitleDiv.appendChild(cardTitleHeader);

    var spanTitleHeader = document.createElement('span');
    spanTitleHeader.classList.add('close');
    spanTitleHeader.id = close_id;
    spanTitleHeader.innerHTML = "&times;";
    cardTitleHeader.appendChild(spanTitleHeader);

    var cardContentDiv = document.createElement('div');
    cardContentDiv.classList.add('card-content');
    cardContentDiv.classList.add('dialog-cont');
    cardDiv.appendChild(cardContentDiv);
    // document.body.appendChild(element);
    return element;
  }catch(e){
    console.log(e);
  }
}


function create_input_build(id, type, value, placeholder) {
  try{
    var element = document.createElement('input');
    element.type = type;
    element.id = id;
    element.value = value;
    if(placeholder != ''){
      element.placeholder = placeholder;
    }
    return element;
  }catch(e){
    console.log(e);
  }
}

function create_combo_build(id, placeholder) {
  try{
    var element = document.createElement('select');
    element.id = id;
    var option = document.createElement("option");
    option.disabled = true;
    option.setAttribute('selected', true);
    option.value = "";
    option.text = placeholder;
    element.add(option);
    return element;
  }catch(e){
    console.log(e);
  }
}

function create_textarea_build(id, rows, value) {
  try{
    var element = document.createElement('textarea');
    element.id = id;
    element.rows = rows;
    element.value = value;
    return element;
  }catch(e){
    console.log(e);
  }
}

function create_button_build(id, label, submitFn) {
  try{
    var element = document.createElement('button');
    var t = document.createTextNode(label);       // Create a text node
    element.appendChild(t);
    element.id = id;
    if(submitFn != ''){
      element.setAttribute('onsubmit', submitFn);
    }
    return element;
  }catch(e){
    console.log(e);
  }
}

function create_form_build(id, submitFn) {
  try{
    var element = document.createElement('form');
    element.name = id;
    element.id = id;
    if(submitFn != ''){
      element.setAttribute('onsubmit', submitFn);
    }
    return element;
  }catch(e){
    console.log(e);
  }
}
