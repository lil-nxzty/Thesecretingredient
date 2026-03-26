const geti = (str) => document.getElementById(str);

// Scene class
class Scene {
    constructor(img, text, choices) {
        this.img = img;
        this.text = text;
        this.choices = choices;
    }

    render() {
        // Set image and text
        geti("img").src = this.img;
        geti("texti").innerText = this.text;

        // Get choices container
        const choicesDiv = geti("choices");
        choicesDiv.innerHTML = "";

        // Create buttons for each choice
        this.choices.forEach(choice => {
            const btn = document.createElement("button");
            btn.innerText = choice.text;

            btn.addEventListener("click", () => {
                pageManager(choice.next);
            });

            choicesDiv.appendChild(btn);
        });
    }
}

// All scenes
const scenes = [

    new Scene(
        "scene1.jpg",
        "You are sitting in a stadium watching your cousin's baseball team play; they are incredibly bad.",
        [
            { text: "Catch the ball", next: 1 },
            { text: "Duck", next: 2 }
        ]
    ),

    new Scene(
        "scene2.jpg",
        "You catch the ball! The crowd goes wild.",
        [
            { text: "Celebrate", next: 3 }
        ]
    ),

    new Scene(
        "scene3.jpg",
        "You duck, and someone behind you gets hit.",
        [
            { text: "Apologize", next: 3 }
        ]
    ),

    new Scene(
        "scene4.jpg",
        "The game continues...",
        []
    )

];

// Scene loader
function pageManager(n) {
    scenes[n].render();
}

// Start game when page loads
window.addEventListener("load", function() {
    pageManager(0);
});