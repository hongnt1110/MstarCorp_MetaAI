// Tạo một function để tạo card prompt
function createCardPrompt_C(card) {
    // Chuyển đổi chuỗi JSON thành mảng cho thuộc tính categories
    const categoriesArray = JSON.parse(card.categories);

    // Chuyển đổi chuỗi JSON thành mảng cho thuộc tính models (nếu models là chuỗi và có dạng "[value1, value2]")
    const modelsArray = JSON.parse(card.models);

    // Tạo một div cho mỗi card
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("prompt-box");
    cardDiv.id = card.id;

    // Tạo tiêu đề của card
    const cardTitle = document.createElement("div");
    cardTitle.classList.add("promptMainArea");
    cardTitle.textContent = card.title;

    // Tạo nội dung của card
    const cardText = document.createElement("div");
    cardText.classList.add("prompt-title");
    cardText.textContent = card.description;

    // Tạo div cho mỗi model
    const cardModel = document.createElement("div");
    cardModel.classList.add("prompt-model");

    // Kiểm tra xem models có phải là mảng không
    if (Array.isArray(modelsArray)) {
        modelsArray.forEach((model) => {
            // Tạo một phần tử cho mỗi giá trị trong mảng models
            const modelValue = document.createElement("div");
            modelValue.textContent = model;
            cardModel.appendChild(modelValue);
        });
    }

    // Thêm tiêu đề, nội dung và model vào card
    cardDiv.appendChild(cardTitle);
    cardDiv.appendChild(cardText);
    cardDiv.appendChild(cardModel);
    // Tạo phần phân loại của card
    const promptClassification = document.createElement("div");
    promptClassification.classList.add("text-xs", "prompt-classification");

    const tagsSection = document.createElement("div");
    tagsSection.className = "tags-section";

    if (card.categories) {
        categoriesArray.forEach((tag) => {
            const tagValue = document.createElement("div");
            tagValue.className = `tag-value ${getTagClass(tag)}`;
            tagValue.textContent = tag;
            tagsSection.appendChild(tagValue);
        });
    }

    promptClassification.append(tagsSection);
    cardDiv.appendChild(promptClassification);

    // Thêm sự kiện khi click vào card
    cardDiv.addEventListener("click", (event) => {
        const chatTextAreas = document.getElementsByTagName("textarea");
        const chatTextArea = chatTextAreas[0];
        chatTextArea.setAttribute("data-prompt", card.prompt);

        // Truyền title của card vào hàm handlePromptBoxClick
        handlePromptBoxClick(card.title);
    });

    function handlePromptBoxClick(cardTitle) {
        const promptTextarea = document.getElementById("drop-language");

        const dropdown = document.createElement("div");
        dropdown.className = "MetaAI-dropdown";
        dropdown.innerHTML = `<label>${cardTitle}</label>`;
        const closeIconSVG = document.createElement("div");
        closeIconSVG.innerHTML = `
        <svg class="w-3 h-3 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        `;
        closeIconSVG.className = "closeIcon";
        dropdown.appendChild(closeIconSVG);
        closeIconSVG.addEventListener("click", () => {
            // Xóa dropdown khi click vào closeIcon
            dropdown.parentNode.removeChild(dropdown);
            const textareaElement = document.getElementById('prompt-textarea');

            textareaElement.removeAttribute('data-prompt');
        });
        // Xóa tất cả các dropdown khác trước khi thêm mới
        const existingDropdowns = document.querySelectorAll(".MetaAI-dropdown");
        existingDropdowns.forEach((dropdown) => {
            dropdown.parentNode.removeChild(dropdown);
        });

        promptTextarea.parentNode.insertBefore(dropdown, promptTextarea);
    }
////////////////////////////////////////////

    // Trả về DOM element của card
    return cardDiv;
}
