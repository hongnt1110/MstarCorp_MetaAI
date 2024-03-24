function displayPrompts(filteredPrompts) {
    // Xóa tất cả các prompts hiện tại
    const promptContainer = document.querySelector(".prompt-container");
    promptContainer.innerHTML = "";

    // Hiển thị lại các prompts đã lọc
    filteredPrompts.forEach((card) => {
        const cardDiv = createCardPrompt(card);
        promptContainer.appendChild(cardDiv);
    });
}
