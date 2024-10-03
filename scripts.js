// scripts.js

// Function to handle Senior Phase form submission
async function submitSeniorForm(event) {
    event.preventDefault(); // Prevent form from reloading the page

    const form = document.getElementById('seniorForm');
    const formData = new FormData(form);

    // Convert form data to an object
    const formObject = Object.fromEntries(formData.entries());

    // Generate PDF using jsPDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    pdf.setFontSize(12);
    pdf.text("Senior Phase Examination Details", 10, 10);
    let yOffset = 20;

    Object.entries(formObject).forEach(([key, value]) => {
        pdf.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`, 10, yOffset);
        yOffset += 10; // Increase vertical spacing
    });

    // Save the PDF locally or upload it if server storage is configured
    pdf.save('Senior_Phase_Exam_Details.pdf');

    // Post data to Google Sheets
    await postToGoogleSheets(formObject, 'Senior Phase');

    // Redirect to clock page with duration as a parameter
    window.location.href = `clock.html?title=Senior Phase Exam&duration=${formObject.duration}`;

    // Show confirmation message
    alert("Senior Phase form submitted successfully and PDF generated.");
}

// Function to handle FET Phase form submission (similar to submitSeniorForm)
async function submitFetForm(event) {
    event.preventDefault(); // Prevent form from reloading the page

    const form = document.getElementById('fetForm');
    const formData = new FormData(form);

    // Convert form data to an object
    const formObject = Object.fromEntries(formData.entries());

    // Generate PDF using jsPDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    pdf.setFontSize(12);
    pdf.text("FET Phase Examination Details", 10, 10);
    let yOffset = 20;

    Object.entries(formObject).forEach(([key, value]) => {
        pdf.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`, 10, yOffset);
        yOffset += 10; // Increase vertical spacing
    });

    // Save the PDF locally or upload it if server storage is configured
    pdf.save('FET_Phase_Exam_Details.pdf');

    // Post data to Google Sheets
    await postToGoogleSheets(formObject, 'FET Phase');

    // Redirect to clock page with duration as a parameter
    window.location.href = `clock.html?title=FET Phase Exam&duration=${formObject.duration}`;

    // Show confirmation message
    alert("FET Phase form submitted successfully and PDF generated.");
}

// Function to post data to Google Sheets
async function postToGoogleSheets(data, phase) {
    const sheetURL = 'YOUR_GOOGLE_SHEET_WEBHOOK_URL'; // Replace with your Google Sheets webhook URL or Google Apps Script URL

    try {
        const response = await fetch(sheetURL, {
            method: 'POST',
            body: JSON.stringify({ phase, ...data }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        console.log('Success:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}
