import React, { useEffect } from 'react';
import CommandPalette, { getItemIndex, useHandleOpenCommandPalette } from 'react-cmdk';
import './cmdk.css';
import { useState } from 'react';
import { runQuery } from './query';
import { analyticsSiteSearched, analyticsSiteSearchResultsRejected, analyticsSiteSearchSelected } from '../../analytics';
import { debounceTime, tap, distinctUntilChanged, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

const defaultMenuPages = {
  heading: 'Pages',
  id: 'pages',
  items: [{
      id: 1001,
      children: 'Weaviate Cloud console',
      icon: 'BookmarkIcon',
      href: 'https://console.weaviate.cloud/'
    },{
      id: 1002,
      children: 'Weaviate Cloud Services - Pricing',
      icon: 'BookmarkIcon',
      href: '/pricing'
    },
    {
      id: 1003,
      children: 'Blog',
      icon: 'BookmarkIcon',
      href: '/blog'
    },{
      id: 1004,
      children: 'Documentation',
      icon: 'BookmarkIcon',
      href: '/developers/weaviate'
    },
  ]
}

const defaultSocialMediaLinks = {
  heading: 'SocialMedia',
  id: 'socialMedia',
  items: [{
      id: 2001,
      children: 'Slack',
      icon: 'ChatBubbleLeftRightIcon',
      href: 'https://weaviate.io/slack/'
    },{
      id: 2002,
      children: 'Twitter',
      icon: 'ChatBubbleLeftRightIcon',
      href: 'https://twitter.com/weaviate_io'
    },
  ]
}

export default function CommandMenu({open, setOpen}) {
  const [page, setPage] = useState('root');
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState([defaultMenuPages, defaultSocialMediaLinks]);
  const [onSearch$] = useState(()=>new Subject());

  useEffect(() => {
    const sub = onSearch$.pipe(
      debounceTime(270),
      filter(searchTerm => searchTerm.length > 2),
      distinctUntilChanged(),
      tap(handleQuery),
      tap(analyticsSiteSearched),
    ).subscribe();

    // clean up subscriptions on leave
    return () => {
      sub.unsubscribe();
    }
  }, [])

  const getIcon = (type) => {
    switch (type) {
      case 'rejected':
        return 'CogIcon';
      case 'docs':
        return 'BookmarkIcon';
      case 'blog':
        return 'BookOpenIcon';
      default:
        return 'CodeIcon';
    }
  }

  const addPage = (pageTitle, title) => {
    if(pageTitle != title){
      return pageTitle + ' • ' + title;
    }
    return title;
  }

  const onSearchResultsClicked = (event) => {
    // get the search term from the search box
    const searchTerm = document.getElementById('command-palette-search-input').value;

    // get the result url from the even
    const selectedResultURI = event.target.baseURI;

    const selectedTitle = event.target.innerText;
    // capture analytics for the selected search result
    analyticsSiteSearchSelected(searchTerm, selectedResultURI, selectedTitle)
  }

  const onSearchResultsRejected = (event) => {
    // get the search term from the search box
    const searchTerm = document.getElementById('command-palette-search-input').value;

    // capture analytics for the rejected search results
    analyticsSiteSearchResultsRejected(searchTerm);

    clearSearch();
  }

  const clearSearch = () => {
    setSearch('');
    setFilteredItems([defaultMenuPages, defaultSocialMediaLinks]);
  }

  const handleQuery = async (searchTerm) => {
    const limit = 8;

    try {
      const queryResult = await runQuery(searchTerm, limit);
      console.log(queryResult)

      const data = queryResult.data.Get.PageChunk;

      const resultFormated = data.map((item, index) => {
        return {
          id: index,
          children: addPage(item.pageTitle, item.title),
          icon: getIcon(item.typeOfItem),
          href: item.url + '#' + item.anchor,
          type: item.typeOfItem,

          onClick: onSearchResultsClicked
        }
      });

      const sliceArray = resultFormated.slice(0,limit);
      let documentationSection = [];
      let blogSection = [];
      let miscSection = [];

      sliceArray.map(item => {
        if(item.type === 'docs'){
          documentationSection.push(item)
        }else if(item.type === 'blog'){
          blogSection.push(item);
        }else{
          miscSection.push(item)
        }
      });

      let formated = [
        {
          heading: 'Documentation',
          id: 'documentation',
          items: documentationSection
        },
        {
          heading: 'Blog',
          id: 'blog',
          items: blogSection
        },
        {
          heading: 'Miscellaneous',
          id: 'miscellaneous',
          items: miscSection
        },
        // hardcoded no results feedback item
        {
          heading: 'Give Feedback',
          id: 'feedback',
          items: [{
            id: 100,
            children: 'No Good Results',
            icon: getIcon('rejected'),
            onClick: onSearchResultsRejected
          }]
        }
      ];

      formated = formated.filter(item => item.items.length > 0);
      setFilteredItems(formated);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(search){
      onSearch$.next(search);
    }
  },[search])

  useHandleOpenCommandPalette(setOpen);

  const renderFooter = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
      <p style={{fontSize: 15}}>Powered by </p> <p className="logo" style={{height: 35, marginLeft: -10, marginTop: 10, marginBottom: 10}}  />
      </div>
    )
  }

  return (
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={setOpen}
      search={search}
      isOpen={open}
      page={page}
      footer={renderFooter()}
    >
      <CommandPalette.Page id='root'>
        {filteredItems.length ? (
          filteredItems.map((list) => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }) => (
                <CommandPalette.ListItem
                  showType={false}
                  key={id}
                  index={getItemIndex(filteredItems, id)}
                  {...rest}
                />
              ))}
            </CommandPalette.List>
          ))
        ) : (
          <CommandPalette.FreeSearchAction  />
        )}
      </CommandPalette.Page>
    </CommandPalette>
  );
}
