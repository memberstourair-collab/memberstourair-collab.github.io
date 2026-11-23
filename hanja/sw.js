/* 킹링고 — 앱 껍데기를 캐시해 오프라인에서도 실행합니다. */
var CACHE_NAME = "kinglingo-hanja-v11";
var ASSETS = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/data.js",
  "./js/app.js",
  "./manifest.json",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // 브라우저 HTTP 캐시에 남은 예전 파일을 쓰지 않도록 새로 받아 둡니다.
      return Promise.all(ASSETS.map(function (url) {
        return fetch(url, { cache: "reload" }).then(function (response) {
          if (response && response.ok) return cache.put(url, response);
          return null;
        }).catch(function () { return null; });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        return key === CACHE_NAME ? null : caches.delete(key);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  var request = event.request;
  if (request.method !== "GET") return;
  var url;
  try { url = new URL(request.url); } catch (e) { return; }
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).then(function (response) {
        var copy = response.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put("./index.html", copy); });
        return response;
      }).catch(function () {
        return caches.match("./index.html").then(function (hit) { return hit || caches.match("./"); });
      })
    );
    return;
  }

  // 정적 자산은 캐시를 먼저 보여 주고, 뒤에서 새 파일을 받아 둡니다.
  event.respondWith(
    caches.match(request).then(function (hit) {
      var network = fetch(request, { cache: "no-cache" }).then(function (response) {
        if (response && response.ok) {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(request, copy); });
        }
        return response;
      }).catch(function () { return hit; });
      return hit || network;
    })
  );
});
