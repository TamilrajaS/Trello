function build_options(id, options){
  var select_box = document.getElementById(id);
  for (var i = 0; i < options.names.length; i++) {
    var option = document.createElement("option");
    option.value = options.names[i].id;
    option.text = options.names[i].name;
    select_box.add(option);
  }
}
