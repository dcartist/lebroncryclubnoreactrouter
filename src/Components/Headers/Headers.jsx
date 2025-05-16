
export const Header1 = ({headname, ransom = false}) => {
    
    return (
        // <div >
        <div className={`header1 ${ransom ? 'barrio-regular' : 'anton-regular'}`}>
        <h1>{headname}</h1>
        </div>
    );
    }

export const Header2 = ({headname, ransom = false}) => {
    
    return (
        // <div >
        <div className={`header1 ${ransom ? 'barrio-regular' : 'anton-regular'}`}>
        <h2>{headname}</h2>
        </div>
    );
    }
export const Header3 = ({headname, ransom = false}) => {
    
    return (
        // <div >
        <div className={`header1 ${ransom ? 'barrio-regular' : 'anton-regular'}`}>
        <h3>{headname}</h3>
        </div>
    );
    }
export const HeaderBig = ({headname, ransom = false}) => {
    
    return (
        // <div >
        <div className={`header1 enormous-text ${ransom ? 'barrio-regular' : 'anton-regular'}`}>
        <h1>{headname}</h1>
        </div>
    );
    }

