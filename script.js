const imageUrls = [
  "https://picsum.photos/200?random=1",
  "https://picsum.photos/200?random=2",
  "https://picsum.photos/200?random=3"
];

// Download single image (returns a Promise)
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

// Main download function
function downloadImages() {
  const loadingDiv = document.getElementById("loading");
  const outputDiv = document.getElementById("output");
  const errorDiv = document.getElementById("error");

  outputDiv.innerHTML = "";
  errorDiv.innerHTML = "";

  loadingDiv.style.display = "block";

  Promise.all(imageUrls.map(url => downloadImage(url)))
    .then(images => {
      loadingDiv.style.display = "none";

      images.forEach(img => {
        outputDiv.appendChild(img);
      });
    })
    .catch(err => {
      loadingDiv.style.display = "none";
      errorDiv.textContent = err;
    });
}

document
  .getElementById("download-images-button")
  .addEventListener("click", downloadImages);
