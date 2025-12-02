window.addEventListener("load", () => {

    const output = document.getElementById("output");
    const loading = document.getElementById("loading");
    const errorDiv = document.getElementById("error");
    const btn = document.getElementById("btn");

    // If Cypress HTML does NOT contain #btn → prevent crash
    if (!btn) return;

    const imageUrls = [
        "./images/img1.jpg",
        "./images/img2.jpg",
        "./images/img3.jpg"
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
        output.innerHTML = "";
        errorDiv.textContent = "";
        loading.style.display = "block";

        try {
            const promises = imageUrls.map(url => downloadImage(url));
            const images = await Promise.all(promises);

            loading.style.display = "none";

            images.forEach(img => output.appendChild(img));

        } catch (err) {
            loading.style.display = "none";
            errorDiv.textContent = err;
        }
    }

    btn.addEventListener("click", downloadImages);
});
