function filterModelPrompts(selectedModel, selectedCategory, prompts) {
    // Lọc prompts theo cả model và category và hiển thị lại
    const filteredPrompts = prompts.filter(
        (prompt) =>
            (selectedModel === "all" ||
                prompt.models.includes(selectedModel)) &&
            (selectedCategory === "all" ||
                prompt.categories.includes(selectedCategory))
    );
    // Hiển thị lại prompts
    displayPrompts_C(filteredPrompts);
}
