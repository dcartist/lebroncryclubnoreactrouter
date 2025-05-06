
export const Header1 = ({headname, ransom = false}) => {
    console.log(ransom)
    return (
        // <div >
        <div className={`header1 ${ransom ? 'barrio-regular' : 'anton-regular'}`}>
        <h1>{headname}</h1>
        </div>
    );
    }
export const Header2 = ({headname}) => {
    return (
        <div className="header2">
        <h2>{headname}</h2>
        </div>
    );
    }
