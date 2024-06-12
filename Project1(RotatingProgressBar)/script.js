document.addEventListener('DOMContentLoaded', () => {
    const rotatingBox = document.getElementById('rotatingBox');
    const progressBar = document.getElementById('progressBar');
    const ball = document.getElementById('ball');
    let isDragging = false;
    let startX, startY, initialRotation, currentRotation = 0;

    function getRotation(event) {
        const rect = rotatingBox.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        return angle;
    }

    rotatingBox.addEventListener('mousedown', (event) => {
        isDragging = true;
        rotatingBox.style.cursor = 'grabbing';
        startX = event.clientX;
        startY = event.clientY;
        initialRotation = getRotation(event) - currentRotation;
    });

    document.addEventListener('mousemove', (event) => {
        if (!isDragging) return;
        let newRotation = getRotation(event) - initialRotation;
        // Restrict rotation to 0-30 degrees
        newRotation = Math.max(0, Math.min(30, newRotation));
        rotatingBox.style.transform = `rotate(${newRotation}deg)`;
        currentRotation = newRotation;
        const progressValue = (currentRotation / 30) * 100; // Update progress value accordingly
        progressBar.style.width = `${progressValue}%`;
        updateBallPosition(progressValue);
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        rotatingBox.style.cursor = 'grab';
    });

    rotatingBox.addEventListener('mouseleave', () => {
        isDragging = false;
        rotatingBox.style.cursor = 'grab';
    });

    function updateBallPosition(progressValue) {
        const progressBarWidth = progressBar.offsetWidth;
        const ballWidth = ball.offsetWidth;
        const ballPosition = (progressValue / 100) * progressBarWidth;
        const ballCenterOffset = ballWidth / 2; // Offset to position the center of the ball
        const tipPosition = progressBarWidth - ballCenterOffset + 5; // Adjust the offset to move the ball slightly to the right
        ball.style.left = `${tipPosition}px`;
    }
});






