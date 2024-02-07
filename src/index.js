"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Adds Eventlistener to the input field with the id of: urlInput
document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const resultDiv = document.getElementById('result');
    urlInput === null || urlInput === void 0 ? void 0 : urlInput.addEventListener('input', (event) => {
        handleInput();
    });
    // Gets the value from EventHandler
    function handleInput() {
        const inputUrl = urlInput === null || urlInput === void 0 ? void 0 : urlInput.value;
        if (inputUrl != null && isValidUrl(inputUrl)) {
            sendToServer(inputUrl)
                .then((response) => {
                if (resultDiv != null) {
                    resultDiv.innerHTML = 'Server Response: <br />';
                    resultDiv.innerHTML += `The URL exists: ${response.exist}. <br />`;
                    resultDiv.innerHTML += `The URL is a: ${response.type}. <br />`;
                }
            })
                .catch((error) => {
                if (resultDiv != null) {
                    resultDiv.textContent = `Error: ${error.message}`;
                }
            });
        }
        else if (resultDiv != null) {
            resultDiv.textContent = 'Invalid URL';
        }
    }
    // Checks if URL enterded is valid
    function isValidUrl(url) {
        try {
            // eslint-disable-next-line no-new
            new URL(url);
            return true;
        }
        catch (err) {
            return false;
        }
    }
    /* Sends the valid URL to the server.
      Since I am supposed to mock the server.
      I switched the request to a GET ignored the body and just queryed a json document with how a reply might look like for a url folder
  
      Normally this would obviously send the url to the server and have the server do an actual check.
    */
    function sendToServer(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('./url.json', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
                // body: JSON.stringify({ url })
            });
            if (!response.ok) {
                throw new Error(`Server error! Status: ${response.status}`);
            }
            return yield response.json();
        });
    }
});
