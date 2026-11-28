(function () {
  "use strict";
  const template = document.getElementById("caseScripts");
  if (!template) return;
  const paths = Array.from(template.content.querySelectorAll("script[src]"), script => script.getAttribute("src"));
  let loaded = 0;
  let pending;

  function loadScript(path) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = path;
      script.onload = resolve;
      script.onerror = () => {
        script.remove();
        reject(new Error("Could not load " + path));
      };
      document.head.appendChild(script);
    });
  }

  async function loadInOrder() {
    while (loaded < paths.length) {
      await loadScript(paths[loaded]);
      loaded += 1;
    }
  }

  window.DOCUTIS_LOAD_CASES = function () {
    if (!pending) pending = loadInOrder().catch(error => {
      pending = null;
      throw error;
    });
    return pending;
  };
}());
