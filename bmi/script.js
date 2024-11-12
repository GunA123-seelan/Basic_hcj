function calculateBMI() {
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value) / 100; // Convert height from cm to meters
  const resultDiv = document.getElementById('result');

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      resultDiv.innerHTML = "Please enter valid weight and height values.";
      resultDiv.style.color = "red";
      return;
  }

  const bmi = (weight / (height * height)).toFixed(2);

  let category = '';
  if (bmi < 18.5) {
      category = 'Underweight';
  } else if (bmi >= 18.5 && bmi < 24.9) {
      category = 'Normal weight';
  } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Overweight';
  } else {
      category = 'Obese';
  }

  resultDiv.style.color = "#333";
  resultDiv.innerHTML = `Your BMI is: <strong>${bmi}</strong> (${category})`;
}
