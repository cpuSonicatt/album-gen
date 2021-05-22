import React, { Component } from 'react';
import "../style/root.css"
import Generate from "name-creator"
import RandPerson from "node-random-name"
import { uniqueNamesGenerator, adjectives, animals, colors, languages } from "unique-names-generator"
import { Person, Album, Cached } from "@material-ui/icons"

// eslint-disable-next-line no-extend-native
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

// eslint-disable-next-line no-extend-native
Number.prototype.between = function (x, y) {
    return (this > x && this < y)
};

// eslint-disable-next-line no-extend-native
Array.prototype.shuffle = function() {
    var i = this.length, j, temp;
    if ( i === 0 ) return this;
    while ( --i ) {
       j = Math.floor( Math.random() * ( i + 1 ) );
       temp = this[i];
       this[i] = this[j];
       this[j] = temp;
    }
    return this;
  }

export default class Root extends Component {

    constructor() {
        super()
        this.state = {
            cover: "",
            album: "",
            artist: "",
            isLoad: false
        }

    }

    componentDidMount() {
        this.generate()
    }

    generate = () => {
        this.generateCover()
        this.generateAlbum()
        this.generateArtist()
    }

    generateCover = () => {
        this.setState({
            cover: "https://picsum.photos/1000?random=" + Math.random() 
        })
    }

    generateAlbum = () => {
        if (Math.random().between(0,0.75)) {
            let dict =  [adjectives, animals, colors, adjectives, animals, colors, languages].shuffle()
            this.setState({
                album: uniqueNamesGenerator({length: Math.ceil(Math.random() * 3) ,dictionaries: dict, style: "capital", separator: " "})
            })
        } else {
            this.setState({
                album: Generate({words: 1 + Math.random() * 3}).spaced.toProperCase()
            })
            
        }
    }

    generateArtist = () => {
        let artist = ""
        if (Math.random().between(0,0.15)) {
            artist = RandPerson()
        } else if (Math.random().between(0,0.25)) {
            artist = Generate({words: 1}).spaced.toProperCase()
        } else if (Math.random().between(0,0.25)) {
            artist = uniqueNamesGenerator({length: 2 ,dictionaries: [adjectives, animals, colors].shuffle(), style: "capital", separator: " "})
        } else if (Math.random().between(0,0.25)) {
            artist = uniqueNamesGenerator({length: 1 ,dictionaries: [adjectives, animals, colors].shuffle(), style: "capital", separator: " "})
        } else {
            artist = Generate({words: 1 + Math.random() * 2}).spaced.toProperCase()
        }
        this.setState({
            artist: artist
        })
    }

    render() {
        return (
            <div>
                <h1>This album doesn't exist.</h1>
                <div className="center">
                    {this.state.isLoad ? null :
                        <div className="full"/>
                    }
                    <img className="cover" onLoad={() => this.setState({isLoad: true})} src={this.state.cover} alt=""/>
                    <div className="details">
                        <Album className="icon"/><p>{this.state.album}</p>
                    </div>
                    <div className="details">
                        <Person className="icon"/><p>{this.state.artist}</p>
                    </div>
                </div>
                
                <div className="menu">
                    <li>
                        <p className="menu-p foot"><i>Photos from <a href="https://picsum.photos/">Lorem Picsum</a></i></p>  
                        <p className="menu-p right">Generate another banger:</p>
                        <ul><button onClick={() => this.generate()}><Cached className="menu-icon"/></button></ul>
                                          
                    </li>
                </div>
            </div>
        )
    }
}