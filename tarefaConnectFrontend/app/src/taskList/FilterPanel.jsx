export function FilterPanel({ setRating, distance, setDistance, handleCategory }) {

    return (
        <div className='FilterPanelContainer'>
            <div>
                <label className='FilterPanelTitle'> Filter Results </label>
            </div>
            <div className='FilterSection'>
                <label className='FilterHeader'> Category: </label>
                <div className="FilterBox">
                    <input name="FilterCheckbox" className='FilterCheckbox' id="0" type='checkbox' onChange={() => { handleCategory("plumbing") }} />
                    <label> Plumbing </label>
                </div>
                <div className="FilterBox">
                    <input name="FilterCheckbox" className='FilterCheckbox' id="1" type='checkbox' onChange={() => { handleCategory("electrical") }} />
                    <label> Electrical </label>
                </div>
                <div className="FilterBox">
                    <input name="FilterCheckbox" className='FilterCheckbox' id="2" type='checkbox' onChange={() => { handleCategory("gardening") }} />
                    <label> Gardening </label>
                </div>
                <div className="FilterBox">
                    <input name="FilterCheckbox" className='FilterCheckbox' id="3" type='checkbox' onChange={() => { handleCategory("domestic") }} />
                    <label> Domestic Cleaning </label>
                </div>
                <div className="FilterBox">
                    <input name="FilterCheckbox" className='FilterCheckbox' id="4" type='checkbox' onChange={() => { handleCategory("dog") }} />
                    <label> Dog Walking </label>
                </div>
                <div className="FilterBox">
                    <input name="FilterCheckbox" className='FilterCheckbox' id="5" type='checkbox' onChange={() => { handleCategory("other") }} />
                    <label> Other </label>
                </div>
            </div>
            <div className='FilterSection'>
                <label className='FilterHeader'> Maximum Distance: </label>
                <div className="DistanceSlider">
                    <input className='DistanceFilter' id='DistanceFilter' type='range'
                        min="0" max="10" steps="1" defaultValue="5" onChange={(e) => setDistance(e.target.value)} />
                    <label> {distance === -1 ? 5 : distance} km </label>
                </div>
            </div>
            <div className="FilterSection">
                <label className="FilterHeader"> Minimum Rating: </label>
                <div className="rate" id='rate'>
                    <input type="radio" id="star5" name="rate" value="5" onChange={() => setRating(5)} />
                    <label htmlFor="star5" title="5 stars"></label>
                    <input type="radio" id="star4" name="rate" value="4" onChange={() => setRating(4)} />
                    <label htmlFor="star4" title="4 stars"></label>
                    <input type="radio" id="star3" name="rate" value="3" onChange={() => setRating(3)} />
                    <label htmlFor="star3" title="3 stars"></label>
                    <input type="radio" id="star2" name="rate" value="2" onChange={() => setRating(2)} />
                    <label htmlFor="star2" title="2 stars"></label>
                    <input type="radio" id="star1" name="rate" value="1" onChange={() => setRating(1)} />
                    <label htmlFor="star1" title="1 star"></label>
                </div>
            </div>
        </div>
    );
}
