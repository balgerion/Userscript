// ==UserScript==
// @name         Open in Reddit Live Container
// @version      1.0.0
// @author       nathandaven
// @match        *://*.reddit.com/*
// @grant        none
// @run-at       document-start
// @downloadURL  https://github.com/nathandaven/Open-In-Live-Container/raw/refs/heads/main/open-in-reddit-live-container.user.js
// @updateURL    https://github.com/nathandaven/Open-In-Live-Container/raw/refs/heads/main/open-in-reddit-live-container.user.js
// @homepage     https://github.com/nathandaven/Open-In-Apollo-Live-Container/tree/main
// ==/UserScript==

(function() {
    'use strict';

    function utf8_to_b64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }

    function openInReddit() {
        const regexRedditIDs = /^(?:https?:\/\/)?(?:(?:www|amp|m|i|old)\.)?(?:(?:reddit\.com))\/r\/(\w+)(?:\/comments\/(\w+)(?:\/\w+\/(\w+)(?:\/?.*?[?&]context=(\d+))?)?)?/i;
        const match = window.location.href.match(regexRedditIDs);

        let redditDeepLink;

        if (window.location.pathname === "/" || window.location.pathname === "/?feed=home") {
            redditDeepLink = "reddit://";
        } else if (window.location.pathname.includes("/search")) {
            return;
        } else if (match) {
            const newRegex = /\/new.*/;
            const endsInNew = newRegex.test(window.location.pathname);
            
            if (endsInNew) {
                const newPath = window.location.pathname.slice(0, -4);
                redditDeepLink = `reddit://${window.location.hostname}${newPath}`;
            } else {
                redditDeepLink = `reddit://${window.location.hostname}${window.location.pathname}`;
            }
        } else {
            redditDeepLink = `reddit://${window.location.pathname.slice(1)}`;
        }

        window.location.href = 
            `livecontainer://open-web-page?url=` + 
            utf8_to_b64(redditDeepLink);
    }

    openInReddit();
})();