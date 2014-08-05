var Once = function(func) {
  var status = true;
  return function() {
    if (status) {
      status = false;
      func();
    }
  };
};

var Start = function(func) {
  document.onreadystatechange = Once(func);
};

// A pack represent:
// {
//  url: url,
//  data: data,
//  successCallback: successCallback,
//  failedCallback: failedCallback
// }
var Ajax = function(method, pack) {
  var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  var callbackNotExecuted = true;
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && callbackNotExecuted) {
      callbackNotExecuted = false;
      if (["200", "201"].indexOf(xmlhttp.status + "") > -1 && pack.success) {
        pack.success(JSON.parse(xmlhttp.responseText));
      } else if (failed) {
        pack.failed(JSON.parse(xmlhttp.responseText));
      };
    }
  };
  xmlhttp.open(method, pack.url, true);
  xmlhttp.setRequestHeader('Content-Type', 'application/json');
  if (pack.data) {
    xmlhttp.send(JSON.stringify(pack.data));
  } else {
    xmlhttp.send();
  }
};

var Select = function(selector, context) {
  //var sizzleExist = (typeof Sizzle != "undefined");
  if (context) {
    return context.querySelectorAll(selector);
  } else {
    return document.querySelectorAll(selector);
  }
};

var Template = function(template_name, data, mother_wrapper) {
  //alert("wrapper->"+mother_wrapper + "template_name:" + template_name);
  var node = document.createElement(mother_wrapper || "div");
  node.innerHTML = TEMPLATES[template_name](data);
  node.firstChild.data = data;
  return node.firstChild;
};

var DynamicBind = function(node, event_pack) {
  Object.keys(event_pack).map(function(selector) {
    Select(selector, node).bind(event_pack[selector].event, event_pack[selector].func);
  });
}

NodeList.prototype.bind = function(event_name, func) {
  var nodes = this;
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].tagName) {
      nodes[i].addEventListener(event_name, func);//["on" + event_name] = func;
    }
  };
  return nodes;
};

NodeList.prototype.map = function(func) {
  var nodes = this;
  var new_array = [];
  for (var i = 0; i < nodes.length; i++) {
    new_nodes.push(func(nodes[i], i));
  }
  return new_array;
};

NodeList.prototype.each = function(func) {
  var nodes = this;
  for (var i = 0; i < nodes.length; i++) {
    func(nodes[i], i);
  }
  return nodes;
}

NodeList.prototype.attrs = function(pairs) {
  var nodes = this;
  Object.keys(pairs).map(function(attr) {
    nodes.each(function(item) {
      item ? item[attr] = pairs[attr] : ""
    });
  });
  return nodes;
};

NodeList.prototype.style = function(pairs) {
  var nodes = this;
  Object.keys(pairs).map(function(attr) {
    nodes.each(function(item) {
      item ? item.style[attr] = pairs[attr] : ""
    });
  });
  return nodes;
}

NodeList.prototype.removeClass = function(class_name) {
  var nodes = this;
  return nodes.each(function(node) {
    node.className = node.className.split(class_name).join(" ");
    //For Windows 8 IE10 Desktop Version hack
    //node.style.textIndent = 0;
  });
}

NodeList.prototype.addClass = function(class_name) {
  var nodes = this;
  return nodes.each(function(node) {
    if (node.className.indexOf(class_name) == -1) {
      node.className = [node.className, class_name].join(" ");
    }
  });
}

Array.prototype.remove = function(atom) {
  var arr = this;
  var position = arr.indexOf(atom);
  if (position > -1) {
    var new_arr = [];
    Loop(arr, function(el) {
      if (el != atom) {
        new_arr.push(el);
      }
    });
    return new_arr;
  } else {
    return arr;
  }
}

Array.prototype.shuffle = function() {
  var arr = this;
  var m = arr.length, t, i;
  while (m) {
    i = Math.random() * m-- | 0;
    t = arr[m], arr[m] = arr[i], arr[i] = t;
  }
  return arr;
}

//var StopBubble = function(event) {
//  if (event && event.stopPropagation) {
//    event.stopPropagation();
//  } else {
//    window.event.cancelBubble = true
//  }
//  return false;
//}
//
//var Cookie = function(new_cookie_key, new_cookie_value) {
//  var cookie = {};
//  Loop(document.cookie.replace(" ", "").split(";"), function(el) {
//    var a = el.split("=");
//    cookie[a.shift()] = a.join("=");
//  });
//  document.cookie = [new_cookie_key, new_cookie_value].join("=") + ";";
//  return cookie;
//}