import React from 'react';

function OneItem(props) {
  
  return(
    <tr>
      <td>{props.name}</td>
      <td>{props.id}</td>
    </tr>
  )
}

export default OneItem;