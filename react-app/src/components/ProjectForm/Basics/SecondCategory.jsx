const SecondCategory = ({
  setSecondCat,
  secondCat,
  secondSubcat,
  setSecondSubcat,
  categories
}) => {

  return (
    <div id="second-cat-form">
      <div id="second-cat-info">
        <h2>Second Category</h2>
        <div id="second-category-description">
          <p>This doesn't really matter. Don't ask me why it's here! Ask the moron who built the site! Oh...</p>
        </div>
      </div>
      <div id="second-cat-fields">
        <span id="second-cat-input">
          <label id="second-cat-label">Second Category</label>
          <select
            className="input-field"
            value={secondCat}
            onChange={(e) => {
              setSecondSubcat("")
              setSecondCat(e.target.value)
            }}
          >
            <option value="">--Select--</option>
            {Object.keys(categories).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </span>
        <span id="second-subcat-input">
          <label id="second-subcat-label">Second SubCategory</label>
          <select
            disabled={!secondCat}
            className="input-field"
            value={secondSubcat}
            onChange={(e) => setSecondSubcat(e.target.value)}
          >
            <option value="">--Select--</option>
            {secondCat && categories[secondCat].map(sub => (
              <option value={sub} key={sub}>{sub}</option>
            ))}
          </select>
        </span>
      </div>
    </div>
  )
}

export default SecondCategory
