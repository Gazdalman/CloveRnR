const RewardsGained = ({ rewards, id }) => {
  return (
    <div id="rewards-gained">
      <h3>Rewards Gained</h3>
      <div id="rewards-gained-container">
        {rewards.map((reward) => (
          <div className="reward-gained-container" key={reward.id}>
            <div className="reward-gained-image">
              <img id="reward-img" src={reward.image} alt="reward" />
            </div>
            <div className="reward-gained-details">
              <h4 id="rg-title">{reward.title}</h4>
              <p>{reward.description}</p>
              <p>Estimated Delivery: {reward.deliveryDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default RewardsGained
