import { useState } from "react";


const MainCategory = ({ mainCategory, mainSubcat, setMainCategory, setMainSubcat, categories }) => {

  return (
    <div id="main-cat-form">
      <div id="main-cat-info">
        <h2>Main Category</h2>
        <div id="main-category-description">
          <p>This is what we will use when you pay us enough to care to implement filtering and searching.</p>
        </div>
      </div>
      <div id="main-cat-fields">
        <span id="main-cat-input">
          <label id="main-cat-label">Main Category</label>
          <select
            className="input-field"
            value={mainCategory}
            onChange={(e) => {
              setMainSubcat("")
              setMainCategory(e.target.value)
            }}
          >
            <option value="">--Select--</option>
            {Object.keys(categories).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </span>
        <span id="main-subcat-input">
          <label id="main-subcat-label">Main SubCategory</label>
          <select
            className="input-field"
            disabled={!mainCategory}
            value={mainSubcat}
            onChange={(e) => setMainSubcat(e.target.value)}
          >
            <option value="">--Select--</option>
            {mainCategory && categories[mainCategory].map(sub => (
              <option value={sub} key={sub}>{sub}</option>
            ))}
          </select>
        </span>
      </div>
    </div>
  );
}

export default MainCategory
