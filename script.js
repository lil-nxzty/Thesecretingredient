const geti = (str) => document.getElementById(str);

// Scene class
class Scene {
    constructor(id, img, text, choices) {
        this.id = id;
        this.img = img;
        this.text = text;
        this.choices = choices;
    }

    render() {
        let displayedText = "";
        let charIndex = 0;
        let speed = 50;

        const self = this;

        geti("img").src = this.img;
        geti("texti").innerText = "";

        // clear buttons immediately
        const choicesDiv = geti("choices");
        choicesDiv.innerHTML = "";
        const timeoutID = setTimeout(() => typeWriterStep(self.text), speed);

        function typeWriterStep(text) {
            const sound = geti("typeSound");
            if (typeof text === "string" && charIndex < text.length) {
                displayedText += text[charIndex];
                const char = text[charIndex];
                const isPauseChar =
                    char === "?" ||
                    char === ";" ||
                    (
                        char === "." &&
                        text[charIndex + 1] === "." &&
                        text[charIndex + 2] === "."
                    );
                    
                if (isPauseChar) {let speed = 80};
                geti("texti").innerText = displayedText;

                if (charIndex % 2 === 0) {
                    sound.currentTime = 0;
                    sound.play();
                }

                charIndex++;
            } else {
                clearTimeout(timeoutID);
                showChoices.call(self); // correct context
            }
        }
    }
}

function showChoices() {
    const choicesDiv = geti("choices");

    this.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.innerText = choice.text;

        btn.addEventListener("click", () => {
            pageManager(choice.next);
        });

        choicesDiv.appendChild(btn);
    });
}

// Scenes
const Scenes = {
    stadium: new Scene(
        "stadium",
        "scene1.jpg",
        "You are sitting in a stadium watching your cousin's baseball team play; They are incredibly trash",
        [
            { text: "Reject the informal invitation", next: "stadium1" },
            { text: "Duck", next: "follow" }
        ]
    ),

    stadium1: new Scene(
        "stadium1",
        "scene1.jpg",
        "You catch the ball! The crowd goes wild.",
        [
            { text: "Celebrate", next: "die" }
        ]
    ),

    die: new Scene(
        "die",
        "scene3.jpg",
        "You duck, and someone behind you gets hit.",
        []
    ),

    follow: new Scene(
        "follow",
        "scene4.jpg",
        "The game continues...",
        []
    )
};

// Scene loader
function pageManager(property) {
    Scenes[property].render();
}

// Start game
window.addEventListener("load", function () {
    pageManager("stadium");
});