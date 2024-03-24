const observer = new MutationObserver(async function (mutations, me) {
    var hostname = window.location.hostname;
    const mainScreenElements = document.querySelector(
        ".flex.h-full.flex-col.items-center.justify-center"
    );
    const mainScreenElementsBitrix = document.querySelector(
        ".bx-im-dialog-chat__scroll-container"
    );
    switch (true) {
        case hostname.indexOf("chat.openai.") >= 0:
            if (mainScreenElements) {
                // Stop the observer
                me.disconnect();
                // dropdownActPromts();

                // Call the function to create card prompts
                await createCardPrompts(mainScreenElements);
            }
            break;
        case hostname.indexOf(".bitrix24.") >= 0:
            if (
                mainScreenElementsBitrix &&
                !document.getElementById("green-button-container")
            ) {
                await createButtonBitrix24(mainScreenElementsBitrix);
                me.disconnect(); // Ngừng quan sát sau khi tạo nút
            }
            break;
        default:
            break;
    }
});

// Start observing
observer.observe(document, {
    childList: true,
    subtree: true,
});

const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback.apply(null, args);
        }, wait);
    };
};
//-------------Bitrix24------------ //
async function createButtonBitrix24() {
    // Create a container div
    const container = document.createElement("div");
    container.setAttribute("id", "green-button-container");

    //create a rectangle div
    const rectangle = document.createElement("div");
    rectangle.setAttribute("id", "rectangle-introduce");

    const titleRectangle = document.createElement("p");
    titleRectangle.setAttribute("id", "title-rectangle");
    titleRectangle.textContent = "Xin chào! Tôi là Meta AI";

    const scriptIntro = document.createElement("p");
    scriptIntro.setAttribute("id", "script-intro");
    scriptIntro.textContent =
        "Tôi sẽ hỗ trợ bạn X10 hiệu suất công việc bằng những gợi ý có sẵn để bạn sử dụng AI một cách tối ưu nhất cho công việc.";

    const clickSeeDetail = document.createElement("p");
    clickSeeDetail.setAttribute("id", "click-see-detail");
    clickSeeDetail.textContent = "Bấm vào tôi để xem chi tiết >>";

    rectangle.appendChild(titleRectangle);
    rectangle.appendChild(scriptIntro);
    rectangle.appendChild(clickSeeDetail);
    container.appendChild(rectangle);

    // Create the green circular button
    const buttonLogo = document.createElement("img");
    buttonLogo.src =
        "https://s3-alpha-sig.figma.com/img/b1b7/e437/3a7c0a4f4cd7aa9b06a4c8fb810eb66b?Expires=1704067200&Signature=A2-2A-irZpLeD5xbCie13dLUCyNWXUJ0dHYOLh5WPhkVSovmS68HHN0pTcw-NVx5l7jTBXKPBDQfwS0fYup-IMSDg8vMWgwA30VULnM5ETkGu0FwR3wKsAvCsxPSd~yezbQhcbbUhPP~NS~6OTNiK4NDQgDyvVsj4NSpJxEvFKGZwkvfPRfat~tSbpIYUrnYjvaqoQwUx0jnaxds6AquEZ6yifftqAzgd0v6D3FB18IvMPcKfBsD~n1Tc3ZtWeFsDnFljFtkS4jDAxCAAU2RiK1BTX6hWJwDpYdjc6AsqHEc8e5YLrGvjRYv1DuqWc39zThSnFP6jq0E3RuG6aRkcQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";
    buttonLogo.alt = "LogoMetaAI";
    buttonLogo.classList.add("logo-metaAI");

    // Append the button to the container
    container.appendChild(buttonLogo);

    // Append the container to the body of the page
    document.body.appendChild(container);
    // Lấy ra các phần tử cần ẩn đi
    const title_Rectangle = document.getElementById("title-rectangle");
    const script_Intro = document.getElementById("script-intro");
    const click_SeeDetail = document.getElementById("click-see-detail");
    const button_Logo = document.querySelector(".logo-metaAI");

    // Lắng nghe sự kiện click trên buttonLogo
    button_Logo.addEventListener("click", async function () {
        // Ẩn các phần tử
        title_Rectangle.style.display = "none";
        script_Intro.style.display = "none";
        click_SeeDetail.style.display = "none";

        const mainScreenElement = document.querySelector(
            ".bx-im-dialog-chat__scroll-container"
        );
        if (document.getElementById("MetaAI-dropdown-B")) {
            document.getElementById("MetaAI-dropdown-B").remove();
        }
        if (document.getElementById("drop-language-B")) {
            document.getElementById("drop-language-B").remove();
        }
        if (document.getElementById("container-content-B")) {
            document.getElementById("container-content-B").remove();
        } else {
            // Xóa đi đoạn mã trước đó nếu tồn tại
            const containerB = document.getElementById("container-content-B");
            if (containerB) {
                containerB.remove();
            }
            // Thực thi đoạn mã khi click vào buttonLogo
            await executeAfterButtonClick(mainScreenElement);
        }
        const textareaLeftElement = document.querySelector(
            ".bx-im-textarea__left"
        );

        if (textareaLeftElement) {
            const chatTextAreas =
                textareaLeftElement.getElementsByTagName("textarea");
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
            chatTextArea.setAttribute("data-prompt", "");
        }
    });
}

function containsForbiddenWords(value) {
    return forbiddenWords.some((word) =>
        value.toLowerCase().includes(word.toLowerCase())
    );
}

function updateUI(target) {
    const containsForbiddenWord = containsForbiddenWords(target.value);
    const sendButton = target.nextElementSibling;
    const parentDiv = target.parentElement;

    if (containsForbiddenWord) {
        sendButton.disabled = true;
        parentDiv.classList.add("forbidden-div");
    } else {
        sendButton.disabled = false;
        parentDiv.classList.remove("forbidden-div");
    }
}

//////////////////////////////////////////////////////
document.addEventListener(
    "keydown",
    (e) => {
        const textareaLeftElement = document.querySelector(
            ".bx-im-textarea__left"
        );

        if (e.target.id === "prompt-textarea" && e.key === "Enter") {
            handleOpenAiTextArea(e);
        } else if (
            e.target.className === "bx-im-textarea__element MetaAI" &&
            e.key === "Enter"
        ) {
            handleMetaAITextarea(e, textareaLeftElement);
        }
    },
    true
);

function handleOpenAiTextArea(e) {
    const chatTextAreas = document.getElementsByTagName("textarea");
    const chatTextArea = chatTextAreas[0];
    const dataPrompt = chatTextArea.getAttribute("data-prompt");
    const selectLanguage = document.getElementById("languageSelect");
    const languageValue =
        selectLanguage.options[selectLanguage.selectedIndex].text;
    if (dataPrompt) {
        const changeLanguage = dataPrompt.replace(
            /\[Language\]/g,
            languageValue
        );
        const dataPrompts = changeLanguage.replace(
            "[Context]",
            chatTextArea.value
        );
        chatTextArea.value = dataPrompts;
        chatTextArea.focus();
    } else {
        chatTextArea.value =
            chatTextArea.value + " \nPlease respone by " + languageValue;
        chatTextArea.focus();
    }
    e.preventDefault();
    const textareaElement = document.getElementById('prompt-textarea');

    textareaElement.removeAttribute('data-prompt');
    if (document.querySelector(".MetaAI-dropdown")) {
        document.querySelector(".MetaAI-dropdown").remove();
    }
    if (document.getElementById("drop-language")) {
        document.getElementById("drop-language").remove();
    }
}

function handleMetaAITextarea(e, textareaLeftElement) {
    const chatTextArea = getFirstTextarea(textareaLeftElement);
    const chatTextAreaBitrix24 = getSeccondTextarea(textareaLeftElement);
    const dataPrompt = chatTextArea.getAttribute("data-prompt");

    const selectLanguages = document.getElementById("languageSelect");
    const languageValues =
        selectLanguages.options[selectLanguages.selectedIndex].text;
    const buttons = document.querySelector(
        ".bx-im-send-panel__button_container"
    );

    if (dataPrompt) {
        const changeLanguages = dataPrompt.replace(
            /\[Language\]/g,
            languageValues
        );
        const dataPrompts = changeLanguages.replace(
            "[Context]",
            chatTextAreaBitrix24.value
        );
        let event = new Event("input", {
            bubbles: true,
            cancelable: true,
        });
        chatTextArea.value = dataPrompts;
        chatTextAreaBitrix24.remove();
        document.getElementById("container-content-B").remove();
        document.getElementById("MetaAI-dropdown-B").remove();
        chatTextArea.style.display = "block";
        chatTextArea.focus();
        // Kích hoạt sự kiện
        chatTextArea.dispatchEvent(event);
        buttons.click();
        document.getElementById("drop-language-B").remove();
    } else {
        let event = new Event("input", {
            bubbles: true,
            cancelable: true,
        });
        chatTextArea.value =
            chatTextAreaBitrix24.value +
            " \nPlease respone by " +
            languageValues;
        chatTextAreaBitrix24.remove();
        document.getElementById("container-content-B").remove();
        document.getElementById("drop-language-B").remove();
        chatTextArea.style.display = "block";
        chatTextArea.focus();
        // Kích hoạt sự kiện
        chatTextArea.dispatchEvent(event);
        buttons.click();
        document.getElementById("drop-language-B").remove();
    }

    e.preventDefault();
}

function getFirstTextarea(element = document) {
    const chatTextAreas = element.getElementsByTagName("textarea");
    return chatTextAreas[0];
}

function getSeccondTextarea(element = document) {
    const chatTextAreas = element.getElementsByTagName("textarea");
    return chatTextAreas[1];
}

//////////////////////////////////////////////////////

async function createCardPrompts(mainScreenElement) {
    chrome.storage.local.get(
        ["prompts", "categories", "models"],
        function (result) {
            // Fetch data asynchronously
            let cardPrompts = result.prompts;
            let cardCategories = result.categories;
            let cardModels = result.models;

            const containerContent = document.createElement("div");
            containerContent.setAttribute("id", "container-content-C");
            mainScreenElement.parentNode.prepend(containerContent);
            containerContent.style.marginTop = "2%";

            const titleText = document.createElement("h1");
            titleText.textContent = "Meta AI: Prompts for chatGPT";
            containerContent.appendChild(titleText);
            titleText.classList.add("gradient-text");

            const promptContainer = document.createElement("div");
            promptContainer.className = "prompt-container";

            //Container Filter
            const containerFilter = document.createElement("div");
            containerFilter.className = "container-filter-C";
            containerContent.appendChild(containerFilter);

            //Category
            const containerFilterCategory = document.createElement("div");
            containerFilterCategory.className = "categoryFilter";
            containerFilterCategory.style.marginRight = "30px";
            containerFilter.appendChild(containerFilterCategory);

            const titleTopic = document.createElement("lable");
            titleTopic.textContent = "Chọn chủ đề";
            titleTopic.className = "title";
            containerFilterCategory.appendChild(titleTopic);

            // Create a filter category dropdown
            const filterCategory = document.createElement("select");
            filterCategory.id = "categoryFilter-C";
            filterCategory.addEventListener("change", () => {
                const selectedCategory = filterCategory.value;
                // filterCategoryPrompts(selectedCategory, cardPrompts);
            });

            const allOption = document.createElement("option");
            allOption.value = "all";
            allOption.textContent = "Tất cả chủ đề";
            filterCategory.appendChild(allOption);

            // Remove duplicates and preserve order
            function uniqueCategoriesWithOrder(array) {
                let seen = {};
                return array.filter((item) => {
                    return seen.hasOwnProperty(item)
                        ? false
                        : (seen[item] = true);
                });
            }
            // Extract unique categories from cardPrompts
            const categories = uniqueCategoriesWithOrder(
                cardCategories.map((card) => card.name)
            );

            filterCategory.addEventListener("change", () => {
                const selectedCategory = filterCategory.value;
                const selectedModel = filterModel.value; // Lấy giá trị hiện tại của dropdown "model"
                filterModelPrompts(
                    selectedModel,
                    selectedCategory,
                    cardPrompts
                );
            });

            // Create options for each category
            categories.forEach((category) => {
                const option = document.createElement("option");
                option.value = category;
                option.textContent = category;
                filterCategory.appendChild(option);
            });
            containerFilterCategory.appendChild(filterCategory);

            //Model
            const containerFilterModel = document.createElement("div");
            containerFilterModel.className = "categoryModel";
            containerFilterModel.style.marginRight = "30px";
            containerFilter.appendChild(containerFilterModel);

            const titleTopicModel = document.createElement("lable");
            titleTopicModel.textContent = "Chọn mô hình";
            titleTopicModel.className = "title";
            containerFilterModel.appendChild(titleTopicModel);

            const filterModel = document.createElement("select");
            filterModel.id = "modelFilter-C";

            // Add default option
            const defaultModelOption = document.createElement("option");
            defaultModelOption.value = "all";
            defaultModelOption.textContent = "All Models";
            filterModel.appendChild(defaultModelOption);

            // Extract unique models from cardPrompts
            const models = uniqueCategoriesWithOrder(
                cardModels.map((card) => card.name).flat()
            );

            // Create options for each model
            models.forEach((model) => {
                const option = document.createElement("option");
                option.value = model;
                option.textContent = model;
                filterModel.appendChild(option);
            });

            filterModel.addEventListener("change", () => {
                const selectedModel = filterModel.value;
                const selectedCategory = filterCategory.value; // Lấy giá trị hiện tại của dropdown "category"
                filterModelPrompts(
                    selectedModel,
                    selectedCategory,
                    cardPrompts
                );
            });

            containerFilterModel.appendChild(filterModel);

            //Search
            const containerSearchInput = document.createElement("div");
            containerSearchInput.className = "Search-Input-C";
            containerFilter.appendChild(containerSearchInput);

            //label
            const titleSearch = document.createElement("label");
            titleSearch.textContent = "Tìm kiếm nhanh";
            titleSearch.className = "title";
            containerSearchInput.appendChild(titleSearch);

            // Add search box
            const searchBox = document.createElement("div");
            containerSearchInput.appendChild(searchBox);
            searchBox.style.backgroundColor = "#F2F2F2";
            searchBox.classList.add("search-box");

            const searchInput = document.createElement("input");
            searchInput.type = "text";
            searchInput.id = "promptSearchInput-C";
            searchInput.placeholder = "Nội dung bạn muốn tìm...";
            searchInput.addEventListener("input", () => {
                const selectedCategory = filterCategory.value;
                const selectedModel = filterModel.value;
                handleSearch_C(
                    searchInput,
                    cardPrompts,
                    selectedCategory,
                    selectedModel
                );
            });

            const categoryFilterElement =
                document.getElementById("categoryFilter-C");
            // Insert a search box into the website
            searchBox.appendChild(searchInput);

            const searchIconSVG = document.createElement("div");
            searchIconSVG.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; ">
            <path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path>
        </svg>
    `;
            searchIconSVG.className = "Icon-search-C";
            searchBox.appendChild(searchIconSVG);

            cardPrompts.forEach((card) => {
                const cardDiv = createCardPrompt_C(card);
                promptContainer.appendChild(cardDiv);
            });

            containerContent.appendChild(promptContainer);

            ////// DropLanguages
            const languages = [
                { value: "vi", text: "Tiếng Việt" },
                { value: "en", text: "English" },
                { value: "fr", text: "Français" },
                { value: "ja", text: "日本語" },
                { value: "zh", text: "中文" },
                { value: "ko", text: "한국어" },
            ];
            const dropLanguage = document.createElement("div");
            dropLanguage.id = "drop-language";

            const titleDropLanguage = document.createElement("label");
            titleDropLanguage.className = "title-drop-language";
            titleDropLanguage.textContent = "Đầu ra";

            dropLanguage.appendChild(titleDropLanguage);

            const listdropLanguage = document.createElement("select");
            listdropLanguage.id = "languageSelect";

            languages.forEach(function (language) {
                const option = document.createElement("option");
                option.value = language.value;
                option.text = language.text;
                listdropLanguage.appendChild(option);
            });

            dropLanguage.appendChild(listdropLanguage);
            const horizontalLine = document.createElement("hr");
            dropLanguage.appendChild(horizontalLine);

            const promptTextarea = document.getElementById("prompt-textarea");
            promptTextarea.parentNode.insertBefore(
                dropLanguage,
                promptTextarea
            );

            mainScreenElement.style.display = "block";
        }
    );
}
