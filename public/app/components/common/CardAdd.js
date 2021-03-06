import React from 'react'
import { Link } from 'react-router'
import 'materialize-css/bin/materialize.css'
import 'main.css'

const CardAdd = (props) => {
  return (
    <div className="col s6 m4 l3">
        <div className="card blue-grey darken-1 small hoverable">
          <div className="card-content white-text card-add">
            <span className="card-title card-t-style">{props.title}</span>
            <hr />
            <Link to={props.link}>
              <i className="material-icons waves-effect waves-light">add</i>
            </Link>
          </div>
       </div>
    </div>
  )
}

export default CardAdd
