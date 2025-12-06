// Array of image URLs (add valid + one broken URL for testing)
const imageUrls = [
  "https://picsum.photos/200/300",
  "https://picsum.photos/250/300",
  "https://picsum.photos/300/300",
  "https://picsum.photos/350/300",
  "https://picsum.photos/400/300"
];

// Download a single image using Promise
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);     // success
    img.onerror = () => reject(`❌ Failed to load image: ${url}`);

    img.src = url;
  });
}

// Main function to download all images
function downloadImages() {
  const loading = document.getElementById("loading");
  const output = document.getElementById("output");
  const errorDiv = document.getElementById("error");

  // Reset UI
  output.innerHTML = "";
  errorDiv.textContent = "";
  loading.classList.remove("hidden");

  // Download all images in parallel
  Promise.all(imageUrls.map(downloadImage))
    .then(images => {
      loading.classList.add("hidden");

      images.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      loading.classList.add("hidden");
      errorDiv.textContent = err;
    });
}

// Button event
document.getElementById("startBtn").addEventListener("click", downloadImages);
