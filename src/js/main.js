Start(function() {
  Select("#new-todo").bind("keyup", function(e) {
    if (e.keyIdentifier == "Enter" && this.value != "") {
      var list_node = Select("#todo-list")[0];
      var new_node = newItem({value: this.value});
      list_node.insertBefore(new_node, Select("li", list_node)[0]);
      countNodeChange(1);
      this.value = "";
    }
  });
  
  Select("#toggle-all").bind("click", function() {
    var items = Select("#todo-list li");
    var completed_items = Select("#todo-list li.completed");
    var is_all_completed = (completed_items.length == items.length);
    items.each(function(el) {
      toggleItem(el, !is_all_completed);
    });
    var count = !is_all_completed ? 0 : items.length;
    countNodeChange(count, !is_all_completed);
  });
  
  Select("#filters li").bind("click", function() {
    var text = Select("a", this)[0].innerHTML;
    if (text == "All") {
      Select("#todo-list li").removeClass("hidden");
    } else if (text == "Active") {
      Select("#todo-list li.completed").addClass("hidden");
    } else if (text == "Completed") {
      Select("#todo-list li").addClass("hidden");
      Select("#todo-list li.completed").removeClass("hidden");
    }
    Select("#filters li a").removeClass("selected");
    Select("a", this).addClass("selected");
  });
});

var countNodeChange = function(number, isAdd) {
  var count_node = Select("#todo-count strong")[0];
  if (typeof(isAdd) == "undefined") {
    count_node.innerHTML = parseInt(count_node.innerHTML) + number;
  } else {
    count_node.innerHTML = parseInt(number);
  }
}

var toggleItem = function(node, is_checked) {
  Select("input", node)[0].checked = is_checked;
  if (is_checked) {
    node.className = "completed";
    countNodeChange(-1);
  } else {
    node.className = "";
    countNodeChange(1);
  }
}

var newItem = function(data) {
  var node = Template("item", data);
  
  var destroyItem = function() {
    node.parentElement.removeChild(node);
    countNodeChange(-1);
  }
  
  DynamicBind(node, {
    ".toggle": {
      event: "click",
      func: function(e) {
        toggleItem(node, e.target.checked);
      }
    },
    ".destroy": {
      event: "click",
      func: destroyItem
    }
  });
  return node;
}