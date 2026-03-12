const llama = function(str) {return document.getElementById(str)};
window.addEventListener("load", function() {pageManager(0)});
function pageManager(n) {
    if(n===0) {
        llama("img").src = "scene1.jpg";
        llama("texti").innerText = "You are sitting in a stadium watching your cousins baseball game; they are incredibly trash.";
    }
    else if(n===1) {
        console.log(1);
    };
};
