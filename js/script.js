{
  // function to keep absolute elements right sizes
  function checkDisplaySize() {
    const activeParagraf = document.querySelector('.posts .active');
    const variable = activeParagraf.offsetHeight;
    // console.log(variable)
    const mainWrapper = document.querySelector('.wrapper');
    mainWrapper.style.height = `${variable+100}px`;
    // }
  }

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;

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
    let attribute = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(attribute);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  function generateTitleLinks() {
    /* remove contents of titleList */
    let titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    /* get the article id */
    let html = '';
    for (let article of articles) {
      /* get the article id */
      let articleId = article.getAttribute('id');
      /* find the title element */
      /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      // console.log(linkHTML)
      /* insert link into titleList */
      // titleList.innerHTML = titleList.innerHTML + linkHTML;
      // titleList.insertAdjacentHTML('beforebegin', linkHTML;
      html = html + linkHTML;

    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');


    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
      link.addEventListener('click', checkDisplaySize);
    }
  }
  generateTitleLinks();
  // check size of parent por absolute element to display
  window.addEventListener('load', checkDisplaySize);
  window.addEventListener('resize', checkDisplaySize);
}