// Prediction Function
function predict() {
	// Gather form data
	const windSpeed = document.getElementById("wind_speed").value;
	const theoreticalPower = document.getElementById("theoretical_power").value;
	const windDirection = document.getElementById("wind_direction").value;
	const dateTime = document.getElementById("date_time").value;

	// Send form data to Flask endpoint
	fetch("/predict", {
		method: "POST",
		body: JSON.stringify({
			"Wind speed": windSpeed,
			"Theoretical power": theoreticalPower,
			"Wind direction": windDirection,
			"Date/time": dateTime,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.json())
		.then((data) => {
			// Display prediction result
			document.getElementById(
				"result"
			).innerText = `Prediction: ${data.lv_active_power}`;
		})
		.catch((error) => console.error("Error:", error));
}

// Navigation and Menu functionality
const burgerIcon = document.querySelector("#header nav > i"),
	menuList = document.querySelector("#header nav > i + ul"),
	closeMenuBtn = document.querySelector("#header ul > i"),
	anchors = document.querySelectorAll("#header li > a");

// Toggle menu visibility
document.onclick = function (e) {
	if (e.target === burgerIcon) {
		menuList.classList.add("nav-active");
        darkDiv.style.display = 'none'
	} else if (e.target === closeMenuBtn || e.target !== menuList) {
        menuList.classList.remove("nav-active");
        darkDiv.style.display = 'block'
	} else {
		anchors.forEach((a) =>
			a === e.target ? menuList.classList.remove("nav-active") : null
		);
	}
};

// Set active link
anchors.forEach(
	(a, i, arr) =>
		(a.onclick = function () {
			arr.forEach((a) => a.classList.remove("active-link"));
			a.classList.add("active-link");
		})
);

/* Image Slider functionality */
const imgs = document.querySelectorAll("#home .imgs-container figure"),
	dotsContainer = document.querySelector(".slider .dots"),
	dots = document.querySelectorAll(".slider .dots li");
let activeIndex = 0,
	imgsLength = imgs.length,
	intervalId;

// Change image based on index
function changeImage(n = 1) {
	if (n > 0 && activeIndex === imgsLength - 1) {
		activeIndex = 0;
	} else if (n < 0 && activeIndex === 0) {
		activeIndex = imgsLength - 1;
	} else {
		activeIndex += n;
	}
	updateSlider();
	resetInterval();
}

// Function to handle slider navigation via dots
dotsContainer.onclick = function (event) {
	dots.forEach((dot, index) => {
		if (event.target === dot) {
			activeIndex = index; // Set activeIndex to the clicked dot's index
			updateSlider(); // Update the slider to the selected image
			resetInterval();
		}
	});
};

// Update the display of images and active dot
function updateSlider() {
	imgs.forEach((pic, index) => {
		pic.style.display = activeIndex === index ? "block" : "none";
	});
	dots.forEach((dot, index) => {
		dot.classList.toggle("active-dot", activeIndex === index);
	});
}

// Reset the interval after a manual action
function resetInterval() {
	clearInterval(intervalId);
	intervalId = setInterval(changeImage, 3000);
}

// Initial interval setup
intervalId = setInterval(changeImage, 3000);

// Initial call to display the first image and set the first dot as active
updateSlider();



// Send email from Javascript
function sendEmail() {
	var templateParams = {
		name: document.getElementById("name").value,
		email: document.getElementById("email").value,
		message: document.getElementById("msg").value,
		website_url: window.location.href,
	};
    const serviceId = "service_unqcncb",
        templateId = "template_c2ic16k";
	emailjs.send(serviceId, templateId, templateParams).then(
		(response) => {
			alert("Your message sent successfully!");
		},
		(error) => {
			console.log("FAILED...", error);
		}
	);
}

// Dark Mode
var darkDiv = document.querySelector('.dark'),
    darkBtns = document.querySelectorAll('.dark i'),
    sunBtn = document.querySelector('.dark .fa-sun'),
    moonBtn = document.querySelector('.dark .fa-moon');
darkDiv.onclick = function(e) {
    darkBtns.forEach(btn => {
        if (e.target === btn)
            if (btn === moonBtn) {
                document.documentElement.classList.add('dark-active')
            } else if (btn === sunBtn) {
                document.documentElement.classList.remove('dark-active')
            }
    })
}

// PWA 
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then((res) => console.log("service worker registered"))
            .catch((err) => console.log("service worker not registered", err));
    });
}