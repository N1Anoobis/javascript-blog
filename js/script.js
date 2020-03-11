{
  {
    const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles';

    function generateTitleLinks() {
      /* remove contents of titleList */
      titleList = document.querySelector(optTitleListSelector)
      titleList.innerHTML = '';
      /* for each article */
      const articles = document.querySelectorAll(optArticleSelector)
      /* get the article id */
      let html = '';
      for (let article of articles) {
        /* get the article id */
        articleId = article.getAttribute('id')
        /* find the title element */
        /* get the title from the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        console.log(articleTitle)
        /* create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        // console.log(linkHTML)
        /* insert link into titleList */
        // titleList.innerHTML = titleList.innerHTML + linkHTML;
        // titleList.insertAdjacentHTML('beforebegin', linkHTML;
        html = html + linkHTML;
        console.log(html)
      }
      titleList.innerHTML = html;
    }
    generateTitleLinks()

    const titleClickHandler = function (event) {
      event.preventDefault();
      const clickedElement = this;
      console.log('Link was clicked!');
      console.log('clickedElement (with plus): ' + clickedElement);
      /* [DONE] remove class 'active' from all article links  */
      const activeLinks = document.querySelectorAll('.titles a.active');
      for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
      }
      /* [DONE]add class 'active' to the clicked link */
      clickedElement.classList.add('active');
      /* [DONE]remove class 'active' from all articles */
      const activeArticles = document.querySelectorAll('.posts .post');
      for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
      }
      /* get 'href' attribute from the clicked link */
      let attribute = clickedElement.getAttribute('href')
      console.log(attribute)
      /* find the correct article using the selector (value of 'href' attribute) */
      targetArticle = document.querySelector(attribute)
      console.log(targetArticle)
      /* add class 'active' to the correct article */
      targetArticle.classList.add('active');
    }

    const links = document.querySelectorAll('.titles a');
    console.log(links)

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
}