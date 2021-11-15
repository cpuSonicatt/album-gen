import React from 'react';
import "../style/root.css"
import { Person, Album, Web } from "@material-ui/icons"


const pos = ["tl", "tc", "tr", "cl", "dc", "cr", "bl", "bc", "br"]
// top-left, top-center, top-right, center-left, dead-center, center-right, bottom-left, bottom-center, bottom-right


export default class AlbumInfo extends React.Component {

    getRandomPos() {
        return pos[Math.floor(Math.random() * pos.length)]
    }



    render() {
        return(
            <div className="center" >
                <div className="cover-container">
                    <img className="cover" src={this.props.cover} alt=""/>
                    {this.props.showAlbum && <h2 className={this.getRandomPos()} style={{fontFamily: this.props.font}}>{this.props.album}</h2>}
                </div>
                <div className="details">
                    <Album className="icon" style={{color: this.props.textCol}}/><p style={{color: this.props.textCol}}>{this.props.album}</p>
                </div>
                <div className="details">
                    <Person className="icon" style={{color: this.props.textCol}}/><p style={{color: this.props.textCol}}>{this.props.artist}</p>
                </div>
            </div>
        )
    }

}