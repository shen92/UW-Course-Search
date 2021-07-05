import React from 'react';

import '../css/components.css'

function TabContent(props) {
    const { children } = props;
    
    return (
        <div className="tabContent">
            {children}
        </div>
    );
}


export default TabContent;