import React, { useEffect } from "react";
import "react-cmdk/dist/cmdk.css";
import CommandPalette, { filterItems, getItemIndex, useHandleOpenCommandPalette } from "react-cmdk";
import { useState } from "react";
import { query } from "./query";


export default function CommandMenu({open, setOpen}) {
    const [page, setPage] = useState("root");
    const [search, setSearch] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(async () => {
        if(search){
            const result = await query(search);
            const data = result.data.Get.PageChunkOpenAI;
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
        }
       
    },[search])

    // console.log('filteredItems', filteredItems)
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

