/**
 * Uploading with onProgress callback
 * https://github.com/github/fetch/issues/89
 *
 * @param  {String} url
 * @param  {String} options.method
 * @param  {Object} options.headers
 * @param  {*} options.body
 * @param  {Function} onProgress
 *
 * @return {Promise}
 */
export default function(url, { method, headers, body }, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const hKeys = Object.keys(Object(headers));

    xhr.open(method, url);
    hKeys.forEach(h => xhr.setRequestHeader(h, headers[h]));
    xhr.onreadystatechange = () => {
      const { readyState, status } = xhr;

      if (readyState === XMLHttpRequest.DONE) {
        /200|201/.test(status)
          ? resolve(xhr)
          : reject(xhr);
      }
    };

    if (onProgress) {
      if (method === 'GET') {
        xhr.onprogress = onProgress;
      } else {
        xhr.upload.onprogress = onProgress;
      }
    }

    xhr.send(body);
  });
}
