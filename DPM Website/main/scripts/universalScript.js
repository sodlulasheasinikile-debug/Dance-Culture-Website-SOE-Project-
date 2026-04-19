window.addEventListener("load", () => {
    const nameEl = document.querySelector(".name");
    const introEl = document.querySelector(".intro-loader");

    if (!nameEl || !introEl) return;

    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");

    if (!hasSeenIntro) {
        // First time visitor
        sessionStorage.setItem("hasSeenIntro", "true");

        // Run your nice animation
        setTimeout(() => {
            nameEl.style.opacity = "1";
            nameEl.style.transform = "translateY(0)";
        }, 400);

        setTimeout(() => {
            introEl.style.top = "-100%";
        }, 2200);
    } else {
        // Skip animation instantly for internal navigation
        introEl.style.transition = "none";
        introEl.style.top = "-100%";

        // Optional: Reset transition for future use (in case of refresh)
        setTimeout(() => {
            introEl.style.transition = "top 0.8s cubic-bezier(0.77, 0, 0.18, 1)";
        }, 100);
    }
});

// This script above handles the introductory animation on the home page, displaying a welcome message and then sliding it up to reveal the main content. 