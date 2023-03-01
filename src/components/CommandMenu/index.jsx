import React, { useEffect } from "react";
import CommandPalette, { getItemIndex, useHandleOpenCommandPalette } from "react-cmdk";
import "./cmdk.css";
import { useState } from "react";
import { query } from "./query";


export default function CommandMenu({open, setOpen}) {
    const [page, setPage] = useState("root");
    const [search, setSearch] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);

    const getIcon = (type) => {
      if(type === 'docs'){
        return 'BookmarkIcon'
      }else if(type === 'blog'){
        return 'BookOpenIcon'
      }else{
        return 'CodeIcon'
      }
    }

    console.log(filteredItems)
    const handleQuery = () => {
      query(search).then(res => {
        const data = res.data.Get.PageChunkOpenAI
        const resultFormated = data.map((item, index) => {
          return {
              id: index,
              children: item.title,
              icon: getIcon(item.typeOfItem),
              href: item.url + '#' + item.anchor,
              type: item.typeOfItem
          }
        })
        const sliceArray = resultFormated.slice(0,5);
        let documentationSection = [];
        let blogSection = [];
        let anotherSection = [];
        sliceArray.map(item => {
          if(item.type === 'docs'){
            documentationSection.push(item)
          }else if(item.type === 'blog'){
            blogSection.push(item);
          }else{
            anotherSection.push(item)
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
            heading: 'Another',
            id: 'another',
            items: anotherSection
          }
        ];
        formated = formated.filter(item => item.items.length > 0)
        setFilteredItems(formated)
      }).catch(err => console.log(err))
    }

    useEffect(() => {
        if(search){
          handleQuery()
        }
    },[search])

    useHandleOpenCommandPalette(setOpen);

    const renderFooter = () => {
      return (
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <p>powered by </p> <p className="hero__logo" style={{height: 34, width: 34, marginLeft: 5, marginRight: 5}} /> <p>  Weaviate</p>
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
      <CommandPalette.Page id="root">
        {filteredItems.length ? (
          filteredItems.map((list) => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }) => (
                <CommandPalette.ListItem
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

