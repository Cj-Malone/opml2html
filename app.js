var opml2html = {
  html_container_template: '<h1>{OPMLTITLE}</h1>\n<{LISTTYPE}>\n{ITEMS}</{LISTTYPE}>',
  html_item_template: '  <li>[<a href="{XMLURL}">{XMLTYPE}</a>] <a href="{HTMLURL}">{TITLE}</a></liOPML 2 HTML via JS>\n',
  markdown_container_template: '# {OPMLTITLE}{ITEMS}',
  markdown_item_template: '\n{LISTTYPE} \[[{XMLTYPE}]({XMLURL})\] [{TITLE}]({HTMLURL})',
  parse: function(opml, output, output_list_type) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(opml, "application/xml");

    var container_template;
    var item_template;
    var list_type;

    if(output === "markdown") {
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


  document.getElementById('result').value = opml2html.parse(opml, format, type);
}

var opml_example = `<opml version="1.0">
  <head>
    <title>Stoyan subscriptions in Google Reader</title>
  </head>
  <body>
    <outline title="marco" text="marco">
      <outline text=" The Net is Dead - Life Beyond the Buzz " title=" The Net is Dead - Life Beyond the Buzz " type="rss" xmlUrl="http://www.i-marco.nl/weblog/rss.xml" htmlUrl="http://www.i-marco.nl/weblog/index.php"/>
    </outline>
    <outline title="phpied" text="phpied">
      <outline text=" phpied.com " title=" phpied.com " type="rss" xmlUrl="http://www.phpied.com/feed/" htmlUrl="http://www.phpied.com"/>
    </outline>
    <outline title="sitepoint" text="sitepoint">
      <outline text=" SitePoint Blogs " title=" SitePoint Blogs " type="rss" xmlUrl="http://www.sitepoint.com/blogs/feed/" htmlUrl="http://www.sitepoint.com/blogs"/>
    </outline>
    <outline text="Bruce Eckel's Weblog" title="Bruce Eckel's Weblog" type="rss" xmlUrl="http://www.artima.com/weblogs/feeds/bloggers/beckel.rss" htmlUrl="http://www.artima.com/weblogs/index.jsp?blogger=beckel"/>
    <outline text="Creating Passionate Users" title="Creating Passionate Users" type="rss" xmlUrl="http://headrush.typepad.com/creating_passionate_users/index.rdf" htmlUrl="http://headrush.typepad.com/creating_passionate_users/"/>
    <outline text="Fleegix.org" title="Fleegix.org" type="rss" xmlUrl="http://fleegix.org/xml/rss/feed.xml" htmlUrl="http://fleegix.org/"/>
    <outline text="Isidoro's Blog" title="Isidoro's Blog" type="rss" xmlUrl="http://black.filegrenade.com:8080/blog/?feed=rss2" htmlUrl="http://black.filegrenade.com:8080/blog"/>
    <outline text="Ivo Web 2oo6" title="Ivo Web 2oo6" type="rss" xmlUrl="http://www.ivo.stih4e.com/blog/?feed=rss2" htmlUrl="http://www.ivo.stih4e.com/blog"/>
    <outline text="Let the Good Times Roll--by Guy Kawasaki" title="Let the Good Times Roll--by Guy Kawasaki" type="rss" xmlUrl="http://feeds.feedburner.com/letTheGoodTimesRollByGuyKawasaki" htmlUrl="http://blog.guykawasaki.com/"/>
    <outline text="Official Google Blog" title="Official Google Blog" type="rss" xmlUrl="http://googleblog.blogspot.com/atom.xml" htmlUrl="http://googleblog.blogspot.com"/>
    <outline text="Paul Graham: Unofficial RSS Feed" title="Paul Graham: Unofficial RSS Feed" type="rss" xmlUrl="http://www.joegrossberg.com/paulgraham.rss" htmlUrl="http://www.paulgraham.comhttp://www.paulgraham.com"/>
    <outline text="PhilRenaud.com" title="PhilRenaud.com" type="rss" xmlUrl="http://philrenaud.com/rss.php" htmlUrl="http://philrenaud.com/"/>
    <outline text="PHP: Hypertext Preprocessor" title="PHP: Hypertext Preprocessor" type="rss" xmlUrl="http://www.php.net/news.rss" htmlUrl="http://www.php.net/"/>
    <outline text="Poo-tee-weet" title="Poo-tee-weet" type="rss" xmlUrl="http://pooteeweet.org/rss.xml" htmlUrl="http://pooteeweet.org"/>
    <outline text="QuirksBlog" title="QuirksBlog" type="rss" xmlUrl="http://www.quirksmode.org/blog/index.xml" htmlUrl="http://www.quirksmode.org/blog/"/>
    <outline text="SAP Developer Network SAP Weblogs by Piers Harding" title="SAP Developer Network SAP Weblogs by Piers Harding" type="rss" xmlUrl="http://weblogs.sdn.sap.com/pub/q/weblog_rss_author?x-author=8630&amp;x-ver=1.0&amp;x-mimetype=application%2Frdf%2Bxml" htmlUrl="https://www.sdn.sap.com/sdn/weblogs.sdn?blog=/pub/u/8630"/>
    <outline text="Signal vs. Noise" title="Signal vs. Noise" type="rss" xmlUrl="http://37signals.com/svn/index_full.rdf" htmlUrl="http://37signals.com/svn/"/>
    <outline text="Simon Willison's Weblog" title="Simon Willison's Weblog" type="rss" xmlUrl="http://simon.incutio.com/syndicate/rss1.0" htmlUrl="http://simon.incutio.com/"/>
    <outline text="SitePoint.com" title="SitePoint.com" type="rss" xmlUrl="http://www.sitepoint.com/recent.rdf" htmlUrl="http://www.sitepoint.com/"/>
    <outline text="Stylegala | news" title="Stylegala | news" type="rss" xmlUrl="http://www.stylegala.com/feeds/news.xml" htmlUrl="http://www.stylegala.com/"/>
    <outline text="Stylegala | public news" title="Stylegala | public news" type="rss" xmlUrl="http://www.stylegala.com/feeds/public-news.xml" htmlUrl="http://www.stylegala.com/"/>
    <outline text="Web Standards with Imagination" title="Web Standards with Imagination" type="rss" xmlUrl="http://www.dustindiaz.com/feed/" htmlUrl="http://www.dustindiaz.com"/>
    <outline text="Webmaster Central Blog" title="Webmaster Central Blog" type="rss" xmlUrl="http://googlewebmastercentral.blogspot.com/atom.xml" htmlUrl="http://googlewebmastercentral.blogspot.com"/>
    <outline text="Yahoo! User Interface Blog" title="Yahoo! User Interface Blog" type="rss" xmlUrl="http://feeds.yuiblog.com/YahooUserInterfaceBlog" htmlUrl="http://yuiblog.com/blog"/>
  </body>
</opml>`

window.addEventListener("load", function() {
  document.getElementById('opml').value = opml_example;
});

