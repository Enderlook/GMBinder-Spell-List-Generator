let sort = document.getElementById("sort");

sort.addEventListener("click", () => {
    writeToText(text.value.split(/#### ?/).sort().join("#### "));
});