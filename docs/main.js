// main.js

// Log to console to confirm the script is loaded
console.log("Custom main.js loaded! Everything is working.");

// Display a message on the page
const helloMessage = document.createElement('div');
helloMessage.style.position = 'fixed';
helloMessage.style.top = '10px';
helloMessage.style.left = '10px';
helloMessage.style.padding = '10px';
helloMessage.style.backgroundColor = 'rgba(0, 128, 0, 0.8)';
helloMessage.style.color = '#fff';
helloMessage.style.fontSize = '16px';
helloMessage.innerText = "Custom main.js is working!";
document.body.appendChild(helloMessage);

// Additional checks (e.g., for modifying DeltaMath's elements)
if (document.querySelector('h1')) {
    console.log('Found an H1 element on the page.');
} else {
    console.log('No H1 element found.');
}

// Example of overriding or adding a custom function
window.alert = function() {
    console.log('Custom alert function triggered.');
    originalAlert('Custom alert triggered.');
};
