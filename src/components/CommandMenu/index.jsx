import React, { useEffect } from "react";
import CommandPalette, { getItemIndex, useHandleOpenCommandPalette } from "react-cmdk";
import "./cmdk.css";
import { useState } from "react";
import { query } from "./query";


export default function CommandMenu({open, setOpen}) {
    const [page, setPage] = useState("root");
    const [search, setSearch] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);

    const handleQuery = () => {
      query(search).then(res => {
        const data = res.data.Get.PageChunkOpenAI
        const resultFormated = data.map((item, index) => {
          return {
              id: index,
              children: item.title,
              icon: "HomeIcon",
              href: item.url
          }
        })
        const formated = [{
            heading: 'Documentation',
            id: 'documentation',
            items: resultFormated
        }];
        setFilteredItems(formated)
      }).catch(err => console.log(err))
    }

    useEffect(() => {
        if(search){
          handleQuery()
        }
    },[search])

    useHandleOpenCommandPalette(setOpen);

  return (
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={setOpen}
      search={search}
      isOpen={open}
      page={page}
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

