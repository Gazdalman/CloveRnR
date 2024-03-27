import { useEffect, useState } from "react"
import PhotoField from "../../utilities/PhotoField";
import { useHistory, useParams } from "react-router-dom";
import RewardItemForm from "../../ProjectForm/Rewards/RewardItem";
import { useDispatch } from "react-redux";
import { editReward } from "../../../store/project";
import { useModal } from "../../../context/Modal";
import { setRequestedProject } from "../../../store/userProjects";


const PPEditRewardTab = ({ reward, projectId, setShowForm, setReward }) => {
  const dispatch = useDispatch()
  const history = useHistory();
  const {closeModal} = useModal()
  const [focused, setFocused] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false)
  const [index, setIndex] = useState(1)
  const [selectedIndex, setSelectedIndex] = useState("")
  const [rewardTitle, setRewardTitle] = useState(reward.title)
  const [itemForm, setItemForm] = useState(false)
  const [selectedShipping, setSelectedShipping] = useState(reward.shipping);
  const [selectedQuantity, setSelectedQuantity] = useState(reward.unlimited ? "unlimited" : "limited")
  const [selectedItem, setSelectedItem] = useState(reward.physicalItems == true ? "true" : "false")
  const [amount, setAmount] = useState(reward.amount)
  const [image, setImage] = useState("")
  const [imageURL, setImageURL] = useState(reward.image)
  const [description, setDescription] = useState(reward.description)
  const [physicalItems, setPhysicalItems] = useState(reward.physicalItems)
  const [deliveryDate, setDeliveryDate] = useState(new Date(reward.deliveryDate).toISOString().split("T")[0])
  const [shipping, setShipping] = useState(reward.shipping)
  const [unlimited, setUnlimited] = useState(reward.unlimited)
  const [quantity, setQuantity] = useState(reward.quantity)
  const [errors, setErrors] = useState("")
  const today = new Date().toISOString().split("T")[0];

  const cancel = (e) => {
    e.preventDefault()
    setShowForm("")
  }

  const handleFocus = (field) => {
    setFocused(field);
  };

  const handleBlur = (field) => {
    setFocused("");
    if (field == "quantity") {
      setQuantity(quantity ? Math.round(quantity) : 1)
    }
  };


  const handleItemChange = (e) => {
    setPhysicalItems(e.target.value)
    setSelectedItem(e.target.value)
    setShipping("")
    setSelectedShipping("")
  }

  const handleShippingChange = (e) => {
    setShipping(e.target.value)
    setSelectedShipping(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setUnlimited(e.target.value)
    setSelectedQuantity(e.target.value);
    if (e.target.value == "unlimited") {
      setQuantity("")
    }
  };

  const changeDate = () => {
    const selectedDate = new Date(deliveryDate ? deliveryDate : today);

    // Extract month and year
    const month = selectedDate.toLocaleString('default', { month: 'long' });
    const year = selectedDate.getFullYear();
    return `${month} ${year}`
  }

  const handleRewardSubmit = async (e) => {
    e.preventDefault()

    const rewardData = new FormData()
    rewardData.append("title", rewardTitle)
    if (image) rewardData.append("image", image)
    rewardData.append("amount", amount)
    if (description) rewardData.append("description", description)
    rewardData.append("physicalItems", physicalItems)
    rewardData.append("unlimited", unlimited)
    rewardData.append("deliveryDate", deliveryDate)
    if (quantity) rewardData.append("quantity", quantity)
    rewardData.append("shipping", shipping)

    setLoading(true)

    const res = await dispatch(editReward(rewardData, reward.id))

    if (!res.errors) dispatch(setRequestedProject(projectId))

    setShowForm("")

  }

  useEffect(() => {
    if (rewardTitle.length > 3 &&
      (image || reward.image) &&
      shipping &&
      deliveryDate &&
      amount
    ) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }

    if (selectedQuantity == "limited" && !quantity) {
      setDisabled(true)
    }
    // console.log(physicalItems);
  })

  return !loading ? (
    <div id="reward-form-div">
      <div id="reward-input-container">
        <form id="reward-form" onSubmit={handleRewardSubmit} encType="multipart/form-data">
          <h1 id="reward-form-header">Edit a Reward</h1>
          <div className={`reward-title-field floating-input ${focused == "title" ? 'focused' : ''}`}>
            <label className={`rtf-label input-label ${focused == "title" || rewardTitle ? 'label-focus' : ''}`}>
              {focused == "title" || rewardTitle ? "Title" : "Title*"}
            </label>
            <input
              type="text"
              value={rewardTitle}
              onChange={(e) => setRewardTitle(e.target.value)}
              onFocus={(e) => handleFocus("title", e)}
              onBlur={handleBlur}
              className="rtf-input input-field"
            />
            <span id="length-counter"><span style={rewardTitle.length > 5 ? { "color": "green" } : { "color": "red" }}>{rewardTitle.length}</span>/50</span>
          </div>
          {errors.email ? <p className="field-req">{errors.email}</p> : <p className="field-req">Give us a nice title for your reward.</p>}
          <div className={`reward-amount-field floating-input ${focused == "amount" ? 'focused' : ''}`}>
            <label className={`raf-label input-label ${focused == "amount" || amount ? 'label-focus' : ''}`}>
              {focused == "amount" || rewardTitle ? "Amount" : "Amount*"}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onFocus={() => handleFocus("amount")}
              onBlur={handleBlur}
              className="raf-input input-field"
            />

          </div>
          {errors.email ? <p className="field-req">{errors.email}</p> : <p className="field-req">Set the amount a backer has to pledge to earn this reward</p>}
          <div id="reward-dnd-box">
            <PhotoField
              image={image}
              setImage={setImage}
              setImageURL={setImageURL}
              imageURL={imageURL}
            />
          </div>
          <div id="reward-description-field" className={`reward-description-field floating-input ${focused == "description" ? 'focused' : ''}`}>
            <label className={`rdf-label input-label ${focused == "description" || description ? 'label-focus' : ''}`}>
              {focused == "description" || description ? "Description" : "Description (Optional)"}
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={() => handleFocus("description")}
              onBlur={handleBlur}
              className="rdf-input input-field"
            />
            <span id="length-counter"><span style={{ "color": "green" }}>{description ? description.length : 0}</span>/2000</span>
          </div>
          <div id="pi-div">
            <p>Choose the types of items*</p>
            <div id="physical-items">
              <label>
                <input
                  value="true"
                  type="radio"
                  checked={selectedItem == "true"}
                  onChange={handleItemChange}
                />
                Physical Items
              </label>
              <label>
                <input
                  value="false"
                  type="radio"
                  checked={selectedItem == "false"}
                  onChange={handleItemChange}
                />
                Digital Goods Only
              </label>
            </div>
          </div>
          <div id="sr-div">
            <p>Choose your shipping type*</p>
            <div id="shipping-radio">
              <label className="shipping-option">
                <input
                  disabled={selectedItem == "false"}
                  type="radio"
                  value="Ships to anywhere"
                  checked={selectedShipping === "Ships to anywhere"}
                  onChange={handleShippingChange}
                />
                Ships to anywhere in the world
              </label>
              <label className="shipping-option">
                <input
                  disabled={selectedItem == "false"}
                  type="radio"
                  value="Local event"
                  checked={selectedShipping === "Local event"}
                  onChange={handleShippingChange}
                />
                Local pickup (not sketchy AT ALL), event, or service (no shipping)
              </label>
              <label className="shipping-option">
                <input
                  disabled={selectedItem == "true"}
                  type="radio"
                  value="Digital rewards"
                  checked={selectedShipping === "Digital rewards"}
                  onChange={handleShippingChange}
                />
                Digital Reward (no shipping)
              </label>
            </div>
          </div>
          {selectedShipping && <input
            value={deliveryDate}
            type="date"
            min={today}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="input-field"
          />}
          <div id="quant-div">
            <p>Choose the quantity of this reward available*</p>
            <div id="quantity-input-field">
              <label>
                <input
                  value="unlimited"
                  type="radio"
                  checked={selectedQuantity === "unlimited"}
                  onChange={handleQuantityChange}
                />
                Unlimited
              </label>
              <label>
                <input
                  value="limited"
                  type="radio"
                  checked={selectedQuantity === "limited"}
                  onChange={handleQuantityChange}
                />
                Limited
              </label>
            </div>
            {selectedQuantity == "limited" &&
              <div className={`reward-quantity-field floating-input ${focused == "quantity" ? 'focused' : ''}`}>
                <label className={`rqf-label input-label ${focused == "quantity" || quantity != "" ? 'label-focus' : ''}`}>
                  Quantity*
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  onFocus={() => handleFocus("quantity")}
                  onBlur={() => handleBlur("quantity")}
                  className="rqf-input input-field"
                />
              </div>
            }
            </div>
          <div id="reward-preview-div">
            <div id="reward-preview">
              <div id="preview-image">
                <img src={imageURL} />
              </div>
              <div id="preview-mid">
                <h3>Pledge ${amount ? amount : 1} or more</h3>
                <h4>{rewardTitle ? rewardTitle : "Totally Legit Project Title Here"}</h4>
                <h5>{description ? description : "This is where the description of your pyramid scheme will go."}</h5>
                <h6>Includes:</h6>
                <ul>
                  {reward.items.length > 0 ? reward.items.map(item => (
                    <h6 key={item.title}>
                      <li>{item.quantity > 1 ? `${item.quantity}x` : ""} {item.title}</li>
                    </h6>
                  )) : <h5>No items listed</h5>
                  }
                </ul>
                <h6>ESTIMATED DELIVERY</h6>
                <h5>{changeDate()}</h5>
                <h6>REWARD QUANTITY</h6>
                <h5>{selectedQuantity == "unlimited" ? "Unlimited" : (quantity ? Math.round(quantity) : 1)}</h5>
              </div>
            </div>
          </div>
          <button id="create-reward" disabled={disabled} >Edit Reward</button>
        </form>
        <div id="cancel-div">
          <button onClick={cancel}>Cancel</button>
        </div>
      </div>
    </div >

  ) : <h1>We Loadin...</h1>
}

export default PPEditRewardTab
