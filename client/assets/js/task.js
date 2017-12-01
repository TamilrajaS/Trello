var taskList = JSON.parse(window.localStorage.getItem('taskList'))
var developer = JSON.parse(window.localStorage.getItem('developer'))
// To show the total task list
function showTask () {
  try {
    var result = ''
    for (var key in taskList.tasks) {
      var move = ''
      if (taskList.tasks[key].taskStatus === 'created') {
        move = '<a class="fa fa-arrow-right task-move" title="Move ' + taskList.tasks[key].taskName + ' to Dev" id="' + key + '" href="#">&nbsp;</a> <a class="fa fa-times task-remove" title="Remove ' + taskList.tasks[key].taskName + ' to Dev" id="' + key + '" href="#">&nbsp;</a>'
      }
      result += '<div class="task">' + taskList.tasks[key].taskName + ' ' + move + '<a class="fa fa-pencil task-edit" id="' + key + '" href="#"  title="Edit ' + taskList.tasks[key].taskName + '">&nbsp;</a></div>'
    }
    document.getElementById('taskDiv').innerHTML = result
    return true
  } catch (e) {
    logMyErrors(e)
  }
}
showTask()

// To show the task under development
function showAssignedTask () {
  try {
    var result = ''
    var fullStartDate
    var startDateArr
    var startDate
    var devId
    for (var key in taskList.tasks) {
      if (taskList.tasks[key].taskStatus === 'dev') {
        devId = taskList.tasks[key].taskDeveloperId
        fullStartDate = taskList.tasks[key].taskDeveloperStartDate
        startDateArr = (fullStartDate instanceof Date) ? fullStartDate : new Date(fullStartDate)
        startDate = startDateArr.getDate() + '-' + startDateArr.getMonth() + '-' + startDateArr.getFullYear()
        result += '<div class="task">' + taskList.tasks[key].taskName + '<a class="fa fa-arrow-right dev-task-move" title="Move ' + taskList.tasks[key].taskName + '  to QA" id="' + key + '" href="#">&nbsp;</a><br><small class="dev-color">' + developer.names[devId].name + ' &nbsp;<span class="task-date"> ' + startDate + '</span></small></div>'
      }
    }
    document.getElementById('devDiv').innerHTML = result
    return true
  } catch (e) {
    logMyErrors(e)
  }
}
showAssignedTask()

// To show the task under QA
function showQaTask () {
  try {
    var result = ''
    var devCompletedDate
    var movedDateArr
    var movedDate
    var move
    for (var key in taskList.tasks) {
      move = ''
      if (taskList.tasks[key].taskStatus === 'qa') {
        devCompletedDate = taskList.tasks[key].taskdevCompletedDate
        movedDateArr = (devCompletedDate instanceof Date) ? devCompletedDate : new Date(devCompletedDate)
        movedDate = movedDateArr.getDate() + '-' + movedDateArr.getMonth() + '-' + movedDateArr.getFullYear()
        move = '<a class="fa fa-arrow-right qa-task-move" title="Move ' + taskList.tasks[key].taskName + ' to Completed" id="' + key + '" href="#">&nbsp;</a> &nbsp; <a class="fa fa-arrow-left qa-task-reopen" title="Re-Open ' + taskList.tasks[key].taskName + ' to Development" id="' + key + '" href="#">&nbsp;</a>'
        result += '<div class="task">' + taskList.tasks[key].taskName + ' ' + move + '<br><small class="moved-color">Moved on <span class="task-date">' + movedDate + '</span></small></div>'
      }
    }
    document.getElementById('qaDiv').innerHTML = result
    return true
  } catch (e) {
    logMyErrors(e)
  }
}
showQaTask()

// To show the completed task list
function showCompletedTask () {
  try {
    var result = ''
    var fullCompletedDate
    var completedDate
    var completedDateArr
    for (var key in taskList.tasks) {
      if (taskList.tasks[key].taskStatus === 'completed') {
        fullCompletedDate = taskList.tasks[key].taskFullyCompletedDate
        completedDateArr = (fullCompletedDate instanceof Date) ? fullCompletedDate : new Date(fullCompletedDate)
        completedDate = completedDateArr.getDate() + '-' + completedDateArr.getMonth() + '-' + completedDateArr.getFullYear()
        result += '<div class="task">' + taskList.tasks[key].taskName + '<br><small class="completed-color">Completed on <span class="task-date">' + completedDate + '</span></small></div>'
      }
    }
    document.getElementById('completedDiv').innerHTML = result
    return true
  } catch (e) {
    logMyErrors(e)
  }
}
showCompletedTask()

// To open the task edit window model
function editForm (id, moveFlag) {
  try {
    buildOptions('taskDeveloperId', developer)
    setInputAttribute('taskName', { 'value': '', 'readOnly': false })
    setInputAttribute('taskDesc', { 'value': '', 'readOnly': false })
    setInputAttribute('taskDeveloperComments', { 'value': '', 'readOnly': true })
    setInputAttribute('taskDeveloperId', { 'value': '', 'disabled': false })
    setInputAttribute('taskId', { 'value': id })
    document.getElementById('taskModal').style.display = 'block'
    if (id) {
      setInputAttribute('taskName', { 'value': taskList.tasks[id].taskName })
      setInputAttribute('taskDesc', { 'value': taskList.tasks[id].taskDesc })
      setInputAttribute('taskId', { 'value': taskList.tasks[id].taskId })
      setInputAttribute('taskDeveloperId', { 'value': taskList.tasks[id].taskDeveloperId })
      setInputAttribute('taskDeveloperComments', { 'readOnly': false })
      if (taskList.tasks[id].taskDeveloperComments) {
        setInputAttribute('taskDeveloperComments', { 'value': taskList.tasks[id].taskDeveloperComments })
      }
      // Disable the task fields for developer
      if (moveFlag) {
        setInputAttribute('taskName', { 'readOnly': true })
        setInputAttribute('taskDesc', { 'readOnly': true })
        setInputAttribute('taskDeveloperId', { 'disabled': true })
        var actionName = (moveFlag === 2) ? 'reopen' : 'move-qa'
        setInputAttribute('taskAction', { 'value': actionName })
      }
    } else {
      setInputAttribute('taskDeveloperComments', { 'readOnly': true })
    }
    return true
  } catch (e) {
    logMyErrors(e)
  }
}

// To open the move task window model
function moveForm (id) {
  try {
    buildOptions('devDeveloperId', developer)
    setInputAttribute('devTaskId', { 'value': taskList.tasks[id].taskId })
    setInputAttribute('taskDeveloperId', { 'value': '' })
    document.getElementById('moveModal').style.display = 'block'
    return true
  } catch (e) {
    logMyErrors(e)
  }
}

// To save the task details
document.getElementById('btnTaskAdd').onclick = function () {
  try {
    var inputTaskName = document.getElementById('taskName').value
    if (inputTaskName === '') {
      document.getElementById('taskName').classList.add('error')
      document.getElementById('errTaskName').textContent = 'Please enter the task name'
      return false
    } else {
      document.getElementById('taskName').classList.remove('error')
      document.getElementById('errTaskName').textContent = ''
    }
    var inputTaskDesc = document.getElementById('taskDesc').value
    var inputTaskId = document.getElementById('taskId').value
    var inputTaskDeveloperId = document.getElementById('taskDeveloperId').value
    var inputTaskDeveloperComments = document.getElementById('taskDeveloperComments').value
    var inputAction = document.getElementById('taskAction').value
    var currentDate = new Date()
    var status = ''
    var devCompletionDate = ''
    if (inputTaskId) {
      status = taskList.tasks[inputTaskId].taskStatus
    }
    switch (inputAction) {
      case 'create':status = 'created'
        break
      case 'move-qa':status = 'qa'
        devCompletionDate = new Date()
        break
      case 'reopen':status = 'dev'
        break
      default:break
    }
    if (inputTaskDeveloperId !== '' && status === 'created') {
      status = 'dev'
    }
    if (inputTaskId === '') {
      taskList.tasks.push({'taskId': taskList.tasks.length, 'taskName': inputTaskName, 'taskDesc': inputTaskDesc, 'taskDeveloperId': inputTaskDeveloperId, 'taskDeveloperStartDate': currentDate, 'taskDeveloperComments': inputTaskDeveloperComments, 'taskStatus': status})
    } else {
      taskList.tasks[inputTaskId] = { 'taskName': inputTaskName, 'taskDesc': inputTaskDesc, 'taskId': inputTaskId, 'taskDeveloperId': inputTaskDeveloperId, 'taskDeveloperStartDate': currentDate, 'taskDeveloperComments': inputTaskDeveloperComments, 'taskStatus': status, 'taskdevCompletedDate': devCompletionDate }
    }
    showTask()
    showAssignedTask()
    showQaTask()
    showCompletedTask()
    document.getElementById('taskModal').style.display = 'none'
    return false
  } catch (e) {
    logMyErrors(e)
  }
}

// To save the task move functionality
document.getElementById('btnTaskMove').onclick = function () {
  try {
    var inputTaskId = document.getElementById('devTaskId').value
    var taskDevId = document.getElementById('devDeveloperId').value
    if (!taskDevId) {
      document.getElementById('devDeveloperId').classList.add('error')
      document.getElementById('errDevDeveloperId').textContent = 'Please select the developer name'
      return false
    } else {
      document.getElementById('devDeveloperId').classList.remove('error')
      document.getElementById('errDevDeveloperId').textContent = ''
    }
    taskList.tasks[inputTaskId].taskDeveloperId = document.getElementById('devDeveloperId').value
    taskList.tasks[inputTaskId].taskDeveloperStartDate = new Date()
    taskList.tasks[inputTaskId].taskStatus = 'dev'
    showTask()
    showAssignedTask()
    document.getElementById('moveModal').style.display = 'none'
    return true
  } catch (e) {
    logMyErrors(e)
  }
}

// On Ready Function
document.addEventListener('click', function (event) {
  try {
    switch (event.srcElement.classList[2]) {
      case 'task-edit':
        editForm(event.srcElement.id, 0)
        break
      case 'dev-task-move':
        editForm(event.srcElement.id, 1)
        break
      case 'task-move':
        moveForm(event.srcElement.id)
        break
      case 'task-remove':
        taskList.tasks.splice(event.srcElement.id, 1)
        showTask()
        break
      case 'qa-task-move':
        taskList.tasks[event.srcElement.id].taskStatus = 'completed'
        taskList.tasks[event.srcElement.id].taskFullyCompletedDate = new Date()
        showCompletedTask()
        showQaTask()
        break
      case 'qa-task-reopen':
        taskList.tasks[event.srcElement.id].taskStatus = 'dev'
        editForm(event.srcElement.id, 2)
        break
      default: break
    }

    // To add new task window
    document.getElementById('addTask').onclick = function () {
      editForm('', 0)
    }
    // To close the existing dialogue model
    if (event.srcElement.classList[0] === 'close') {
      switch (parseInt(event.srcElement.id)) {
        case 0: document.getElementById('moveModal').style.display = 'none'
          break
        case 1: document.getElementById('taskModal').style.display = 'none'
          break
        default:
          break
      }
    }
  } catch (e) {
    logMyErrors(e)
  }
})

// Build the Select Box
function buildOptions (id, options) {
  try {
    if (Array.isArray(options.names)) {
      var selectBox = document.getElementById(id)
      if (parseInt(selectBox.options.length) === 1) {
        for (var i = 0; i < options.names.length; i++) {
          var option = document.createElement('option')
          option.value = options.names[i].id
          option.text = options.names[i].name
          selectBox.add(option)
        }
      }
    }
    return true
  } catch (e) {
    logMyErrors(e)
  }
}
// Error Log
function logMyErrors (event) {
  console.log(event)
}

function setInputAttribute (field, inputJson) {
  if (inputJson) {
    for (var key in inputJson) {
      switch (key) {
        case 'value':document.getElementById(field).value = inputJson[key]
          break
        case 'readOnly':document.getElementById(field).readOnly = inputJson[key]
          break
        case 'disabled':document.getElementById(field).disabled = inputJson[key]
          break
        default:break
      }
    //  fieldName+'.'+key = inputJson[key]
    }
  }
  return true
}
