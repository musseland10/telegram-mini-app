// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();

// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const previewArea = document.getElementById('previewArea');
const imagePreview = document.getElementById('imagePreview');
const sendBtn = document.getElementById('sendBtn');

// Handle file upload
uploadArea.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            imagePreview.src = event.target.result;
            uploadArea.style.display = 'none';
            previewArea.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Handle send button
sendBtn.addEventListener('click', () => {
    tg.showPopup({
        title: 'Photo Shared!',
        message: 'Your photo has been shared with the channel',
        buttons: [{
            id: 'ok',
            type: 'ok'
        }]
    }, (btnId) => {
        if (btnId === 'ok') {
            // Reset the form
            fileInput.value = '';
            imagePreview.src = '';
            previewArea.style.display = 'none';
            uploadArea.style.display = 'block';
        }
    });
});

// If you want to get user data
const user = tg.initDataUnsafe.user;
if (user) {
    console.log(`User ID: ${user.id}`);
    // You can use this data to personalize the experience
}