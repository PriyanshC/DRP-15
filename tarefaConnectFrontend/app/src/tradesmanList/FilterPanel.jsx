export function FilterPanel({ setRating, distance, setDistance }) {

    return (
        <div className='FilterPanel'>
            <div>
                <label className='FilterPanelTitle'> Filter Results </label>
            </div>
            <div className='FilterSection'>
                <label className='FilterHeader'> Field of work: </label>
                <div className="FilterBox">
                    <input className='FilterCheckbox' type='checkbox' />
                    <label> Home </label>
                </div>
                <div className="FilterBox">
                    <input className='FilterCheckbox' type='checkbox' />
                    <label> Garden </label>
                </div>
                <div className="FilterBox">
                    <input className='FilterCheckbox' type='checkbox' />
                    <label> Electrical </label>
                </div>
                <div className="FilterBox">
                    <input className='FilterCheckbox' type='checkbox' />
                    <label> Water </label>
                </div>
            </div>
            <div className='FilterSection'>
                <label className='FilterHeader'> Maximum Distance: </label>
                <div className="DistanceSlider">
                    <input className='DistanceFilter' id='DistanceFilter' type='range'
                        min="0" max="10" steps="1" defaultValue="5" onChange={(e) => setDistance(e.target.value)} />
                    <label> {distance == null ? 5 : distance} km </label>
                </div>
            </div>
            <div className="FilterSection">
                <label className='FilterHeader'> Relation: </label>
                <div className="Relations">
                    <div className="FilterBox">
                        <input className='FilterCheckbox' type='checkbox' />
                        <label> Endorsed </label>
                    </div>
                    <div className="FilterBox">
                        <input className='FilterCheckbox' type='checkbox' />
                        <label> Friend </label>
                    </div>
                    <div className="FilterBox">
                        <input className='FilterCheckbox' type='checkbox' />
                        <label> Endorsed by a Friend </label>
                    </div>
                </div>
            </div>
            <div className="FilterSection">
                <label className="FilterHeader"> Minimum Rating: </label>
                <div class="rate" id='rate'>
                    <input type="radio" id="star5" name="rate" value="5" onChange={() => setRating(5)} />
                    <label for="star5" title="5 stars"></label>
                    <input type="radio" id="star4" name="rate" value="4" onChange={() => setRating(4)} />
                    <label for="star4" title="4 stars"></label>
                    <input type="radio" id="star3" name="rate" value="3" onChange={() => setRating(3)} />
                    <label for="star3" title="3 stars"></label>
                    <input type="radio" id="star2" name="rate" value="2" onChange={() => setRating(2)} />
                    <label for="star2" title="2 stars"></label>
                    <input type="radio" id="star1" name="rate" value="1" onChange={() => setRating(1)} />
                    <label for="star1" title="1 star"></label>
                </div>
            </div>
        </div>
    );
}
