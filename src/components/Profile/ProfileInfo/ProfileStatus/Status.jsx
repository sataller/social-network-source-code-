import React from "react"
import styles from "./Status.module.css"

class Status extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true,
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        })
        this.props.updateStatus(this.state.status)
    }

    statusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
        // this.props.updateStatus(this.state.status)
    }

    componentDidUpdate(prevProps, prevState) {

        if(prevProps.status !== this.props.status){
            this.setState({status: this.props.status})
        }
    }

    render() {
        console.log("render")

        return (
            <div className={styles.status}>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode.bind(this)}> {this.props.status || "No status"}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input onChange={this.statusChange} autoFocus={true} value={this.props.status}
                           onBlur={this.deactivateEditMode.bind(this)}/>
                </div>
                }
            </div>
        )
    }
}

export default Status