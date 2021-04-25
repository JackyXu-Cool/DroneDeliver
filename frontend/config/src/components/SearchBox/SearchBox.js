import React from "react";

import classes from "./SearchBox.module.scss";
import { WithContext as ReactTags } from "react-tag-input";

const searchbox = (props) => {
  return (
    <div className={classes.searchBox}>
      <ReactTags
        classNames={{
          tags: classes.ReactTags__tags,
          tagInput: classes.ReactTags__tagInput,
          tagInputField: classes.ReactTags__tagInputField,
          selected: classes.ReactTags__selected,
          tag: classes.ReactTags__tag,
          remove: classes.ReactTags__remove,
        }}
        tags={props.value}
        handleDelete={props.onRemove}
        handleAddition={props.handleAddition}
        placeholder="Enter your keyword"
        inline={true}
        allowDragDrop={false}
      />
    </div>
  );
};
export default searchbox;
