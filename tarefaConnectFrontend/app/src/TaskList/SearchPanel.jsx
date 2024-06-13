export function SearchPanel({ handleSearch, toSearchFor }) {
    const searchWord = "Search for " + toSearchFor + "..."
    return (
            <div className="SearchBar">
                <input type="search"
                    placeholder={searchWord}
                    onChange={(e) => handleSearch(e.target.value)} />
                {/* <i className='bi-search'></i> */}
            </div>
    );
}
