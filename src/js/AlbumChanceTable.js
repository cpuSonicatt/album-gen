import { uniqueNamesGenerator, adjectives, animals, colors } from "unique-names-generator"
import Generate from "name-creator"
import nouns from "../resources/words/nouns"
import adjectivez from "../resources/words/adjectives"
import pluralize from "pluralize"
import randy from "randy"
import articals from "articles"
import fake from "fake-words"
import randomName from "random-name"
import faker from "faker"


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

            { value: `The ${randy.choice(nouns)}`.toProperCase(), weight: 10 },
            { value: `${randy.choice(nouns)}`.toProperCase(), weight: 10 },
            { value: `${pluralize(randy.choice(nouns))}`.toProperCase(), weight: 10 },
            { value: `${randy.choice(adjectivez)}`.toProperCase(), weight: 10 },
            { value: `${articals.articlize(randy.choice(adjectivez))} ${randy.choice(nouns)}`.toProperCase(), weight: 10 },
            { value: `${randy.choice(adjectivez)} and ${randy.choice(adjectivez)}`.toProperCase(), weight: 10 },
            { value: `${randy.choice(nouns)}${randy.choice(nouns)}`.toProperCase(), weight: 2 },

            { value:  `Live at ${faker.address.city()}`, weight: 1},
            { value:  `Live at the ${randomName.place()}`, weight: 1},
            
            { value: `${artist}: Greatest Hits`, weight: 1000 },
            { value: `The Very Best of ${artist}`, weight: 1000 },

            { value: fake.word().toProperCase(), weight: 2 },

            { value: artist, weight: 5 })
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