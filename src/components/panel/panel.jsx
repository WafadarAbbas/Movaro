import React, { useContext, useState } from 'react';
import { slideToggle } from './composables/slideToggle';

const PanelStat = React.createContext();

function Panel(props) {
  const [expand, setExpand] = useState(false);
  const [reload, setReload] = useState(false);
  const [remove, setRemove] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
 

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const toggleRemove = () => {
    setRemove(!remove);
  };

  const toggleCollapse = (e) => {
    slideToggle(e.target.closest('.panel').querySelector('.panel-body'));
  };

  const toggleReload = () => {
    if (!reload) {
      setReload(true);

      setTimeout(() => {
        setReload(false);
      }, 2000);
    }
  };


  const panelState = {
    expand,
    reload,
    remove,
    itemsPerPage,
    toggleExpand,
    toggleReload,
    toggleRemove,
    toggleCollapse,
    setItemsPerPage 
  };

  return (
    <PanelStat.Provider value={panelState}>
    {!remove && (
     
      <div   className={`panel panel-${props.theme ? props.theme : 'inverse'} ${expand ? 'panel-expand' : ''} ${reload ? 'panel-loading' : ''} ${props.className ? props.className : ''}`}>
        {props.children}
      </div>
 
    )}
  </PanelStat.Provider>
  );
}

function PanelHeader(props) {
  return (
    <div className={`panel-heading ${props.className}`}>
      <h4 className="panel-title">{props.children}</h4>
      {!props.noButton && (
        <PanelStat.Consumer>
          {({ toggleExpand, toggleRemove, toggleCollapse, toggleReload, setItemsPerPage }) => (
            <div className="panel-heading-btn">
              <button className="btn btn-xs btn-icon btn-circle btn-default" onClick={toggleExpand}>
                <i className="fa fa-expand"></i>
              </button>
              &nbsp;&nbsp;
              <button className="btn btn-xs btn-icon btn-circle btn-success" onClick={toggleReload}>
                <i className="fa fa-redo"></i>
              </button>
              &nbsp;&nbsp;
              <button className="btn btn-xs btn-icon btn-circle btn-warning" onClick={toggleCollapse}>
                <i className="fa fa-minus"></i>
              </button>
              &nbsp;&nbsp;
              <button className="btn btn-xs btn-icon btn-circle btn-danger" onClick={toggleRemove}>
                <i className="fa fa-times"></i>
              </button>
              &nbsp;&nbsp;
              
               <select
                style={{
                  borderRadius: '30px',
                  padding: '0.0001rem 0.1rem',
                  fontSize: '0.67rem',
                  height: 'auto',
                  width: 'auto',
                  color: 'white',
                  textAlign: 'center',
                  backgroundColor: '#49b5f2'
                }}
                 className="form-control form-control-xs"
                 onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                {[5, 10, 15, 20, 25].map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
        </PanelStat.Consumer>
      )}
    </div>
  );
}


function PanelBody(props) {
  return (
    <PanelStat.Consumer>
      {({ reload, itemsPerPage }) => {
        
       

        return (
          <div className={`panel-body ${props.className}`}>
            {props.children} 
            {reload && (
              <div className="panel-loader">
                <span className="spinner spinner-sm"></span>
              </div>
            )}
          </div>
        );
      }}
    </PanelStat.Consumer>
  );
}
function PanelFooter(props) {
  return <div className={`panel-footer ${props.className}`}>{props.children}</div>;
}

export { Panel, PanelHeader, PanelBody, PanelFooter };