import { useState } from "react";

const Location = ({ location, setLocation }) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div id="location-form-div">
      <div id="location-info">
        <h2>Location</h2>
        <div id="location-description">
          <p>Add a location that your project is
            based out of. Don't worry about being specific... or making it a
            real place! We'll be "paying" you in Freedom Paper anyway! </p>
          <p style={{ "color": "red" }}>(Make it at least 5 characters though... yuh rube...)</p>
        </div>
      </div>
      <div id="location-input" className={`floating-input ${isFocused ? 'focused' : ''}`}>
        <input
          type="text"
          maxLength={50}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`location-input input-field ${isFocused ? "focused-input" : null}`}
        />
        <span><span style={location.length < 5 ? {"color": "red"} : {color: "green"}} id="curr-length">{location.length}</span>/50</span>
      </div>
    </div>
  )
}

export default Location
