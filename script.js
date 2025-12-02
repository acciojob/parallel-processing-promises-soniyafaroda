document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const btn = document.getElementById("process");

  if (!output) {
    console.error("div#output NOT FOUND");
    return;
  }

  btn.addEventListener("click", () => {
    output.textContent = "Processing completed!";
  });
});
