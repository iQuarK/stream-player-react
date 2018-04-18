import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Feed.css";

class Feed extends Component {
    static propTypes = {
        socket: PropTypes.object
    };

    state = {
        list: []
    };

    componentWillMount = () => {
        this.props.socket.on("feed", data => {
            this.setState({ list: [...this.state.list, data] });
        });
    };

    render() {
        const { list } = this.state;

        return (
            <div className="feed">
                <div className="feed-title">Feed:</div>
                <div>
                    {list.map(item => (
                        <div className="feed-item" key={item}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Feed;
