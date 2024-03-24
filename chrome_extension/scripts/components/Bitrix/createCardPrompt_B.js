// Tạo một function để tạo card prompt
function createCardPrompt(card) {
    // Chuyển đổi chuỗi JSON thành mảng cho thuộc tính categories
    const categoriesArray = JSON.parse(card.categories);

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

    // Thêm tiêu đề, nội dung và model vào card
    cardDiv.appendChild(cardTitle);
    cardDiv.appendChild(cardText);
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
    cardDiv.addEventListener("click", () => {
        const textareaLeftElement = document.querySelector(".bx-im-textarea__left");

        if (textareaLeftElement) {
            const chatTextAreas = textareaLeftElement.getElementsByTagName("textarea");
            const chatTextArea = chatTextAreas[0];
            let clonedChatTextArea = document.getElementById("MetaAI");

            if (clonedChatTextArea) {
                // If cloned textarea already exists, make it visible and focus on it
                clonedChatTextArea.style.display = "";
                clonedChatTextArea.focus();
            } else {
                // If cloned textarea doesn't exist, create it
                clonedChatTextArea = chatTextArea.cloneNode(true);
                chatTextArea.style.display = "none";
                clonedChatTextArea.classList.add("MetaAI");
                clonedChatTextArea.id = "MetaAI";
                textareaLeftElement.appendChild(clonedChatTextArea);
                clonedChatTextArea.focus();
            }

            chatTextArea.setAttribute("data-prompt", card.prompt);
            handlePromptBoxClick(card.title);
        }
    });

    function handlePromptBoxClick(cardTitle) {
        // Select the textarea with the specific class
        const promptTextarea = document.getElementById("drop-language-B");
        if (promptTextarea) {
            const dropdown = document.createElement("div");
            dropdown.id = "MetaAI-dropdown-B";
            dropdown.className = "MetaAI-dropdown-B";
            dropdown.innerHTML = `<label>${cardTitle}</label>`;
            const closeIconSVG = document.createElement("div");
            closeIconSVG.innerHTML = `
                <svg class="w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            `;
            closeIconSVG.className = "closeIcon-B";
            dropdown.appendChild(closeIconSVG);
            closeIconSVG.addEventListener("click", () => {
                // Xóa dropdown khi click vào closeIcon
                dropdown.parentNode.removeChild(dropdown);

                const textareaElement = document.querySelector('.bx-im-textarea__element');

                textareaElement.removeAttribute('data-prompt');
            });

            // Xóa tất cả các dropdown khác trước khi thêm mới
            const existingDropdowns =
                document.querySelectorAll(".MetaAI-dropdown-B");
            existingDropdowns.forEach((dropdown) => {
                dropdown.parentNode.removeChild(dropdown);
            });

            promptTextarea.parentNode.insertBefore(dropdown, promptTextarea);
        }
    }

    // Trả về DOM element của card
    return cardDiv;
}
