function filterCategoryPrompts(selectedCategory, prompts) {
    // Lọc prompts theo cả model và category và hiển thị lại
    const filteredPrompts = prompts.filter(
        (prompt) =>
            (selectedCategory === "all" || prompt.categories.includes(selectedCategory))
    );
    // Hiển thị lại prompts
    displayPrompts(filteredPrompts);
}
