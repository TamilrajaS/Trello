if (!window.localStorage.getItem('taskList')) {
  var developer = {'names': [{'id': 0, 'name': 'tamil'}, {'id': 1, 'name': 'murugan'}]}
  window.localStorage.setItem('developer', JSON.stringify(developer))

  var taskList = {'tasks': [{'taskId': 0, 'taskName': 'Frontend Training Initialise', 'taskDesc': 'Frontend Training Initialise', 'taskDeveloperId': 0, 'taskDeveloperComments': 'testing', 'taskDeveloperStartDate': '2017-11-17', 'taskStatus': 'completed', 'taskdevCompletedDate': '2017-11-26', 'taskFullyCompletedDate': '2017-11-27'}, {'taskId': 1, 'taskName': 'HTML Task', 'taskDesc': 'html page creation', 'taskDeveloperId': 0, 'taskDeveloperComments': 'testing', 'taskDeveloperStartDate': '2017-11-18', 'taskStatus': 'dev'}, {'taskId': 2, 'taskName': 'Javascript Basic', 'taskDesc': 'html page creation', 'taskDeveloperId': 1, 'taskDeveloperComments': 'testing', 'taskDeveloperStartDate': '2017-11-25', 'taskStatus': 'qa', 'taskdevCompletedDate': '2017-11-26'}, {'taskId': 3, 'taskName': 'Trello App', 'taskDesc': 'Trello app creation in javascript tasks', 'taskStatus': 'created'}]}
  window.localStorage.setItem('taskList', JSON.stringify(taskList))
}
