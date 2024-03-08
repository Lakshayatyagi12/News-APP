
const ApiKey = "8e8a4fd015c54dc9aca94f29d11d63d9";

const blockContainer = document.getElementById("block-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


/**
 * Fetches random news articles from the News API's top headlines.
 * @returns {Promise<Array>} A Promise that resolves to an array of article objects.
 */
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
/**
 * Adds a click event listener to the search button for fetching news articles based on the entered query.
 */
searchButton.addEventListener("click", async () => {
      // Extracts and trims the search query from the search field
    const query = searchField.value.trim();
      // Checks if the query is not empty
    if (query !== "") {
        try {
           // Fetches news articles based on the query
            const articles = await fetchNewsQuery(query)
          // Displays the fetched articles on the webpage
            displayBlogs(articles)
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
});
/**
 * Fetches news articles based on the provided query.
 * @param {string} query - The search query for news articles.
 * @returns {Promise<Array>} A Promise that resolves to an array of article objects.
 */

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
};
/**
 * Displays news articles on the webpage.
 * @param {Array} articles - An array of article objects to be displayed.
 */
function displayBlogs(articles) {
  // Clears the blockContainer before displaying new articles
  blockContainer.innerHTML = "";
  // Iterates through each article and creates HTML elements to display them
  articles.forEach((article) => {
    // Create a div element for each article
    const blockCard = document.createElement("div");
    blockCard.classList.add("block-card");
    // Create an image element for the article thumbnail
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    // Create a heading element for the article title
    const title = document.createElement("h2");
    // Truncate the title if it exceeds 30 characters
    const truncatedTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "....."
        : article.title;
    title.textContent = truncatedTitle;
    // Create a paragraph element for the article description
    const description = document.createElement("p");
    // Truncate the description if it exceeds 120 characters
    const truncatedDesc =
      article.title.length > 120
        ? article.description.slice(0, 120) + "....."
        : article.description;
    description.textContent = truncatedDesc;
    // Append the image, title, and description to the blockCard div
    blockCard.appendChild(img);
    blockCard.appendChild(title);
      blockCard.appendChild(description);
    // Add a click event listener to open the article in a new tab when clicked
      blockCard.addEventListener("click", () => {
          window.open(article.url, "_blank");
      });
    // Append the blockCard to the blockContainer
    blockContainer.appendChild(blockCard);
  });
};

(async () => {
  try {
    const articles = await fetchRandomNews();
    // console.log(article);
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news", error);
  }
})();
