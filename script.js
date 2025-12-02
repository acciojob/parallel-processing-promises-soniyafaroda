// Array of image URLs
const imageUrls = [
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/200",
  "https://invalid-url-xyz.com/404.jpg" // <-- to test error handling
];

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);           // Image loaded successfully
    img.onerror = () => reject(`Failed to load image: ${url}`); // Error case
  });
}

// Main function using Promise.all
function downloadImages() {
  const loading = document.getElementById("loading");
  const output = document.getElementById("output");
  const errorDiv = document.getElementById("error");

  // Clear previous content
  output.innerHTML = "";
  errorDiv.textContent = "";

  // Show the loading spinner
  loading.style.display = "block";

  // Download all images in parallel
  Promise.all(imageUrls.map(downloadImage))
    .then((images) => {
      // Hide spinner
      loading.style.display = "none";

      // Display all images
      images.forEach((img) => output.appendChild(img));
    })
    .catch((err) => {
      // Hide spinner
      loading.style.display = "none";

      // Show the error message
      errorDiv.textContent = err;
    });
}
