document.addEventListener("DOMContentLoaded", () => {

    const imageUrls = [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/200",
        "https://invalid-url.com/404" // test broken URL
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

        // Reset display areas
        output.innerHTML = "";
        errorDiv.textContent = "";
        loading.style.display = "block";

        try {
            const imagePromises = imageUrls.map(url => downloadImage(url));

            const images = await Promise.all(imagePromises);

            loading.style.display = "none";

            images.forEach(img => output.appendChild(img));

        } catch (err) {
            loading.style.display = "none";
            errorDiv.textContent = err;
        }
    }

    // SAFE — Only runs after DOM exists
    document.getElementById("btn").addEventListener("click", downloadImages);

});
