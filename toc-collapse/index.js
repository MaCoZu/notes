const accordionScript = `(function () {
  function depthOf(li) {
    for (var i = 0; i < li.classList.length; i++) {
      if (li.classList[i].indexOf('depth-') === 0) return parseInt(li.classList[i].slice(6), 10);
    }
    return 0;
  }
  function pageTopLevel() {
    var top = 7;
    var heads = document.querySelectorAll('article h1, article h2, article h3, article h4, article h5, article h6');
    for (var i = 0; i < heads.length; i++) {
      var n = parseInt(heads[i].tagName.charAt(1), 10);
      if (n < top) top = n;
    }
    return top === 7 ? 1 : top;
  }
  function init() {
    var tocs = document.querySelectorAll('.toc .toc-content');
    if (!tocs.length) return;
    var top = pageTopLevel();
    // show h1 and h2 by default; collapse everything at h3 and below
    var maxVisible = 2 - top; // depth threshold: keep items with depth <= maxVisible
    var hiddenFrom = maxVisible + 1;
    for (var k = 0; k < tocs.length; k++) {
      var ul = tocs[k];
      if (ul.dataset.nestedCollapsed) continue;
      ul.dataset.nestedCollapsed = '1';
      var items = ul.querySelectorAll('li');
      var groups = [];
      var owner = null;
      for (var i = 0; i < items.length; i++) {
        var li = items[i];
        var d = depthOf(li);
        if (d <= maxVisible) {
          owner = { root: li, subs: [] };
          groups.push(owner);
        } else if (owner) {
          owner.subs.push(li);
          li.classList.add('hidden');
        }
      }
      for (var g = 0; g < groups.length; g++) {
        (function (grp) {
          if (!grp.subs.length) return;
          var fold = document.createElement('span');
          fold.className = 'toc-fold';
          fold.textContent = '\\u25B8';
          fold.setAttribute('aria-hidden', 'true');
          grp.root.insertBefore(fold, grp.root.firstChild);
          fold.addEventListener('click', function () {
            var open = grp.root.classList.toggle('open');
            fold.textContent = open ? '\\u25BE' : '\\u25B8';
            for (var j = 0; j < grp.subs.length; j++) {
              grp.subs[j].classList.toggle('hidden', !open);
            }
          });
        })(groups[g]);
      }
    }
  }
  document.addEventListener('nav', init);
  document.addEventListener('render', init);
})();`

export default function TocCollapse() {
  return {
    name: "toc-collapse",
    markdownPlugins() {
      return []
    },
    externalResources() {
      return {
        js: [
          {
            loadTime: "afterDOMReady",
            contentType: "inline",
            script: accordionScript,
          },
        ],
      }
    },
  }
}