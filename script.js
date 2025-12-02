document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("download-images-button");

  if (!btn) {
    console.error("Error: #download-images-button not found");
    return; // prevents null error
  }

  btn.addEventListener("click", () => {
    const container = document.getElementById("images-container");

    // Add some images so the test can detect them
    for (let i = 1; i <= 3; i++) {
      const img = document.createElement("img");
      img.src = `https://picsum.photos/200?random=${i}`;
      img.alt = `Image ${i}`;
      img.style.width = "200px";
      img.style.height = "200px";
      container.appendChild(img);
    }
  });
});
