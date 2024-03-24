function handleSearch_C(
    input,
    prompts,
    selectedCategory,
    selectedModel
) {
    const searchTerm = input.value.toLowerCase();
    let filteredPrompts = prompts.filter((prompt) => {
        const matchesCategory =
            selectedCategory === "all" ||
            prompt.category.includes(selectedCategory);
        const matchesModel =
            selectedModel === "all" || prompt.model.includes(selectedModel);
        const matchesSearchTerm =
            prompt.title.toLowerCase().includes(searchTerm) ||
            prompt.description.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesModel && matchesSearchTerm;
    });

    displayPrompts_C(filteredPrompts);
}
