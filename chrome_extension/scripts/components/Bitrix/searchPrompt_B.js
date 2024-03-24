function handleSearch(input, prompts, selectedCategory) {
    const searchTerm = input.value.toLowerCase();
    let filteredPrompts = prompts.filter((prompt) => {
        const matchesCategory = selectedCategory === "all" || prompt.categories.includes(selectedCategory);
        const matchesSearchTerm = prompt.title.toLowerCase().includes(searchTerm) ||
                                  prompt.description.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearchTerm;
    });

    displayPrompts(filteredPrompts);
}
