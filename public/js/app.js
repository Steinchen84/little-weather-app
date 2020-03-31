

const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')


// search for weather
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()

  const userInput = e.target.elements.userSearch.value.toLowerCase()

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch(`/weather?address=${userInput}`).then( (response) => {
    response.json().then( (data) => {
      if(data.error) messageOne.textContent = data.error
      else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
  })
})