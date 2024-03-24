async function fetchData() {
    try {
        const response = await fetch(
            "https://api.maychu.dev/MstarCorp2/public/api/prompts/list"
        );
        const data = await response.json();
        const datas = chrome.storage.local.set({ prompts: data["data"] });
        console.log(datas);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function fetchModels() {
    try {
        const response = await fetch(
            "https://api.maychu.dev/MstarCorp2/public/api/models/list"
        );
        const data = await response.json();
        chrome.storage.local.set({ models: data["data"] });
    } catch (error) {
        console.error("Error:", error);
    }
}

async function fetchCategories() {
    try {
        const response = await fetch(
            "https://api.maychu.dev/MstarCorp2/public/api/categories/list"
        );
        const data = await response.json();
        chrome.storage.local.set({ categories: data["data"] });
    } catch (error) {
        console.error("Error:", error);
    }
}

fetchData();
fetchModels();
fetchCategories();
