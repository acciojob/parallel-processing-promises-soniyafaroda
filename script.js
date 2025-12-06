const imageUrls = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/id/238/200/300",
  "https://picsum.photos/id/239/200/300"
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

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
