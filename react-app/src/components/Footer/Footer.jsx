const Footer = () => {
  return (
    <div id="footer-div">
      <div id="contact-links">
        <div>Copyright @2023</div>
        <div>
        <h4 id="footer-h4">Wanna see more of me? Check me out on:</h4>
        <div id="actual-contact-links">
          <a target="blank" className="link" id="acl-link" href="https://github.com/gazdalman"><i className="fab fa-github fa-inverse" /> Github</a>
          <a target="blank" className="link" id="acl-link" href="https://www.linkedin.com/in/toney-winston-53bb21141/"><i className="fab fa-linkedin fa-inverse" /> LinkedIn</a>
          <a target="blank" className="link" id="acl-link" href="https://gazdalman.github.io/"><i className="fas fa-user-circle fa-inverse" /> Portfolio</a>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Footer
