export function SearchPanel({ setSearch, toSearchFor }) {
    const searchWord = "Search for " + toSearchFor + "..."
    return (
            <div className="SearchBar">
                <input type="search"
                    placeholder={searchWord}
                    onChange={(e) => setSearch(e.target.value)} />
                {/* <i className='bi-search'></i> */}
            </div>
    );
}
