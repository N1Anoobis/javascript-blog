{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagArticleLink: Handlebars.compile(document.querySelector('#template-tagArticle-link').innerHTML),
    authorTitle: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloudLink').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-authorCloudLink').innerHTML),
  };

  const opt = {
    optTitleSelector: '.post-title',
    optTitleListSelector: '.titles',
    //select ul contain tags under article
    optArticleTagsSelector: '.post-tags .list',
    optArticleAuthorSelector: 'post-author',
    optAuthorsListSelector: '.authors',
    optTagsListSelector: '.tags.list',

  };

  const opts = {
    tagSizes: {
      count: 5,
      classPrefix: 'tag-size-',
    },
  };

  const select = {
    all: {
      articles: '.post',
      linksTo: {
        tags: 'a[href^="#tag-"]',
        authors: 'a[href^="#by"]',
      },
    },
    article: {
      tags: '.post-tags .list',
      author: '.post-author',
    },
    listOf: {
      titles: '.titles',
      tags: '.tags.list',
      authors: '.authors.list',
    },
  };

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

  function generateTitleLinks(customSelector = '') {
    /* remove contents of titleList */
    let titleList = document.querySelector(select.listOf.titles);
    titleList.innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(select.all.articles + customSelector);
    let html = '';
    for (let article of articles) {
      /* get the article id */
      let articleId = article.getAttribute('id');
      /* find the title element */
      /* get the title from the title element */
      const articleTitle = article.querySelector(opt.optTitleSelector).innerHTML;
      /* create HTML of the link */

      // Handlebars
      // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'
      const linkHTMLData = {
        id: articleId,
        title: articleTitle
      };
      const linkHTML = templates.articleLink(linkHTMLData);

      /* insert link into titleList */
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
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    return params;
  }

  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opts.tagSizes.count - 1) + 1);
    return opts.tagSizes.classPrefix + classNumber;
  }

  function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      let tagsList = article.querySelector(select.article.tags);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      let articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        /* generate HTML of the link */

        //Handlebars
        // const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
        const linkHTMLData = {
          id: tag,
          title: tag
        };
        const linkHTML = templates.tagArticleLink(linkHTMLData);

        /* add generated code to html variable */
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
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(select.listOf.tags);
    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);

    //create object for Handlebars
    // let allTagsHTML = '';
    const allTagsData = {
      tags: []
    };

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      // const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);

      //Handlebars

      // allTagsHTML += `<a href="#tag-${tag}"class="${tagLinkHTML}">${tag}(${ allTags[tag]})</a>`;
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }

    /* [NEW] END LOOP: for each tag in allTags: */
    /*[NEW] add HTML from allTagsHTML to tagList */
    // tagList.innerHTML = allTagsHTML;
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);
  }

  generateTags();

  function tagClickHandler(event) {
    /* prevent default action for this event */
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
    const allLinks = document.querySelectorAll(select.all.linksTo.tags);
    /* START LOOP: for each link */
    for (let alink of allLinks) {
      /* add tagClickHandler as event listener for that link */
      alink.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();

  function generateAuthors() {
    //create object with authors names
    let allAuthors = {};

    /* find all articles */
    const authors = document.querySelectorAll(select.all.articles);
    //empty html variable
    let html = '';

    /* START LOOP: for every article: */
    for (let author of authors) {
      //getting atribiute value from every single author
      const artAuthor = author.getAttribute('post-author').replace('by', '');

      /* [NEW] check if this link is NOT already in allTags */
      if (!allAuthors[artAuthor]) {
        /* [NEW] add tag to allTags object */
        allAuthors[artAuthor] = 1;
      } else {
        allAuthors[artAuthor]++;
      }

      // /* taking atribiutes from html */
      let authorTitle = author.getAttribute(opt.optArticleAuthorSelector);

      //Handlebars
      // let linkHTML = `<a href="#${authorTitle}">${authorTitle}</a>`;
      const linkHTMLData = {
        id: authorTitle,
        title: authorTitle
      };
      const linkHTML = templates.articleLink(linkHTMLData);

      author.querySelector(select.article.author).innerHTML = linkHTML;
      html = html + linkHTML;

    }
    let placeToPaste = document.querySelector(opt.optAuthorsListSelector);
    //creara array for Handlebars
    // let allAuthorsHTML = '';
    const allAuthorsData = {
      tags: []
    };


    for (let auto in allAuthors) {
      /* [NEW] generate code of a link and add it to allTagsHTML */

      allAuthorsData.tags.push({
        tag: auto,
        count: allAuthors[auto],
        // className: calculateTagClass(allTags[tag], tagsParams)
      });


      // allAuthorsHTML += `<a href="#by${auto}">${auto}(${ allAuthors[auto]})</a>`;
    }
    /* [NEW] END LOOP: for each tag in allTags: */
    /*[NEW] add HTML from allTagsHTML to tagList */
    // placeToPaste.innerHTML = allAuthorsHTML;

    //
    placeToPaste.innerHTML = templates.authorCloudLink(allAuthorsData);
  }

  generateAuthors();

  function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* get value of clicked  items   */
    const activeAuthor = clickedElement.getAttribute('href');
    //look for all active authors 
    const listOfAuthors = document.querySelectorAll('.authors .active');
    // remove activ from all active authors
    for (const auto of listOfAuthors) {
      auto.classList.remove('active');
    }

    // add class active to all current target
    clickedElement.classList.add('active');
    /* procces value to needed result */
    const activeAuthorRight = activeAuthor.replace('#by', '');
    //pas argument to allow filter odf articles by author
    generateTitleLinks('[post-author="by' + activeAuthorRight + '"]');
  }

  function addClickListenersToAuthors() {
    const activeAuthors = document.querySelectorAll(select.all.linksTo.authors);

    for (let author of activeAuthors) {
      author.addEventListener('click', authorClickHandler);
    }
  }
  addClickListenersToAuthors();
}