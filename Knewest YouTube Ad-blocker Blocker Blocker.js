// ==UserScript==
// @name Knewest Ad-blocker Blocker Blocker
// @version 1.2
// @description  Removes the annoying ad-blocker popup. Source: https://github.com/Knewest/Knewest-YouTube-Ad-blocker-Blocker-Blocker
// @author Knewest
// @run-at document-start
// @match *://*.youtube.com/*
// ==/UserScript==

(function() {
    if (document.getElementById('removeScriptByKnew')) {
        return;
    }

    var style = document.createElement('style');
    style.id = 'removeScriptByKnew';
    style.type = 'text/css';
    
    var hideStyles = `
        tp-yt-paper-dialog[role="dialog"][class="style-scope ytd-popup-container"],
        ytd-enforcement-message-view-model[class="style-scope ytd-popup-container"],
        tp-yt-iron-overlay-backdrop[class="opened"] {
            display: none !important;
        }
    `;
    // Script by @Knewest on Github.
    if (style.styleSheet) {
        style.styleSheet.cssText = hideStyles;
    } else {
        style.appendChild(document.createTextNode(hideStyles));
    }

    document.head.appendChild(style);
    // Script by @Knewest on Github.
    function checkAndClickPlayButton() {
        var playButton = document.querySelector('.ytp-play-button.ytp-button');
        if (playButton) {
            var svgPath = playButton.querySelector('path');
            if (svgPath && svgPath.getAttribute('d') === "M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z") {
                playButton.click();
                
                var monitorTimeout = setTimeout(function() {
                    clearInterval(monitorInterval);
                }, 4500);

                // Script by @Knewest on Github.

                var monitorInterval = setInterval(function() {
                    if (svgPath.getAttribute('d') === "M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z") {
                        playButton.click();
                    }
                }, 1000);
                // Script by @Knewest on Github.
                setTimeout(function() {
                    clearInterval(checkInterval);
                    clearInterval(monitorInterval);
                    clearTimeout(monitorTimeout);

                    var scriptStyle = document.getElementById('removeScriptByKnew');
                    if (scriptStyle) scriptStyle.remove();
                }, 4500);
            }
        }
    }

    var checkInterval = setInterval(checkAndClickPlayButton, 1000);
})();
