document.addEventListener("DOMContentLoaded", () => {
    
    const userAgent = navigator.userAgent;
    let os = "Невідома ОС";
    let browser = "Невідомий браузер";

    if (userAgent.includes("Win")) os = "Windows";
    else if (userAgent.includes("Mac") && !userAgent.includes("iPhone")) os = "MacOS";
    else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) os = "iOS";
    else if (userAgent.includes("Android")) os = "Android";
    else if (userAgent.includes("Linux")) os = "Linux";

    if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) browser = "Chrome";
    else if (userAgent.includes("Firefox")) browser = "Firefox";
    else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) browser = "Safari";
    else if (userAgent.includes("Edg")) browser = "Edge";

    localStorage.setItem("userOS", os);
    localStorage.setItem("userBrowser", browser);

    const footer = document.querySelector("footer");
    const infoPara = document.createElement("p");
    infoPara.textContent = `Ваша ОС: ${localStorage.getItem("userOS")} | Ваш браузер: ${localStorage.getItem("userBrowser")}`;
    footer.appendChild(infoPara);

    fetch('https://jsonplaceholder.typicode.com/posts/11/comments')
        .then(response => response.json())
        .then(comments => {
            const container = document.getElementById("comments-container");
            comments.forEach(comment => {
                const commentDiv = document.createElement("div");
                commentDiv.style.borderBottom = "1px solid #ccc";
                commentDiv.style.marginBottom = "10px";
                commentDiv.style.paddingBottom = "10px";
                commentDiv.innerHTML = `
                    <strong>${comment.name}</strong> (${comment.email})
                    <p>${comment.body}</p>
                `;
                container.appendChild(commentDiv);
            });
        })
        .catch(error => console.error("Помилка завантаження коментарів:", error));

    const modal = document.getElementById("feedback-modal");
    const closeBtn = document.querySelector(".close-btn");

    setTimeout(() => {
        modal.style.display = "block";
    }, 60000);

    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    const currentHour = new Date().getHours();
    const isDayTime = currentHour >= 7 && currentHour < 21; 

    if (!isDayTime) {
        document.body.classList.add("dark-theme");
    }

    const themeToggleBtn = document.getElementById("theme-toggle");
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
    });
});