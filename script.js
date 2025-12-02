const imageUrls = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/200",
    "https://invalid-url.com/404"  // Example broken URL to test error handling
];

function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;

        img.onload = () => resolve(img);  
        img.onerror = () => reject(`Failed to download image: ${url}`);
    });
}

async function downloadImages() {
    const loading = document.getElementById("loading");
    const output = document.getElementById("output");
    const errorDiv = document.getElementById("error");

    // Reset everything
    output.innerHTML = "";
    errorDiv.textContent = "";
    loading.style.display = "block";  // show spinner

    try {
        const imagePromises = imageUrls.map(url => downloadImage(url));

        // Wait until ALL images download
        const images = await Promise.all(imagePromises);

        // Hide loading spinner
        loading.style.display = "none";

        // Display all downloaded images
        images.forEach(img => output.appendChild(img));

    } catch (err) {
        loading.style.display = "none";
        errorDiv.textContent = err;
    }
}

document.getElementById("btn").addEventListener("click", downloadImages);
