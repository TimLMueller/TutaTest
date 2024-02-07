interface ServerResponse {
  exist: boolean
  type: string
}
// Adds Eventlistener to the input field with the id of: urlInput
document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('urlInput') as HTMLInputElement | null
  const resultDiv = document.getElementById('result')

  urlInput?.addEventListener('input', (event: Event) => {
    handleInput()
  })
  // Gets the value from EventHandler
  function handleInput (): void {
    const inputUrl = urlInput?.value
    if (inputUrl != null && isValidUrl(inputUrl)) {
      sendToServer(inputUrl)
        .then((response) => {
          if (resultDiv != null) {
            resultDiv.innerHTML = 'Server Response: <br />'
            resultDiv.innerHTML += `The URL exists: ${response.exist}. <br />`
            resultDiv.innerHTML += `The URL is a: ${response.type}. <br />`
          }
        })
        .catch((error) => {
          if (resultDiv != null) {
            resultDiv.textContent = `Error: ${error.message}`
          }
        })
    } else if (resultDiv != null) {
      resultDiv.textContent = 'Invalid URL'
    }
  }
  // Checks if URL enterded is valid
  function isValidUrl (url: string): boolean {
    try {
      // eslint-disable-next-line no-new
      new URL(url)
      return true
    } catch (err) {
      return false
    }
  }
  /* Sends the valid URL to the server.
    Since I am supposed to mock the server.
    I switched the request to a GET ignored the body and just queryed a json document with how a reply might look like for a url folder

    Normally this would obviously send the url to the server and have the server do an actual check.
  */
  async function sendToServer (url: string): Promise<ServerResponse> {
    const response = await fetch('./url.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
      // body: JSON.stringify({ url })
    })

    if (!response.ok) {
      throw new Error(`Server error! Status: ${response.status}`)
    }

    return await response.json()
  }
})
