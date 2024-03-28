import React from 'react'

const AddUser1 = () => {
    ('#exampleModal').on('show.bs.modal', function (event) {
        var button = (event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = (this)
        modal.find('.modal-title').text('New message to ' + recipient)
        modal.find('.modal-body input').val(recipient)
      })
 
  return (
    <div>
  <>
  <button
    type="button"
    className="btn btn-primary"
    data-toggle="modal"
    data-target="#exampleModal"
    data-whatever="@mdo"
  >
    Open modal for @mdo
  </button>
  <button
    type="button"
    className="btn btn-primary"
    data-toggle="modal"
    data-target="#exampleModal"
    data-whatever="@fat"
  >
    Open modal for @fat
  </button>
  <button
    type="button"
    className="btn btn-primary"
    data-toggle="modal"
    data-target="#exampleModal"
    data-whatever="@getbootstrap"
  >
    Open modal for @getbootstrap
  </button>
  <div
    className="modal fade"
    id="exampleModal"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            New message
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label htmlFor="recipient-name" className="col-form-label">
                Recipient:
              </label>
              <input type="text" className="form-control" id="recipient-name" />
            </div>
            <div className="form-group">
              <label htmlFor="message-text" className="col-form-label">
                Message:
              </label>
              <textarea
                className="form-control"
                id="message-text"
                defaultValue={""}
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button type="button" className="btn btn-primary">
            Send message
          </button>
        </div>
      </div>
    </div>
  </div>
</>


      
    </div>
  )
}

export default AddUser1
