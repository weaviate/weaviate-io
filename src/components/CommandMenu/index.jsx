import React, { useEffect } from 'react';
import CommandPalette, { getItemIndex, useHandleOpenCommandPalette } from 'react-cmdk';
import './cmdk.css';
import { useState } from 'react';
import { query } from './query';
import { captureSiteSearchAnalytics } from '../../analytics';
import { debounceTime, tap, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';


export default function CommandMenu({open, setOpen}) {
    const [page, setPage] = useState('root');
    const [search, setSearch] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [onSearch$] = useState(()=>new Subject());

    useEffect(() => {
      onSearch$.pipe(
        debounceTime(270),
        distinctUntilChanged(),
        tap(handleQuery),
        tap(captureSiteSearchAnalytics),
      ).subscribe();
    }, [])

    const getIcon = (type) => {
      if(type === 'docs'){
        return 'BookmarkIcon'
      }else if(type === 'blog'){
        return 'BookOpenIcon'
      }else{
        return 'CodeIcon'
      }
    }

    const addPage = (pageTitle, title) => {
      if(pageTitle != title){
        return pageTitle + ' • ' + title
      }
      return title
    }

    const handleQuery = (a) => {
      query(a).then(res => {
        const data = res.data.Get.PageChunkOpenAI
        const resultFormated = data.map((item, index) => {
          return {
              id: index,
              children: addPage(item.pageTitle, item.title),
              icon: getIcon(item.typeOfItem),
              href: item.url + '#' + item.anchor,
              type: item.typeOfItem
          }
        })
        const sliceArray = resultFormated.slice(0,5);
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
        })
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
          }
        ];
        formated = formated.filter(item => item.items.length > 0)
        setFilteredItems(formated)
      }).catch(err => console.log(err))
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

