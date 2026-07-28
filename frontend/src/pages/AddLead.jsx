import "./AddLead.css";

const AddLead = () => {
  return (
    <div className="add-lead-page">

      <div className="page-header">
        <h1>Add New Lead</h1>
        <p>Create a new lead in CRM</p>
      </div>

      <form className="lead-form">

        <div className="form-grid">

          <div className="form-group">
            <label>Lead Name</label>
            <input type="text" placeholder="Enter lead name" />
          </div>

          <div className="form-group">
            <label>Company</label>
            <input type="text" placeholder="Company Name" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Email Address" />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="text" placeholder="Phone Number" />
          </div>

          <div className="form-group">
            <label>Lead Source</label>

            <select>
              <option>Website</option>
              <option>Instagram</option>
              <option>LinkedIn</option>
              <option>Facebook</option>
              <option>Referral</option>
            </select>

          </div>

          <div className="form-group">
            <label>Status</label>

            <select>
              <option>New</option>
              <option>Proposal</option>
              <option>Deposit</option>
              <option>Follow Up</option>
              <option>Meeting Follow Up</option>
              <option>Won</option>
              <option>Lost</option>
            </select>

          </div>

          <div className="form-group">
            <label>Setter</label>
            <input type="text" placeholder="Setter Name" />
          </div>

          <div className="form-group">
            <label>Closer</label>
            <input type="text" placeholder="Closer Name" />
          </div>

          <div className="form-group">
            <label>Meeting Date</label>
            <input type="date" />
          </div>

          <div className="form-group">
            <label>Deal Value ($)</label>
            <input type="number" placeholder="5000" />
          </div>

        </div>

        <div className="form-group">

          <label>Notes</label>

          <textarea
            rows="5"
            placeholder="Write Notes..."
          ></textarea>

        </div>

        <button className="submit-btn">
          Save Lead
        </button>

      </form>

    </div>
  );
};

export default AddLead;