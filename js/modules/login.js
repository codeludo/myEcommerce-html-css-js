const form = document.querySelector(".form")
const emailLbl = document.querySelector('label[for="email"]')
const email = document.getElementById("email")
const passwdLbl = document.querySelector('label[for="password"]')
const passwd = document.getElementById("password")
const error = passwd.nextElementSibling

const emailRegExp =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const loginBtn = document.getElementById("login")

window.addEventListener("load", () => {
	const emailIsValid = validateEmail()
	if (!emailIsValid) showEmailError()
})

email.addEventListener("focusout", (event) => {
	const emailIsValid = validateEmail()
	if (!emailIsValid) showEmailError()
	else {
		emailLbl.className = "label"
		email.className = "input"
	}
})

passwd.addEventListener("focusout", (event) => {
	if (passwd.validity.tooShort) {
		passwd.setCustomValidity("too short, it should be > 4 characters")
	} else {
		passwd.setCustomValidity("")
	}
})

form.addEventListener("submit", event => {
	event.preventDefault()
	const isValid = validateEmail() && passwd.validity.tooShort
	// validate email and password length if not login
	if (isValid) {
		emailLbl.className = "label invalid"
		email.className = "input invalid"
		passwdLbl.className = "label invalid"
		passwd.className = "input invalid"
	} else {
		login(email.value, passwd.value)
	}
})

function validateEmail() {
	return email.value.length == 0 || emailRegExp.test(email.value)
}

function showEmailError() {
	emailLbl.className += " invalid"
	email.className += " invalid"
}

function login(userEmail, UserPassword) {

	const data = `{
		"email": "${userEmail}",
		"password": "${UserPassword}"
	  }`
	console.log(
		email.value, passwd.value
	)
	const xhr = new XMLHttpRequest()
	xhr.addEventListener("error", () => {
		alert('something went wrong')
	})
	xhr.open('POST', 'https://api.escuelajs.co/api/v1/auth/login')
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.onload = () => {
		if (xhr.readyState === xhr.DONE) {
		  if (xhr.status === 201) {
			console.log(xhr.response);
			console.log(xhr.responseText);
			const token = JSON.parse(xhr.response)
			sessionStorage.setItem('access_token',token.access_token)
			sessionStorage.setItem('refresh_token',token.refresh_token)
			window.location.href = './home-signin.html'
		  }
		}
	  };
	xhr.send(data)
	
}

