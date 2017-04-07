var opml2html = {
  html_container_template: '<h1>{OPMLTITLE}</h1>\n<{LISTTYPE}>\n{ITEMS}</{LISTTYPE}>',
  html_item_template: '  <li>[<a href="{XMLURL}">{XMLTYPE}</a>] <a href="{HTMLURL}">{TITLE}</a></liOPML 2 HTML via JS>\n',
  markdown_container_template: '# {OPMLTITLE}{ITEMS}',
  markdown_item_template: '\n{LISTTYPE} \[[{XMLTYPE}]({XMLURL})\] [{TITLE}]({HTMLURL})',
  convert: function(opml, output_format, output_list_type) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(opml, "application/xml");

    var container_template;
    var item_template;
    var list_type;

    if(output_format === "markdown") {
      container_template = this.markdown_container_template;
      item_template = this.markdown_item_template;
      list_type = output_list_type === "ol" ? "1." : "-";
    } else {
      container_template = this.html_container_template;
      item_template = this.html_item_template;
      list_type = output_list_type;
    }

    var outlines = doc.getElementsByTagName('outline');

    var output = '';
    for (var i = 0, max = outlines.length; i < max; i++) {
      curr = outlines[i];
      if (curr.hasChildNodes())
        continue;

      title = curr.getAttribute('title');
      htmlurl = curr.getAttribute('htmlUrl');
      type = curr.getAttribute('type');
      xmlurl = curr.getAttribute('xmlUrl');
      output += item_template.replace(/{TITLE}/, title)
        .replace(/{HTMLURL}/, htmlurl)
        .replace(/{XMLURL}/, xmlurl)
        .replace(/{XMLTYPE}/, type.toUpperCase())
        .replace(/{LISTTYPE}/, list_type);
    }

    var opml_title = doc.getElementsByTagName('title')[0].firstChild.nodeValue;

    output = container_template.replace(/{ITEMS}/, output)
      .replace(/{OPMLTITLE}/, opml_title)
      .replace(/{LISTTYPE}/g, list_type);
    return output;
  }
}

function buttonClick() {
  var opml = document.getElementById('opml').value;
  var format = "html";
  var type = "ul";

  var radios = document.getElementsByName('output_format');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      format = radios[i].value;
      break;
    }
  }
  radios = document.getElementsByName('output_list_type');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      type = radios[i].value;
      break;
    }
  }


  document.getElementById('result').value = opml2html.convert(opml, format, type);
}

