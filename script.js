const geti = (str) => document.getElementById(str);

class Scene {
    constructor(img, text, choices) {
        this.img = img;
        this.text = text;
        this.choices = choices;
    }

    render() {
        let displayedText = "";
        let charIndex = 0;
        let speed = 100;

        const self = this;

        geti("img").src = this.img;
        geti("texti").innerText = "";

        // clear buttons immediately
        const choicesDiv = geti("choices");
        choicesDiv.innerHTML = "";
        const timeoutID = setTimeout(() => typeWriterStep(self.text), speed);

        function typeWriterStep(text) {
            const sound = geti("typeSound");
            let delay = speed;
            if (typeof text === "string" && charIndex < text.length) {
                const char = text[charIndex];
                const isPauseChar =
                    char === "?" ||
                    char === ";" ||
                    (
                        char === "." &&
                        (text[charIndex + 1] || text[charIndex - 1]) === "." &&
                        (text[charIndex + 2] || text[charIndex - 2]) === "."
                    );
                
                if (isPauseChar) {delay = 500;};
                sound.currentTime = 0;
                sound.volume = 0.5;
                sound.play();
                displayedText += char;
                geti("texti").innerText = displayedText;
                charIndex++;
                setTimeout(() => typeWriterStep(text), delay);
            } else {
                clearTimeout(timeoutID);
                showChoices.call(self);
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
        "scene1.jpg",
        "You are sitting in a stadium watching your cousin's baseball team play; They are incredibly trash",
        [
            { text: "Reject the informal invitation", next: "stadium1" },
            { text: "Duck", next: "follow" }
        ]
    ),

    stadium1: new Scene(
        "scene1.jpg",
        "You catch the ball! The crowd goes wild.",
        [
            { text: "Celebrate", next: "die" }
        ]
    ),

    die: new Scene(
        "scene3.jpg",
        "You duck, and someone behind you gets hit.",
        []
    ),

    follow: new Scene(
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