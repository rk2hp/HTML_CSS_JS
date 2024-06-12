const boxContainer = document.getElementById('boxContainer');
const rangeInput = document.getElementById('rangeInput');
const box = document.getElementById('box');
const rangeValue = document.getElementById('rangeValue');

rangeInput.addEventListener('input', () => {
    const value = rangeInput.value;
    rangeValue.textContent = value;
});

let isMouseDown = false;
let startAngle = 0;
let currentRotation = 0;

// Add event listeners to track mouse movement directly on the blue box
box.addEventListener('mousedown', mouseDownHandler);
document.addEventListener('mouseup', mouseUpHandler);
document.addEventListener('mousemove', mouseMoveHandler);

// Mouse down event handler
function mouseDownHandler(e) {
    isMouseDown = true;
    const rect = box.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI) - currentRotation;
}

// Mouse up event handler
function mouseUpHandler() {
    isMouseDown = false;
}

// Mouse move event handler
function mouseMoveHandler(e) {
    if (isMouseDown) {
        const rect = box.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
        let rotation = currentAngle - startAngle;
        rotation = Math.min(45, Math.max(0, rotation)); // Restrict rotation to 45 degrees clockwise
        boxContainer.style.transform = `rotate(${rotation}deg)`;
        // Adjust the range input value to maintain the maximum rotation of 45 degrees
        rangeInput.value = (rotation / 45)* 45 ;
        rangeValue.textContent = rotation.toFixed(0);
        currentRotation = rotation;
    }
}
