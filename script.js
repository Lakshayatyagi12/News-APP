const ApiKey = "8e8a4fd015c54dc9aca94f29d11d63d9";

const blockContainer = document.getElementById("block-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");



async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${ApiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data)
    return data.articles;
  } catch (error) {
    console.error("Error fetching random news", error);
    return [];
  }
}


searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
})


async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${ApiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log(data)
        return data.articles;
      } catch (error) {
        console.error("Error fetching random news", error);
        return [];
      }
}




function displayBlogs(articles) {
  blockContainer.innerHTML = "";
  articles.forEach((article) => {
    const blockCard = document.createElement("div");
    blockCard.classList.add("block-card");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");
    const truncatedTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "....."
        : article.title;
    title.textContent = truncatedTitle;
    const description = document.createElement("p");
    const truncatedDesc =
      article.title.length > 120
        ? article.description.slice(0, 120) + "....."
        : article.description;
    description.textContent = truncatedDesc;

    blockCard.appendChild(img);
    blockCard.appendChild(title);
      blockCard.appendChild(description);
      blockCard.addEventListener("click", () => {
          window.open(article.url, "_blank");
      })
    blockContainer.appendChild(blockCard);
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    // console.log(article);
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news", error);
  }
})();
