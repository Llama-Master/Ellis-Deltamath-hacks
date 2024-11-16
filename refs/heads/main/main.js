(async () => {
    const browser = chrome || browser;

    /** Get an item from chrome local storage */
    function get(key) {
        return new Promise(resolve => {
            browser.storage.local.get([key], result => {
                resolve(result[key]);
            });
        });
    }

    /** Custom Nil URL */
    const url = await get("url");

    /** Use Custom Nil URL */
    const checked = await get("checked");

    /** Nil URL to be used */
    const NilURL = (url && checked) ? url : "https://raw.githubusercontent.com/Llama-Master/Ellis-Deltamath-hacks/refs/heads/main"; // Updated URL

   /*-----------------------------------------------*
    *                                               *
    *                INJECT MAIN.JS                 *
    *                                               *
    ------------------------------------------------*/

    async function insertCode () {
        try {
            /** Nil Loader */
            const request = await (await fetch(`${NilURL}/main.js`)).text();  // Fetch the updated main.js
            document.documentElement.setAttribute("onreset", `${request}\nconsole.log("loaded custom main.js!");`);
            document.documentElement.dispatchEvent(new CustomEvent("reset"));
            document.documentElement.removeAttribute("onreset");
        } catch (error) {
            alert("Failed to load main.js. Error:\n" + error.message);
        }
    }

    if (!window.scriptIsInjected) {
        insertCode().catch((err) => {
            swal.fire({
                title: "Could not load Nil",
                html: err,
                icon: "error"
            });
        });

        /*-----------------------------------------------*
        *                                               *
        *              LATEST DMIx VERSION              *
        *                                               *
        ------------------------------------------------*/

        /** User's version of DMIx */
        const pluginVersion = chrome.runtime.getManifest().version;

        /** Latest version of DMIx. */
        const supportedVersion = (await (await fetch(`${NilURL}/version`)).text());

        /** Checks for plugin version. If outdated, triggers dialog box */
        if (pluginVersion !== supportedVersion) {
            const res = confirm(`DMIx is outdated. If you experience any errors, please update.\nYour Version: ${pluginVersion}\nLatest Version: ${supportedVersion}`);
            if (res) { location = "https://github.com/DxltaMath/DMIx/blob/master/.github/meta/UPDATING.md"; }
        }

        /** Script is now injected. */
        window.scriptIsInjected = true;
    }

})();
