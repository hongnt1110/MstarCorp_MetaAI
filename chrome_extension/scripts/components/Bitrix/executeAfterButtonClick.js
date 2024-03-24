async function executeAfterButtonClick(mainScreenElement) {
    chrome.storage.local.get(["prompts", "categories"], function (result) {
        const cardPrompts = result.prompts;
        const cardCategories = result.categories;

        const containerContent = document.createElement("div");
        containerContent.setAttribute("id", "container-content-B");
        mainScreenElement.parentNode.prepend(containerContent);

        const titleText = document.createElement("h1");
        titleText.textContent = "Xin chào! Tôi là Meta AI";
        containerContent.appendChild(titleText);
        titleText.classList.add("gradient-text");

        const textIntroduce = document.createElement("div");
        textIntroduce.className = "textIntroduce";
        const introductionText =
            "Dưới đây là 100 gợi ý để tôi có thể hỗ trợ bạn sử dụng AI một cách tối ưu nhất. Nếu bạn chưa biết các sử dụng, vui lòng ";
        const linkText = "nhấn vào đây để xem hướng dẫn";
        const fullText = introductionText + linkText;
        containerContent.appendChild(textIntroduce);
        // Create a tag (link)
        const linkElement = document.createElement("a");
        linkElement.href = "URL_CUA_HUONG_DAN"; // Thay thế URL_CUA_HUONG_DAN bằng URL thực tế của trang hướng dẫn
        linkElement.textContent = linkText;
        linkElement.className = "linkElement";
        const promptContainer = document.createElement("div");
        promptContainer.className = "prompt-container";

        // Thêm nội dung văn bản và liên kết vào textIntroduce
        textIntroduce.innerHTML = introductionText;
        textIntroduce.appendChild(linkElement);

        titleText.parentElement.insertBefore(
            textIntroduce,
            titleText.nextSibling
        );
        // Create a filter category dropdown
        const controlPanelDiv = document.createElement("div");
        controlPanelDiv.id = "controlPanel";
        controlPanelDiv.classList.add("flex", "flex-col", "items-center");

        //Container Filter
        const containerFilter = document.createElement("div");
        containerFilter.className = "container-filter";
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
        filterCategory.id = "categoryFilter-B";
        filterCategory.addEventListener("change", () => {
            const selectedCategory = filterCategory.value;
            filterCategoryPrompts(selectedCategory, cardPrompts);
        });

        // Add an "All" option to show all categories
        const allOption = document.createElement("option");
        allOption.value = "all";
        allOption.textContent = "Tất cả chủ đề";
        filterCategory.appendChild(allOption);

        // Remove duplicates and preserve order
        function uniqueCategoriesWithOrder(array) {
            let seen = {};
            return array.filter((item) => {
                return seen.hasOwnProperty(item) ? false : (seen[item] = true);
            });
        }
        // Extract unique categories from cardPrompts
        const categories = uniqueCategoriesWithOrder(
            cardCategories.map((card) => card.name)
        );

        // Create options for each category
        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            filterCategory.appendChild(option);
        });
        containerFilterCategory.appendChild(filterCategory);

        //Tạo dropdown filter category
        const selectedCategoryDisplay = document.createElement("p");
        selectedCategoryDisplay.id = "selectedCategoryDisplay";
        containerFilterCategory.appendChild(selectedCategoryDisplay);

        // Cập nhật sự kiện change của filterCategory
        filterCategory.addEventListener("change", () => {
            const selectedCategory = filterCategory.value;
            filterCategoryPrompts(selectedCategory, cardPrompts);

            // Hiển thị chủ đề đã chọn
            selectedCategoryDisplay.textContent =
                selectedCategory === "all" ? "Tất cả chủ đề" : selectedCategory;

            // Hiển thị dấu ... và chủ đề đã chọn
            selectedCategoryDisplay.textContent =
                "Các gợi ý theo chủ đề " + selectedCategory;
        });
        containerFilter.parentElement.insertBefore(
            selectedCategoryDisplay,
            containerFilter.nextSibling
        );
        //Search
        const containerSearchInput = document.createElement("div");
        containerSearchInput.className = "Search-Input";
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
        searchInput.id = "promptSearchInput";
        searchInput.placeholder = "Nội dung bạn muốn tìm...";
        searchInput.addEventListener("input", () => {
            const selectedCategory = filterCategory.value;
            handleSearch(searchInput, cardPrompts, selectedCategory);
        });

        searchBox.appendChild(searchInput);

        const searchIconSVG = document.createElement("div");
        searchIconSVG.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; ">
            <path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path>
        </svg>
    `;
        searchIconSVG.className = "Icon-search";
        searchBox.appendChild(searchIconSVG);

        cardPrompts.forEach((card) => {
            const cardDiv = createCardPrompt(card);
            promptContainer.appendChild(cardDiv);
        });

        containerContent.appendChild(promptContainer);
        ////// DropLanguages
        // Kiểm tra xem dropdown list đã tồn tại hay chưa
        const existingDropdown = document.getElementById("languageSelect");

        // Nếu dropdown list chưa tồn tại, tạo nó
        if (!existingDropdown) {
            const languages = [
                { value: "vi", text: "Tiếng Việt" },
                { value: "en", text: "English" },
                { value: "fr", text: "Français" },
                { value: "ja", text: "日本語" },
                { value: "zh", text: "中文" },
                { value: "ko", text: "한국어" },
            ];
            const dropLanguage = document.createElement("div");
            dropLanguage.id = "drop-language-B";

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
            horizontalLine.style.width = "100%";
            dropLanguage.appendChild(horizontalLine);

            const promptTextarea = document.querySelector(
                ".bx-im-textarea__content"
            );
            promptTextarea.parentNode.insertBefore(
                dropLanguage,
                promptTextarea
            );
            mainScreenElement.style.display = "block";
        }

    });
}
