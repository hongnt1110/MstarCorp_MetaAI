// // get auth token from sync storage
// const defaultHeaders = {
//     'content-type': 'application/json',
//   };

// function getExamplePrompts(offset = 0, limit = 4) {
//   const url = new URL("https://chat.openai.com/backend-api/prompt_library/");
//   const params = { offset, limit };
//   url.search = new URLSearchParams(params).toString();
//   return chrome.storage.sync
//     .get(["accessToken"])
//     .then((result) =>
//       fetch(url, {
//         method: "GET",
//         headers: {
//           ...defaultHeaders,
//           Authorization: result.accessToken,
//         },
//       }).then((response) => response.json())
//     )
//     .then((data) => {
//       lastPromptSuggestions = data.items.map((item) => item.prompt);
//       return data;
//     });
// }

// getExamplePrompts();