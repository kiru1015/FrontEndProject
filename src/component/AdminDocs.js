import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import "./AdminDocs.css";

const SelectParent = styled.div`;
//   padding: 7px 7px;
//   background-color: darkblue;
//   width: max-content;
//   border-radius: 4px;
//   margin-top: 4px;
//   font-weight: bolder;
//   color: white;
//   cursor: pointer;
// `;

const Selectname = styled.div`;
//   margin-top: 5px;
//   padding: 7px 7px;
//   width: fit-content;
//   border-radius: 4px;
//   cursor: default;
//   color: darkblue;
//   :hover {
//     background-color: #bdbaba3c;
//   }
// `;

const AdminDocs = ({
  parent = [],
  onParentClick,
  onNameClick,
  expandOnHover = false,
}) => {
  const [newData, setNewData] = useState([]);
  const [expand, setExpand] = useState(false);
  const [search, setSearch] = useState("");
//   const [filteredFiles, setFilteredFiles] = useState([]);

  useEffect(() => {
    setNewData(parent);
  }, [parent]);

//   useEffect(() => {
//     setFilteredFiles(
//         newData.filter((newFile) =>
//         newFile.name.toLowerCase().includes(search.toLowerCase())
//       )
//     );
//   }, [search, newData]);

  const handleClickOnParent = (e, data) => {
    e.stopPropagation();
    console.log("parent");
    if (onParentClick && onParentClick instanceof Function) {
      onParentClick(data);
    }
    setExpand((prev) => !prev);
  };

  const handleClickOnName = (e, data) => {
    e.stopPropagation();
    console.log("child");

    if (onNameClick && onNameClick instanceof Function) {
      onNameClick(data);
    }
  };

  const filterData = (filterText) => {
    setNewData(newData.filter((newFile) =>
        newFile.name.toLowerCase().includes(filterText.toLowerCase())));
  };

  return (
    <>
    <input
        type="text"
        placeholder="Search File"
        onChange={(e) => filterData(e.target.value)}
      />
    
    
      {newData.map((item, index) => (
        
        <Fragment key={index}>
          {item.children && item.children.length ? (
            <Fragment key={index}>
              <SelectParent>
                <div className="hrDoc">
              <HrDocument
                
                name={item.name}
                type={item.type}
                added={item.added}
              />
            </div>
                <span>
               
                  {!expand ? <button alt="expandBtn" onClick={(e) => handleClickOnParent(e, item)}>Expand</button> : <button onClick={(e) => handleClickOnParent(e, item)}>Collapse</button>}
                </span>
              </SelectParent>

              {expand ? (
                <div
                  style={{
                    paddingLeft: "1.5rem",
                  }}
                >
                  <AdminDocs
                    parent={item.children}
                    onParentClick={onParentClick}
                    onNameClick={onNameClick}
                    expandOnHover={expandOnHover}
                  />
                </div>
              ) : null}
            </Fragment>
          ) : (
            <Selectname onClick={(e) => handleClickOnName(e, item)}>
              
              <div className="hrDoc">
              <HrDocument
                
                name={item.name}
                type={item.type}
                added={item.added}
              />
            </div>
            </Selectname>
          )}
        </Fragment>
      ))}
    </>
  );
};

const HrDocument = ({ name, type, added }) => {
    if (!name) return <div />;
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <h5>{name}</h5>
            </td>
            <td>
              <h5>{type}</h5>
            </td>
            <td>
              <h4>{added}</h4>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };
  


export default AdminDocs;
