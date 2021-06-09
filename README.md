# Fake Album generator

https://albums.cpusonicatt.com

Generate fake albums and hope they sound like your kinda jam!

### How it works

- For covers: picks a random 1:1 image from [Lorem Picsum](https://picsum.photos/) at 1000px.
- For album names and artist names: picks a random sequence of words (usually used for generating unique URLs) between 1 and 3 words long

### Album name generation strategies

- A 75% chance for a sequence, between 1 and 3 words long, using the animals, colours, adjectives, and languages dictionaries provided by [Unique Names Generator](https://github.com/andreasonny83/unique-names-generator).
- Else, a sequence, between 1 and 3 words long, provided by [Name Creator](https://github.com/Robbie-Cook/name-creator).

### Artist name generation strategies

- A 15% chance for a person's name, provided by [Node Random Name](https://github.com/cscott/node-random-name)
- Else, a 25% chance for a 1 word name provided by [Name Creator](https://github.com/Robbie-Cook/name-creator).
- Else, a 25% chance for **1** word name using the animals, colours, adjectives, and languages dictionaries provided by [Unique Names Generator](https://github.com/andreasonny83/unique-names-generator).
- Else, a 25% chance for **2** word name using the animals, colours, adjectives, and languages dictionaries provided by [Unique Names Generator](https://github.com/andreasonny83/unique-names-generator).
- Else, a sequence, between 1 and 2 words long, provided by [Name Creator](https://github.com/Robbie-Cook/name-creator).

### Further improvements

- More comprehensive and realistic generation strategies.
  - use whatever word generation/dictionaries typing test sites use
  - perhaps using a _phrase_ generator which will hopefully include more articles.
  - specific combinations of words, like "\<colour\> \<noun\>", "\<adverb\> \<verb\>" etc.
  - more sources for images, like abstract, vintage, general patterns, etc
    - [GIFs Galore CD-ROM from 1992](https://archive.org/details/GifsGalore_Aug92)
  - numbers at the end of Album names (normal, Roman Numerals, word-ordinals like "first" or "second"). weighted range between 1-7 towards 1.
  - chance for the album name to be the same as the Artist name. (Like Rush by Rush)
  - chance for the album name to be "The Very Best of \<artist\>", "\<artist\>'s Greatest Hits", etc.
  - chance for album to be a live recording ("Live in/at \<location\> - \<year\>", alliterate artist and location, like "Rush in Rio")
- A chance for the album name and/or the artist name to appear as part of the cover.
  - this was attempted but randomly choosing a system font was a pain
  - positioning might be a pain too, perhaps limit it to 6-8 points on the cover.
  - can change the size, kerning, weight of the font, but not the font itself.
- A chance for the 'parental advisory' sticker to be present
  - should just be able to slap an image on the cover, at set locations.
- Mobile support.
  - looks like ass on mobile lol
