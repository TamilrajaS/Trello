// Input Variable Declration
var task_list_json = '{"tasks":[{"task_id":0,"task_name":"Frontend Training Initialise", "task_desc":"Frontend Training Initialise", "task_developer_id":0, "task_developer_comments":"testing", "task_developer_start_date":"2017-11-17", "task_status":"completed", "task_dev_completed_date":"2017-11-26", "task_fully_completed_date":"2017-11-27"}, {"task_id":1,"task_name":"HTML Task", "task_desc":"html page creation", "task_developer_id":0, "task_developer_comments":"testing", "task_developer_start_date":"2017-11-18", "task_status":"dev"},{"task_id":2,"task_name":"Javascript Basic", "task_desc":"html page creation", "task_developer_id":1, "task_developer_comments":"testing", "task_developer_start_date":"2017-11-25", "task_status":"qa", "task_dev_completed_date":"2017-11-26"},{"task_id":3,"task_name":"Trello App", "task_desc":"Trello app creation in javascript tasks", "task_status":"created"}]}';
var task_list = JSON.parse(task_list_json);

function show_task(){
  try{
    var result='';
    for (var key in task_list.tasks) {
      var move = '';
      if(task_list.tasks[key].task_status=='created'){
        move = '<a class="fa fa-arrow-right task-move" title="Move to Dev" id="'+key+'" href="#">&nbsp;</a>';
      }
      result+='<div class="task">'+task_list.tasks[key].task_name+' '+move+'<a class="fa fa-pencil task-edit" id="'+key+'" href="#"  title="Edit Task">&nbsp;</a></div>';
    }
    //console.log(task_list);
    document.getElementById('task_div').innerHTML = result;
    return true;
  }catch(e){
    logMyErrors(e);
  }
}
show_task();

// To Add New Task Model
document.getElementById('add_task').onclick = function() {
  edit_form('', 0);
}
// To Open the Task Window
function edit_form(id, move_flag){
  try{
    // var res_json = localStorage.getItem("task_list");
    // console.log(res_json.developer);
    build_options('task_developer_id', JSON.parse(localStorage.getItem("developer")));
    document.getElementById('task_name').value = '';
    document.getElementById('task_desc').value = '';
    document.getElementById('task_id').value = '';
    document.getElementById('task_developer_id').value = '';
    document.getElementById('taskModal').style.display = "block";
    document.getElementById('task_developer_comments').readOnly=false;
    document.getElementById('task_name').readOnly=false;
    document.getElementById('task_desc').readOnly=false;
    document.getElementById('task_developer_id').disabled=false;
    if(id){
      document.getElementById('task_name').value = task_list.tasks[id].task_name;
      document.getElementById('task_desc').value = task_list.tasks[id].task_desc;
      document.getElementById('task_id').value = task_list.tasks[id].task_id;
      document.getElementById('task_developer_id').value = task_list.tasks[id].task_developer_id;
      // Disable the task fields for developer
      if(move_flag == 1){
        document.getElementById('task_name').readOnly=true;
        document.getElementById('task_desc').readOnly=true;
        document.getElementById('task_developer_id').disabled=true;
      }
    }else{
      document.getElementById('task_developer_comments').readOnly=true;
    }
    return true;
  }catch(e){
    logMyErrors(e);
  }
}

// To Save the new Task
document.getElementById('btn_task_add').onclick = function() {
  try{
    var input_task_name = document.getElementById('task_name').value;
    var input_task_desc = document.getElementById('task_desc').value;
    var input_task_id = document.getElementById('task_id').value;
    var input_task_developer_id = document.getElementById('task_developer_id').value;
    var input_task_developer_comments = document.getElementById('task_developer_comments').value;
    var current_date = new Date();
    if(input_task_developer_comments){
      var status = 'qa';
      task_list.tasks[input_task_id].task_dev_completed_date = new Date();
    }else if(input_task_developer_id != ''){
      if(input_task_id){
        var status = task_list.tasks[input_task_id].task_status;
      }else{
        var status = 'dev';
      }
    }else{
      var status = 'created';
    }
    if(input_task_id == ''){
      task_list.tasks.push({"task_id":task_list.tasks.length, "task_name":input_task_name, "task_desc":input_task_desc, "task_developer_id":input_task_developer_id, "task_developer_start_date":current_date, "task_developer_comments": input_task_developer_comments, "task_status": status});
    }else{
      task_list.tasks[input_task_id].task_name = input_task_name;
      task_list.tasks[input_task_id].task_desc = input_task_desc;
      task_list.tasks[input_task_id].task_id = input_task_id;
      task_list.tasks[input_task_id].task_developer_id = input_task_developer_id;
      task_list.tasks[input_task_id].task_developer_start_date = current_date;
      task_list.tasks[input_task_id].task_developer_comments = input_task_developer_comments;
      task_list.tasks[input_task_id].task_status = status;
    }
    setTimeout(show_task(), 2000);
    show_assigned_task(task_list);
    show_qa_task(task_list);
    show_completed_task(task_list);
    document.getElementById('taskModal').style.display = "none";
    return false;
  }catch(e){
    logMyErrors(e);
  }
}

// To move the new Task
document.getElementById('btn_task_move').onclick = function() {
  try{
    var input_task_id = document.getElementById('dev_task_id').value;
    task_list.tasks[input_task_id].task_developer_id = document.getElementById('dev_developer_id').value;;
    task_list.tasks[input_task_id].task_developer_start_date = new Date();
    task_list.tasks[input_task_id].task_status = 'dev';
    show_task();
    show_assigned_task(task_list);
    document.getElementById('moveModal').style.display = "none";
    return true;
  }catch(e){
    logMyErrors(e);
  }
}

//On Ready Function
document.addEventListener("click", function(event) {
  // switch(event.srcElement.classList[2]){
  //   case 'task-edit':
  //     edit_form(this.id, 0);
  //     break;
  //   case 'dev-task-move':
  //     edit_form(this.id, 1);
  //     break;
  //   case 'task-move':
  //     move_form(this.id);
  //     break;
  //   case 'qa-task-move':
  //     task_list.tasks[this.id].task_status = 'completed';
  //     show_completed_task(task_list);
  //     show_qa_task(task_list);
  //     break;
  //   case 'qa-task-reopen':
  //     console.log(task_list);
  //     console.log(this.id);
  //     task_list.tasks[this.id].task_status = 'dev';
  //     show_assigned_task(task_list);
  //     show_qa_task(task_list);
  //     break;
  //   default:break;
  // }
  //do work
  var res = document.getElementsByClassName('task-edit');
  for (var i = 0; i < res.length; i++) {
      res[i].onclick = function() {
      edit_form(this.id, 0);
    }
  }

  var dev_res = document.getElementsByClassName('dev-task-move');
  for (var i = 0; i < dev_res.length; i++) {
      dev_res[i].onclick = function() {
      edit_form(this.id, 1);
    }
  }

  var move_res = document.getElementsByClassName('task-move');
  for (var i = 0; i < move_res.length; i++) {
      move_res[i].onclick = function() {
      move_form(this.id);
    }
  }

  var qa_move_res = document.getElementsByClassName('qa-task-move');
  for (var i = 0; i < qa_move_res.length; i++) {
      qa_move_res[i].onclick = function() {
      task_list.tasks[this.id].task_status = 'completed';
      task_list.tasks[this.id].task_fully_completed_date = new Date();
      //show_assigned_task(task_list);
      show_completed_task(task_list);
      show_qa_task(task_list);
    }
  }

  var qa_task_reopen = document.getElementsByClassName('qa-task-reopen');
  for (var i = 0; i < qa_task_reopen.length; i++) {
      qa_task_reopen[i].onclick = function() {
      task_list.tasks[this.id].task_status = 'dev';
      show_assigned_task(task_list);
      show_qa_task(task_list);
    }
  }

  // Get the modal
  var close_res = document.getElementsByClassName("close");
  for (var i = 0; i < close_res.length; i++) {
    close_res[i].onclick = function() {
      switch(parseInt(this.id)){
        case 0:document.getElementById('moveModal').style.display = "none";break;
        case 1:document.getElementById('taskModal').style.display = "none";break;
      }
    }
  }
});

// To Open the Task Window
function move_form(id){
  try{
    build_options('dev_developer_id', JSON.parse(localStorage.getItem("developer")));
    document.getElementById('dev_task_id').value = task_list.tasks[id].task_id;
    document.getElementById('task_developer_id').value = '';
    document.getElementById('moveModal').style.display = "block";
    return true;
  }catch(e){
    logMyErrors(e);
  }
}

show_assigned_task(task_list);
function show_assigned_task(task_list){
  try{
    var result='';
    for (var key in task_list.tasks) {
      if(task_list.tasks[key].task_status == 'dev'){
        var dev_id = task_list.tasks[key].task_developer_id;
        if(task_list.tasks[key].task_developer_start_date instanceof Date){
          var start_date_arr = task_list.tasks[key].task_developer_start_date;
        }else{
          var start_date_arr = new Date(task_list.tasks[key].task_developer_start_date);
        }
        start_date = start_date_arr.getDate()+'-'+start_date_arr.getMonth()+'-'+start_date_arr.getFullYear();

        var developer = JSON.parse(localStorage.getItem("developer"));
        // task-move
        result+='<div class="task">'+task_list.tasks[key].task_name+'<a class="fa fa-arrow-right dev-task-move" title="Move to QA" id="'+key+'" href="#">&nbsp;</a><br><small>'+developer.names[dev_id].name+' &nbsp;<span class="task-date"> '+start_date+'</span></small></div>';
      }
    }
    return document.getElementById('dev_div').innerHTML = result;
  }catch(e){
    logMyErrors(e);
  }
}

function show_qa_task(task_list){
  var result='';
  for (var key in task_list.tasks) {
    var move = '';
    if(task_list.tasks[key].task_status=='qa'){
      if(task_list.tasks[key].task_dev_completed_date instanceof Date){
        var start_date_arr = task_list.tasks[key].task_dev_completed_date;
      }else{
        var start_date_arr = new Date(task_list.tasks[key].task_dev_completed_date);
      }
      moved_date = start_date_arr.getDate()+'-'+start_date_arr.getMonth()+'-'+start_date_arr.getFullYear();

      move = '<a class="fa fa-arrow-right qa-task-move" title="Move to Completed" id="'+key+'" href="#">&nbsp;</a> &nbsp; <a class="fa fa-arrow-left qa-task-reopen" title="Re-Open to Development" id="'+key+'" href="#">&nbsp;</a>';
      result+='<div class="task">'+task_list.tasks[key].task_name+' '+move+'<br><small class="moved-color">Moved on <span class="task-date">'+moved_date+'</span></small></div>';
    }
  }
  return document.getElementById('qa_div').innerHTML = result;
}
show_qa_task(task_list);

function show_completed_task(task_list){
  var result='';
  for (var key in task_list.tasks) {
    var move = '';
    if(task_list.tasks[key].task_status=='completed'){
      if(task_list.tasks[key].task_fully_completed_date instanceof Date){
        var start_date_arr = task_list.tasks[key].task_fully_completed_date;
      }else{
        var start_date_arr = new Date(task_list.tasks[key].task_fully_completed_date);
      }
      completed_date = start_date_arr.getDate()+'-'+start_date_arr.getMonth()+'-'+start_date_arr.getFullYear();

      result+='<div class="task">'+task_list.tasks[key].task_name+'<br><small class="completed-color">Completed on <span class="task-date">'+completed_date+'</span></small></div>';
    }
  }
  return document.getElementById('completed_div').innerHTML = result;
}
show_completed_task(task_list);

// Build the Select Box
function build_options(id, options){
  var select_box = document.getElementById(id);
  if(parseInt(select_box.options.length) == 1){
    for (var i = 0; i < options.names.length; i++) {
      var option = document.createElement("option");
      option.value = options.names[i].id;
      option.text = options.names[i].name;
      select_box.add(option);
    }
  }
}

// Error Log
function logMyErrors(event){
  console.log(event);
}
