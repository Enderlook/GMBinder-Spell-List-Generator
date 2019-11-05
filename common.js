let text = document.getElementById("text");

let clean = document.getElementById("clean");

function writeToText(input) {
    text.value = input;
    text.select();
    document.execCommand("copy");
}

clean.addEventListener("click", () => {
    text.value = "";
    errors.setAttribute("hidden", true);
    errorsList.innerHTML = "";
});