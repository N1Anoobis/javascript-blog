{
  // function to keep absolute elements right sizes
  function checkDisplaySize() {
    const activeParagraf = document.querySelector('.posts article.active');
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
    // console.log('sprawdzam size of ')
    // checkDisplaySize();
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    //select ul contain tags aner article
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = 'post-author';

  function generateTitleLinks(customSelector = '') {
    /* remove contents of titleList */
    let titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* for each article */

    console.log(optArticleTagsSelector);
    const articles = document.querySelectorAll(optArticleSelector + customSelector); /* get the article id */
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

  function generateTags() {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {
      // console.log(article);
      /* find tags wrapper */
      let tagsList = article.querySelector(optArticleTagsSelector);
      // console.log(tagsList);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      let articleTags = article.getAttribute('data-tags');
      // console.log(articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      // console.log(articleTagsArray);
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        // console.log(tag);
        /* generate HTML of the link */
        const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
        /* add generated code to html variable */
        console.log(linkHTML);
        html = html + ' ' + linkHTML;

        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = html;
      // console.log(html);
      /* END LOOP: for every article: */
    }
  }

  generateTags();

  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    // const tag = href.innerHTML;
    const tag = href.replace('#tag-', '');
    console.log(tag);
    /* find all tag links with class active */
    const activetags = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(activetags);
    /* START LOOP: for each active tag link */
    for (const activeTag of activetags) {


      /* remove class active */
      activeTag.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    let chosenTags = document.querySelectorAll('a[href="' + href + '"]');
    console.log(chosenTags);
    /* START LOOP: for each found tag link */
    for (const cTag of chosenTags) {


      /* add class active */
      cTag.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    /* find all links to tags */
    const allLinks = document.querySelectorAll('a');
    /* START LOOP: for each link */
    for (let alink of allLinks) {

      alink.addEventListener('click', tagClickHandler);
      /* add tagClickHandler as event listener for that link */

      /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();

  function generateAuthors() {
    /* find all articles */
    const authors = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    // console.log(article);
    for (let author of authors) {

      // /* find tags wrapper */
      let authorTitle = author.getAttribute(optArticleAuthorSelector);
      console.log(authorTitle);
      author.querySelector('.post-author').innerHTML = authorTitle;



      // let html = '';
      // let authorsDisplayBox = document.querySelector('.list .authors');
     
      // const linkHTML = `<li><a href="#tag-${authorTitle}">${authorTitle}</a></li>`;
   
     
      // html = html + ' ' + linkHTML;

      
      // authorsDisplayBox.innerHTML = html;
   

    }





  }
  generateAuthors();


  function authorClickHandler(event) {
    
    event.preventDefault();
    
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    // console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    // const tag = href.innerHTML;
    const tag = href.replace('#tag-', '');
    console.log(tag);
    /* find all tag links with class active */
    const activetags = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(activetags);
    /* START LOOP: for each active tag link */
    for (const activeTag of activetags) {


      /* remove class active */
      activeTag.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    let chosenTags = document.querySelectorAll('a[href="' + href + '"]');
    console.log(chosenTags);
    /* START LOOP: for each found tag link */
    for (const cTag of chosenTags) {


      /* add class active */
      cTag.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToAuthors() {
    /* find all links to tags */
    const allLinks = document.querySelectorAll('a');
    /* START LOOP: for each link */
    for (let alink of allLinks) {

      alink.addEventListener('click', tagClickHandler);
      /* add tagClickHandler as event listener for that link */

      /* END LOOP: for each link */
    }
  }

}