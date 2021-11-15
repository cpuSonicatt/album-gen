import nouns from "../resources/words/nouns"
import adjectives from "../resources/words/adjectives"
import pluralize from "pluralize"
import randy from "randy"

const VOWELS = ["a", "e", "i", "o", "u"]

export default function make(template) {
    let result = template
    result.replaceAll("{{ noun }}", randy.choice(nouns))
    result.replaceAll("{{ nouns }}", pluralize(randy.choice(nouns)))


    return result
}
