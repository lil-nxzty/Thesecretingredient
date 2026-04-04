const geti = (str) => document.getElementById(str);
let var1 = false;
window.addEventListener("keypress", (s) => {if(s.key === 'e') {var1 = true}});
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
            if (typeof text === "string" && charIndex < text.length && var1 === false) {
                const char = text[charIndex];
                const isPauseChar =
                    char === "?" ||
                    char === ";" ||
                    (
                        char === "." &&
                        (text[charIndex + 1] || text[charIndex - 2] || char) === "." &&
                        (text[charIndex + 2] || text[charIndex - 1] || char) === "."
                    );
                
                if (isPauseChar) {delay = 1000;};
                if (char === "." && text[charIndex + 1] === " ") {
                sound.volume = 0.5;
                sound.play();
                displayedText += ". \n"; // Im pretty sure there is a simpler way to do this by creating a variable or changing the char value but ill check it later
                geti("texti").innerText = displayedText;
                charIndex++;
                setTimeout(() => typeWriterStep(text), delay);
            }
                else {sound.currentTime = 0;
                sound.volume = 0.5;
                sound.play();
                displayedText += char;
                geti("texti").innerText = displayedText;
                charIndex++;
                setTimeout(() => typeWriterStep(text), delay);}
                
            } else if (var1 === true) {
                geti("texti").innerText = text;
                clearTimeout(timeoutID);
                showChoices.call(self);
                var1 = false;
            } else {
                clearTimeout(timeoutID);
                showChoices.call(self);
            }
        }
    }
}


function showChoices() {
    const choicesDiv = geti("choices");

    this.choices.forEach(choice => { // create a button for each choice in the current scene and execute the scene if the button is pressed
        const btn = document.createElement("button");
        btn.innerText = choice.text;

        btn.addEventListener("click", () => {
            pageManager(choice.next);
        });

        choicesDiv.appendChild(btn);
    });
}

// Create properties that are instances of the scene class
const Scenes = {
    stadium: new Scene(
        "scene1.jpg",
        "You are sitting in a stadium watching your cousin's baseball team play, his parents are never there; probably because his team is incredibly trash. A taiwanese american guy sits next to you. He says 'Keep your head facing straight or else they'll notice us'. Theres no one there except for your cousins team and the taiwanese american guy.",
        [
            { text: "Next", next: "accept" }
        ]
    ),

    death1: new Scene(
        "deth.png",
        "He beats you to death with a rubber chicken",
        [
            { text: "Play again", next: "stadium" }
        ]
),

    accept: new Scene(
        "scene1.jpg",
        "He passes you some documents; they are stained with a red liquid. It's ketchup. I went to great measure to keep this document in the same conditions as it was given to me, i hope you do the same. Now follow me.",
        [
            { text: "Follow him?", next: "follow" },
            { text: "Reject him?", next: "death1" }
        ]
),

    follow: new Scene(
            "black.png",
            "He knocks you unconscious...",
            [
                { text: "Next", next: "room" }
            ]
),

    room: new Scene(
        "mark.png",
        "You wake up in a room. You're tied to a chair. There's another guy also tied to a chair next to you. You ask him why you're here. He says: You're about to experience the adventure of your life. He then stands up and leaves.",
        [
            { text: "What the hecky?", next: "randomGuy" }
        ]
),

    randomGuy: new Scene(
        "kil.png",
        "He immediately gets shot. The taiwanese american  guy walks in. What was that guy doing in here? I didn't even tie him up.",
        [
            { text: "Next", next: "boso" }
        ]
),

    boso: new Scene(
        "boso.png",
        "The ceo of the mafia comes in. He says: 'I see you have met my associate, he's a nice guy. I hope you like him, but not too much.' He then proceeds to throw the random guy into a pit of hungry dogs. The dogs maul him to death.",
        [
            { text: "Next", next: "ceo" }
        ]
),

    ceo: new Scene(
        "ceo.jpg",
        "The ceo then says: 'I need you to do something for me. I need you to kill some mafia members from a rival gang. As they have ignored our treaty and are still selling laced noodles. 'What a stupid idea', You say. 'Which is our business.' He finishes.",
        [
            { text: "Accept", next: "accept2" },
            { text: "Reject and fight back", next: "escape" }
        ]
    ),
    accept2: new Scene(
        "aw.jpg",
        "You accept the offer. The taiwanese american guy gives you the details of the target.",
        [
            { text: "Next", next: "target1" }
        ]
    ),
    target1: new Scene(
        "target.png",
        "You find the targets and overhear their conversation. Male voice: 'Im so tired of the bribery and corruption in this city, we need to do something about it.' Female voice answers: 'Didn't you try to bribe a vending machine last wednesday? Male voice: 'It was negotiation.' Female voice: 'You ended up beating it up.' Male voice: 'It insulted the family name'",
        [
            { text: "Next", next: "target2" }
        ]
    ),
    target2: new Scene(
        "target2.png",
        "You decide that this conversation is too corny and ban both of them from life. They were wearing masks so you couldn't see their faces, the ceo asks you to check their faces to see if they were the right targets. To your surprise and horror, they were your cousins, parents.",
        [
            { text: "Next", next: "death2" }
        ]
    ),  
    death2: new Scene(
        "ha.png",
        "You die of shock and guilt",
        [
            { text: "Play again", next: "stadium" }
        ]
    ),
    escape: new Scene(
        "deathofastar.png",
        "An idea comes to your mind, but how will you do it?",
        [
            { text: "Run to the exit", next: "fight" },
            { text: "Fight the ceo", next: "fight" }
        ]
    ),

    fight: new Scene(
        "deathofastar.png",
        "You are no match for the ceo he kills you with his bare (soft) hands",
        [
        ]
    ),

};

// Inputs a property and renders the scene
function pageManager(property) {
    Scenes[property].render();
}

// As soon as page loads, it calls the stadiums scene
window.addEventListener("load", function () {
    pageManager("stadium");
});