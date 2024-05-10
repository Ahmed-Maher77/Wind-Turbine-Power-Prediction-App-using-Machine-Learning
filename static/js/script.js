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
        document.getElementById('result').innerText = `Prediction: ${data.lv_active_power}`;
    })
    .catch((error) => console.error("Error:", error));
}

// Navigation and Menu functionality
const burgerIcon = document.querySelector('#header nav > i'),
    menuList = document.querySelector('#header nav > i + ul'),
    closeMenuBtn = document.querySelector('#header ul > i'),
    anchors = document.querySelectorAll('#header li > a');

// Toggle menu visibility
document.onclick = function(e) {
    if (e.target === burgerIcon) {
        menuList.classList.add('nav-active')
    } else if (e.target === closeMenuBtn || e.target !== menuList) {
        menuList.classList.remove('nav-active');
    } else {
        anchors.forEach(a => a === e.target ? menuList.classList.remove('nav-active') : null)
    }
}

// Set active link
anchors.forEach((a, i, arr) => a.onclick = function() {
    arr.forEach(a => a.classList.remove('active-link'));
    a.classList.add('active-link');
})

// Image Slider functionality
const imgs = document.querySelectorAll('#home .imgs-container figure'),
    dots = document.querySelectorAll('.slider .dots li');

let activeIndex = 0;
const imgsLength = imgs.length;

// Change image based on index
function changeImage(n) {
    if (n > 0 && activeIndex === imgsLength - 1) {
        activeIndex = 0
    } else if (n < 0 && activeIndex === 0) {
        activeIndex = imgsLength - 1
    } else {
        activeIndex += (n);
    }
    // Show or hide images based on active index
    imgs.forEach((pic, index) => {
        activeIndex === index ?
            pic.style.display = 'block' :
            pic.style.display = 'none'
    });
    // Highlight the corresponding dot
    dots.forEach((dot, index) => {
        activeIndex === index ?
            dot.classList.add('active-dot') :
            dot.classList.remove('active-dot')
    });
}
