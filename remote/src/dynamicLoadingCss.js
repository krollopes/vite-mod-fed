const seen = {};

const dynamicLoadingCss = (cssFilePaths, dontAppendStylesToHead, exposeItemName) => {
  const metaUrl = import.meta.url;
  if (typeof metaUrl === 'undefined') {
    console.warn('The remote style takes effect only when the build.target option in the vite.config.ts file is higher than that of "es2020".');
    return;
  }

  const curUrl = metaUrl.substring(0, metaUrl.lastIndexOf('remoteEntry.js'));
  const base = curUrl || '/';
  const assetsDir = 'assets';

  cssFilePaths.forEach(cssPath => {
    const href = [base, assetsDir, cssPath].filter(Boolean).join('/');

    if (href in seen) return;
    seen[href] = true;

    if (!dontAppendStylesToHead) {
      const element = document.createElement('link');
      element.rel = 'stylesheet';
      element.href = href;
      document.head.appendChild(element);
      return;
    }

    const key = 'css__' + exposeItemName;
    window[key] = window[key] || [];
    window[key].push(href);
  });
};

export { dynamicLoadingCss };
