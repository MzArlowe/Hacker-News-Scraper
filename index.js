// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

(async () => {

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let stories = [];
  let currentPage = 1;

  while (stories.length < 100) {

await page.goto('https://news.ycombinator.com/newest');

const pageStories = await page.$$eval('.athing', (storyElements) => {
  
  return storyElements.map((story) => {

    const titleLine = story.querySelector('.titleline');
    const titleElement = titleLine ? titleLine.querySelector('a') : null;
    const title = titleElement ? titleElement.innerText : 'Untitled';
    const url = titleElement ? titleElement.href : '#';
    const subtext = story.nextElementSibling.querySelector('.subtext');
    const authorElement = subtext.querySelector('.hnuser');
    const author = authorElement ? authorElement.innerText : 'N/A';

    const storyId = story.getAttribute('id');

    return {
      title, 
      url,
      author,
      storyId,
    };
  });
});

stories = stories.concat(pageStories);

currentPage++;
}

stories = stories.slice(0, 100);

console.log('Top Stories from Hacker News:');
stories.forEach((story, index) => {
  console.log(`${index + 1}. ${story.title} | ${story.url} | story by ${story.author}`);
});

await browser.close();
})();