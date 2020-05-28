# GMBinder Spell List Generator
A simple spell list generator based on spells, suitable for GMBinder markup.

### [Visit the site](https://enderlook.github.io/GMBinder-Spell-List-Generator/)

## Sort Spells
                                
You simply must to introduce the text of all the spells you want to sort.

Actually it can sort more than just spells. To be exact, it only sort texts which has a title of #### (4 times "#"). For example, the following texts will be sorted:

```
##### I'll be sorted!
That includes me!
And me!

Me too!

<img src="An me!!/>
All of us will be sorted next to the title from above ^

##### This is another text that will be sorted
*1st-level transmutation (ritual)*
___
- **Casting Time:** 1 action
- **Range:** Touch
- **Components:** V, S
- **Duration:** Concentration, up to 1 hour
___
The whole spell counts

####There is no need to have a whitespace between the # symbols and the title.
The scripts adds it automatically as it sort them!
```

Be warned that the script can not add nor remove "\pagebreak", "\pagebreaknum" nor "\columnbreak", that must be done manually by you.

## Make Spell List button:

Each spell must include a "- **Classes:**" item in its spell block (it is not mandatory to be at the end of the spell block).

For example:

```
#### Generic spell
*1st-level transmutation (ritual)*
___
- **Casting Time:** 1 action
- **Range:** Touch
- **Components:** V, S
- **Duration:** Concentration, up to 1 hour
- **Classes:** Sorcerer, Wizard
___
You touch a creature and perform a generic spell on it.
```

Alternatively, you can write the classes below the name, as:

```
#### Generic spell
*1st-level transmutation (ritual), Sorcerer, Wizard*
___
- **Casting Time:** 1 action
- **Range:** Touch
- **Components:** V, S
- **Duration:** Concentration, up to 1 hour
___
You touch a creature and perform a generic spell on it.
```

The script will automatically create an spell list will all the spells listed.

Additionally, you can choose to include the spell school in the list, the ritual tag, or remove empty titles in the spell lsit (for example, if you don't have in 5th level wizard spell, the sub title 5th level can be removed).

### Feedback
If you have any suggestion or bug report, just raise an issue.
