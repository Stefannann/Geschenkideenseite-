const giftIdeas = [
    {
        title: "Personalisierte Sternenkarte",
        description: "Zeigt den Sternenhimmel eines besonderen Moments – perfekt für romantische Anlässe.",
        recipient: ["partner", "freund", "familie"],
        interest: ["kreativ", "wellness"],
        budget: "mittel",
        link: "https://www.etsy.com/"
    },
    {
        title: "Barista-Workshop",
        description: "Lernt gemeinsam Latte Art und Spezialitätenkaffee zuzubereiten.",
        recipient: ["partner", "freund", "kollege"],
        interest: ["kulinarik", "erlebnis"],
        budget: "premium",
        link: "https://www.mydays.de/"
    },
    {
        title: "Mini-Indoor-Garten",
        description: "Ein stylisches Kräutergarten-Set für die Küche – ideal für Foodies.",
        recipient: ["partner", "freund", "familie"],
        interest: ["kulinarik", "kreativ"],
        budget: "mittel",
        link: "https://www.manufactum.de/"
    },
    {
        title: "Erlebnisbox Abenteuer",
        description: "Gutschein für Bungee-Jumping, Fallschirmsprung oder andere Adrenalinkicks.",
        recipient: ["freund", "kollege"],
        interest: ["erlebnis"],
        budget: "premium",
        link: "https://www.jochen-schweizer.de/"
    },
    {
        title: "Selfcare Spa Set",
        description: "Ein luxuriöses Wellness-Paket mit natürlichen Pflegeprodukten.",
        recipient: ["partner", "freund", "familie"],
        interest: ["wellness"],
        budget: "mittel",
        link: "https://www.avocadostore.de/"
    },
    {
        title: "DIY Fotobuch",
        description: "Gestalte ein hochwertiges Fotobuch voller gemeinsamer Erinnerungen.",
        recipient: ["partner", "familie"],
        interest: ["kreativ"],
        budget: "günstig",
        link: "https://www.cewe.de/"
    },
    {
        title: "Technik-Gadget Box",
        description: "Überraschungsbox mit smarten Gadgets und cleveren Tools.",
        recipient: ["freund", "kollege"],
        interest: ["technik"],
        budget: "mittel",
        link: "https://www.getdigital.de/"
    },
    {
        title: "Kinder-Entdecker-Abo",
        description: "Monatliche Box mit Experimenten und Spielen zum Forschen.",
        recipient: ["kind"],
        interest: ["kreativ", "technik"],
        budget: "mittel",
        link: "https://www.littleexperts.de/"
    },
    {
        title: "Stilvolle Bento-Lunchbox",
        description: "Nachhaltige Box für Mealprep-Fans – schön und praktisch.",
        recipient: ["kollege", "freund", "familie"],
        interest: ["kulinarik"],
        budget: "günstig",
        link: "https://www.monbento.de/"
    },
    {
        title: "Meditations-App Jahresabo",
        description: "Entspannung zum Verschenken mit geführten Sessions und Schlafsounds.",
        recipient: ["partner", "freund", "familie", "kollege"],
        interest: ["wellness"],
        budget: "günstig",
        link: "https://www.calm.com/"
    },
    {
        title: "Escape-Room für Zuhause",
        description: "Kniffliges Rätselspiel, das Teamgeist fördert und Spaß macht.",
        recipient: ["freund", "familie"],
        interest: ["erlebnis", "kreativ"],
        budget: "günstig",
        link: "https://www.kosmos.de/"
    },
    {
        title: "Handgefertigte Pralinenbox",
        description: "Feinste Schokolade aus einer lokalen Manufaktur.",
        recipient: ["partner", "freund", "familie"],
        interest: ["kulinarik"],
        budget: "günstig",
        link: "https://www.aroundcoco.com/"
    },
    {
        title: "Schnupperkurs Keramik",
        description: "Lerne Töpfern und nimm ein individuelles Stück mit nach Hause.",
        recipient: ["partner", "freund", "familie"],
        interest: ["kreativ", "wellness"],
        budget: "mittel",
        link: "https://www.mein-kurs.de/"
    },
    {
        title: "Smart Garden Sensor",
        description: "Überwacht Pflanzen automatisch und sendet Pflegehinweise aufs Handy.",
        recipient: ["freund", "kollege", "familie"],
        interest: ["technik", "kreativ"],
        budget: "premium",
        link: "https://www.clickandgrow.com/"
    }
];

const recipientSelect = document.getElementById("recipient");
const interestSelect = document.getElementById("interest");
const budgetRadios = document.querySelectorAll("input[name='budget']");
const suggestButton = document.getElementById("suggest-button");
const randomButton = document.getElementById("random-button");
const giftList = document.getElementById("gift-list");
const resultCount = document.getElementById("result-count");

function getSelectedBudget() {
    const checked = Array.from(budgetRadios).find(radio => radio.checked);
    return checked ? checked.value : "";
}

function filterGifts() {
    const selectedRecipient = recipientSelect.value;
    const selectedInterest = interestSelect.value;
    const selectedBudget = getSelectedBudget();

    const filtered = giftIdeas.filter(gift => {
        const recipientMatch = !selectedRecipient || gift.recipient.includes(selectedRecipient);
        const interestMatch = !selectedInterest || gift.interest.includes(selectedInterest);
        const budgetMatch = !selectedBudget || gift.budget === selectedBudget;
        return recipientMatch && interestMatch && budgetMatch;
    });

    renderGifts(filtered);
}

function getRandomGifts(amount = 3) {
    const shuffled = [...giftIdeas].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, amount);
}

function renderGifts(gifts) {
    giftList.innerHTML = "";

    if (gifts.length === 0) {
        const emptyState = document.createElement("div");
        emptyState.className = "empty-state";
        emptyState.innerHTML = `
            <p>Keine Treffer für diese Kombination. Probiere andere Filter oder lass dich überraschen!</p>
        `;
        giftList.appendChild(emptyState);
        resultCount.textContent = "Leider nichts gefunden.";
        return;
    }

    const fragment = document.createDocumentFragment();

    gifts.forEach(gift => {
        const card = document.createElement("article");
        card.className = "gift-card";
        card.innerHTML = `
            <h3>${gift.title}</h3>
            <p>${gift.description}</p>
            <span>Budget: ${formatBudget(gift.budget)}</span>
            <a href="${gift.link}" target="_blank" rel="noopener noreferrer">Zum Anbieter</a>
        `;
        fragment.appendChild(card);
    });

    giftList.appendChild(fragment);
    resultCount.textContent = gifts.length === 1
        ? "1 Idee gefunden"
        : `${gifts.length} Ideen gefunden`;
}

function formatBudget(budget) {
    switch (budget) {
        case "günstig":
            return "bis 25 €";
        case "mittel":
            return "25 – 75 €";
        case "premium":
            return "über 75 €";
        default:
            return "flexibel";
    }
}

suggestButton.addEventListener("click", () => {
    filterGifts();
});

randomButton.addEventListener("click", () => {
    const randomGifts = getRandomGifts();
    renderGifts(randomGifts);
    resultCount.textContent = "Unsere Überraschungs-Tipps";
    recipientSelect.value = "";
    interestSelect.value = "";
    budgetRadios[0].checked = true;
});

// Erste Inspiration anzeigen
renderGifts(getRandomGifts());
resultCount.textContent = "Drei zufällige Empfehlungen zum Start";
