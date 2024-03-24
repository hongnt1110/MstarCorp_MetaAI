function displayPrompts_C(filteredPrompts) {
    // Xóa tất cả các prompts hiện tại
    const promptContainer = document.querySelector(".prompt-container");
    promptContainer.innerHTML = "";

    // Hiển thị lại các prompts đã lọc
    filteredPrompts.forEach((card) => {
        const cardDiv = createCardPrompt_C(card);
        promptContainer.appendChild(cardDiv);
    });
}
