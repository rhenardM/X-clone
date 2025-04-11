function toggleProfileSettings() {
    document.getElementById('profile-settings').classList.toggle('hidden');
}

// Preview image when selected
document.getElementById('profile_picture').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function() {
        document.getElementById('profile-pic-preview-img').src = reader.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});

document.getElementById('banner').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function() {
        document.getElementById('banner-preview-img').src = reader.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});