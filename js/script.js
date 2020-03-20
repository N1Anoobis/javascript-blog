{

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
    optArticleAuthorSelector = 'post-author',
    optAuthorsListSelector = '.authors',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';

  function generateTitleLinks(customSelector = '') {
    /* remove contents of titleList */
    let titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* for each article */

    // console.log(optArticleTagsSelector);
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
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
    }
  }
  generateTitleLinks();

  function calculateTagsParams(tags) {
    const params = {
      max: 0,
      min: 99999,
    };
    for (let tag in tags) {
      // console.log(tag + ' is used ' + tags[tag] + ' times');
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    return params;
  }

  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + classNumber;
  }

  function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      let tagsList = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      let articleTags = article.getAttribute('data-tags');

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        // console.log(tag)
        /* generate HTML of the link */
        const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
        /* add generated code to html variable */
        // console.log(linkHTML);
        html = html + ' ' + linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = html;
      // console.log(tagList.innerHTML)
      // console.log(html);
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);

    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);


      allTagsHTML += `<a href="#tag-${tag}"class="${tagLinkHTML}">${tag}(${ allTags[tag]})</a>`;
    }

    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }

  generateTags();

  function tagClickHandler(event) {
    /* prevent default action for this event */

    // console.log('dziala');
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activetags = document.querySelectorAll('a.active[href^="#tag-"]');
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
    const allLinks = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for (let alink of allLinks) {
      /* add tagClickHandler as event listener for that link */
      alink.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();

  function generateAuthors() {
    //object with authors names
    let allAuthors = {};
    // const authorsArray = ['Kitty Toebean', 'Theo Tabby', 'George Tuxedo', 'Marion Berry'];
    /* find all articles */
    const authors = document.querySelectorAll(optArticleSelector);
    //empty html variable
    let html = '';
    
    /* START LOOP: for every article: */
    for (let author of authors) {
      //finding place to paste the authors links


      const artAuthor = author.getAttribute('post-author').replace('by', '');


      console.log(artAuthor);
      const linkAutoHTML = `<li><a href="#tag-${artAuthor}">${artAuthor}</a></li>`;
      /* add generated code to html variable */
      // console.log(linkHTML);
      html = html + ' ' + linkAutoHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if (!allAuthors[artAuthor]) {
        /* [NEW] add tag to allTags object */
        allAuthors[artAuthor] = 1;
      } else {
        allAuthors[artAuthor]++;
      }
      console.log(allAuthors);







      // /* taking atribiutes from html */
      let authorTitle = author.getAttribute(optArticleAuthorSelector);
      //creating variable to create author title
      let linkHTML = `<a href="#${authorTitle}">${authorTitle}</a>`;
      /* find title wrapper */
      author.querySelector('.post-author').innerHTML = linkHTML;
      html = html + linkHTML;
    }
    let placeToPaste = document.querySelector(optAuthorsListSelector);
    let allAuthorsHTML = '';
    for (let auto in allAuthors) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      // const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);


      allAuthorsHTML += `<a href="#by${auto}">${auto}(${ allAuthors[auto]})</a>`;
    }

    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    placeToPaste.innerHTML = allAuthorsHTML;
  }

  generateAuthors();

  function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* get value of clicked  items   */
    const activeAuthor = clickedElement.getAttribute('href');
    
    console.log(clickedElement);
    /* procces value to needed result */
    const activeAuthorRight = activeAuthor.replace('#by', '');
    //pas argument to allow filter odf articles by author
    generateTitleLinks('[post-author="by' + activeAuthorRight + '"]');
  }

  function addClickListenersToAuthors() {


    const activeAuthors = document.querySelectorAll('a[href^="#by"]');
    console.log(activeAuthors.textContent);
    // const activeAuthors = document.querySelectorAll('.post-author');

    for (let author of activeAuthors) {

      author.addEventListener('click', authorClickHandler);

    }

  }

  addClickListenersToAuthors();
}