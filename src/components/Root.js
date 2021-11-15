import React, { Suspense } from 'react';
import "../style/root.css"
import Generate from "name-creator"
import RandPerson from "node-random-name"
import { uniqueNamesGenerator, adjectives, animals, colors } from "unique-names-generator"
import { prominent } from 'color.js'
import { Cached } from "@material-ui/icons"
import chroma from "chroma-js";
import AlbumChanceTable from '../js/AlbumChanceTable';
import webfont from 'webfontloader';


const AlbumInfo = React.lazy(() => import("./AlbumInfo"));
const API_KEY = 'AIzaSyDDiO8nLVRMDaXwrJp61Cdcar5gFmmiR1Q'; //change me



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


export default class Root extends React.Component {

    constructor() {
        super()
        this.state = {
            cover: "",
            album: "",
            artist: "",
            gradTop: "#F7F4F3",
            gradBot: "#F7F4F3",
            tColTop: "",
            tColBot: "",
            font: ""
        }

    }

    componentDidMount() {
        this.generate()
    }

    generate = async () => {
        this.setState({
            cover: "",
            album: "",
            artist: "",
            gradTop: "#F7F4F3",
            gradBot: "#F7F4F3",
            tColTop: "",
            tColBot: "",
            font: ""
        })
        await this.generateCover()
        this.generateArtist()
        this.generateAlbum()
        this.genereateFont()
    }

    generateCover = async () => {

        let id = await (await fetch("https://picsum.photos/1000?random=" + Math.random())).headers.get("picsum-id")
        let url = `https://picsum.photos/id/${id}/1000/1000`


        const colours = await prominent(url, { amount: 2, format: "hex"})

        this.setState({
            cover: url,
            gradTop: chroma(colours[0]).desaturate().hex(),
            gradBot: chroma(colours[1]).desaturate().hex(),
            tColTop: this.getTextColour(colours[0]),
            tColBot: this.getTextColour(colours[1])
        })
    }

    generateAlbum = () => {

        const act = new AlbumChanceTable(this.state.artist)
        this.setState({
            album: act.get()
        })

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

    genereateFont = async () => {
        try {
            const result = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + API_KEY)
            const data = await result.json()
            let randomFont = data.items[Math.floor(Math.random() * data.items.length)].family
            console.log(randomFont)
            webfont.load({
                google: {
                    families: [randomFont]
                }
            });
            this.setState({
                font: randomFont
            })
        } catch (error) {
            console.log('loadFontsList', error, error.message);
        }
    }

    getTextColour(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        var col = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        };
        if ((col.r * 0.299) + (col.g * 0.587) + (col.b * 0.114) > 186) {
            return "black" // change me
        } else {
            return "white"
        }
    }

    render() {
        document.body.style.background = `linear-gradient(${this.state.gradTop}, ${this.state.gradBot}) fixed`;
        return (
            <div>
                <div>
                    <h1 style={{color: this.state.tColTop}}>This album doesn't exist.</h1>
                    <Suspense fallback={<h1 className="black">loading fuck fuck fuck fuck fuck </h1>}>
                        <AlbumInfo
                            cover={this.state.cover}
                            album={this.state.album} showAlbum={Math.random() < 0.75}
                            artist={this.state.artist}
                            textCol={this.state.tColBot}
                            font={this.state.font}
                        />
                    </Suspense>
                </div>
                
                <div className="menu">
                    <li>
                        <p className="menu-p foot white"><i>Photos from <a href="https://picsum.photos/">Lorem Picsum</a></i></p>  
                        <p className="menu-p right white">Generate another banger:</p>
                        <ul><button onClick={() => this.generate()}><Cached className="menu-icon"/></button></ul>
                    </li>
                </div>
            </div>
        )
    }
}