import Sentencer from 'sentencer'
import { uniqueNamesGenerator, adjectives, animals, colors } from "unique-names-generator"
import Generate from "name-creator"


// eslint-disable-next-line no-extend-native
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};


export default class AlbumChanceTable {
    constructor(artist) {
        this.table = []
        this.total = 0
        this.init(artist)
    }

    init(artist) {
        this.table.push(
            { value: uniqueNamesGenerator({length: Math.ceil(Math.random() * 2), dictionaries: [adjectives, animals, colors], style: "capital", separator: " "}), weight: 10 },
            { value: Generate({words: 1 + Math.random() * 3}).spaced.toProperCase(), weight: 10 },
            { value: Sentencer.make("The {{ noun }}").toProperCase(), weight: 10 },
            { value: Sentencer.make("{{ nouns }}").toProperCase(), weight: 10 },
            { value: Sentencer.make("{{ adjective }}").toProperCase(), weight: 10 },
            { value: Sentencer.make("{{ an_adjective }} {{ noun }}").toProperCase(), weight: 10 },
            { value: Sentencer.make("{{ noun }}{{ noun }}").toProperCase(), weight: 2 },
            { value: artist, weight: 2 })
        this.calcTotal()
    }

    calcTotal() {
        for (let entry of this.table) {
            this.total += entry.weight
        }
    }

    get() {
        let r = Math.random() * this.total
        let i = 0
        while (r > this.table[i].weight) {
            r -= this.table[i].weight
            i++
        }
        return this.table[i].value
    }
}