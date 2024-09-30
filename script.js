function calculateBMI() {
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;

    if (weight === '' || height === '') {
        document.getElementById('result').innerText = "Please enter both values.";
        return;
    }

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    let status = '';

    if (bmi < 18.5) {
        status = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        status = 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
        status = 'Overweight';
    } else {
        status = 'Obesity';
    }

    document.getElementById('result').innerText = `Your BMI is ${bmi} (${status})`;

    // Update the gauge using the BMI value
    updateGauge(mapBMIToGauge(bmi));
}

function mapBMIToGauge(bmi) {
    if (bmi < 18.5) {
        return 20; // Underweight
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return 50; // Normal weight
    } else if (bmi >= 25 && bmi < 29.9) {
        return 70; // Overweight
    } else {
        return 90; // Obesity
    }
}

// Gauge code
const canvas = document.getElementById('gauge');
const ctx = canvas.getContext('2d');
const gaugeRangeText = document.getElementById('gaugeRangeText');

function updateGauge(value) {
    drawGauge(value);
    updateGaugeRange(value);
}

function drawGauge(value) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height;
    const radius = canvas.width / 2 - 10;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw gauge background
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI);
    ctx.lineWidth = 25;
    ctx.strokeStyle = '#ddd';
    ctx.stroke();

    // Draw gauge value
    const startAngle = Math.PI;
    const endAngle = (value / 100) * Math.PI + startAngle;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineWidth = 24;
    ctx.strokeStyle = getColor(value);
    ctx.stroke();

    // Draw pointer
    const pointerLength = radius - 40;
    const pointerX = centerX + pointerLength * Math.cos(endAngle);
    const pointerY = centerY + pointerLength * Math.sin(endAngle);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(pointerX, pointerY);
    ctx.lineWidth = 15;
    ctx.strokeStyle = '#333';
    ctx.stroke();
}

function getColor(value) {
    if (value < 20) {
        return '#00ff00'; // Low - Green
    } else if (value < 40) {
        return '#66ff33'; // Low to Moderate - Light Green
    } else if (value < 60) {
        return '#ffff00'; // Moderate - Yellow
    } else if (value < 80) {
        return '#ff9900'; // Moderate to High - Orange
    } else {
        return '#ff0000'; // High - Red
    }
}

function updateGaugeRange(value) {
    if (value < 20) {
        gaugeRangeText.innerText = 'Low';
    } else if (value < 40) {
        gaugeRangeText.innerText = 'Low to Moderate';
    } else if (value < 60) {
        gaugeRangeText.innerText = 'Moderate';
    } else if (value < 80) {
        gaugeRangeText.innerText = 'Moderate to High';
    } else {
        gaugeRangeText.innerText = 'High';
    }
}

// Initial draw with default value
updateGauge(10);