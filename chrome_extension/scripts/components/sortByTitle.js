async function sortBySelect(filterCategory, filterModel) {
    chrome.storage.local.get(["prompts", "categories"], function (result) {
        const cardPrompts = result.prompts;

        let sortedPrompts = [...cardPrompts];

        // Áp dụng filter category và filter model
        sortedPrompts = sortedPrompts.filter((prompt) => {
            return (
                (filterCategory === "all" ||
                    prompt.category.includes(filterCategory)) &&
                (filterModel === "all" || prompt.model.includes(filterModel))
            );
        });

        // Sắp xếp theo thứ tự chữ cái ABC của title
        sortedPrompts.sort((a, b) =>
            a.title.localeCompare(b.title, "vi", { sensitivity: "base" })
        );

        // Gọi hàm để hiển thị danh sách đã sắp xếp
        displayPrompts(sortedPrompts);
    });
}
