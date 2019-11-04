let text = document.getElementById("text");
let includeRitual = document.getElementById("includeRitual");
let includeSchool = document.getElementById("includeSchool");
let schoolRange = document.getElementById("schoolRange");
let schoolInput = document.getElementById("schoolInput");
let schoolAddition = document.getElementById("schoolAddition");
let convert = document.getElementById("convert");
let clean = document.getElementById("clean");
let errors = document.getElementById("errors");
let errorsList = document.getElementById("errorsList");

includeSchool.addEventListener("change", () => {
    if (includeSchool.checked) {
        schoolAddition.removeAttribute("hidden");
    } else {
        schoolAddition.setAttribute("hidden", true);
    }
});

schoolRange.addEventListener("change", () => {
    schoolInput.value = schoolRange.value;
});
schoolRange.addEventListener("input", () => {
    schoolInput.value = schoolRange.value;
});

schoolInput.addEventListener("change", () => {
    schoolRange.value = schoolInput.value;
});
schoolInput.addEventListener("input", () => {
    schoolRange.value = schoolInput.value;
});

const regexSanitize = /\/\*.*?\*\//gsm;
const spellRegex = /#### ?((?:[\w'()]+ ?)+)\n\*(?:(\d)\w{2}-level )?(\w+)(?: (cantrip))?(?: (\(ritual\)))?(?:, ((?:\w+,? ?)+))?\*\n___\n((?:- \*\*(?:\w+ ?)+:\*\*[ \w\d,()\.'-]+\n)+)___/gm;
const classesRegex = /- \*\*Classes:\*\* ?((?:\w+,? ?)+)/m;

function sanitize(text) {
    return text.replace(regexSanitize, "");
}

function read(text, includeRitual, includeSchool) {
    let spellsByClass = {};

    function capitalize([firstLetter, ...rest]) {
        return [firstLetter.toUpperCase(), ...rest].join('');
    }

    for (let spell of text.matchAll(spellRegex)) {
        let name = spell[1];

        let classesMatch = classesRegex.exec(spell[7]);
        let classes;
        if (classesMatch == undefined) {
            if (spell[6] == undefined) {
                console.log(`Spell ${name} doesn't have a classes section.`);

                let il = document.createElement("li");
                il.innerHTML = `Spell <i>${name}</i> doesn't have a classes section.`;
                errorsList.appendChild(il);
                errors.removeAttribute("hidden");
                continue;
            } else {
                classes = spell[6].split(', ');
            }    
        } else {
            classes = classesMatch[1].split(', ');
        }

        let level = spell[2];
        if (level == undefined) {
            if (spell[4] == undefined) {
                console.log(`Spell ${name} doesn't have level and it is's a cantrip. Skipped.`);
                continue;
            } else {
                level = "0";
            }
        }

        if (includeRitual && spell[5] != undefined) {
            name += " (ritual)"
        }

        if (includeSchool != 0) {
            name += " *"
            if (includeSchool == -1) {
                name += spell[3];
            } else {
                name += spell[3].substring(0, includeSchool) + ".";
            }
            name += "*"
        }

        let school = spell[3];        

        for (let caster of classes) {
            caster = capitalize(caster);
            if (spellsByClass[caster] == undefined) {
                spellsByClass[caster] = {};
            }
            if (spellsByClass[caster][level] == undefined) {
                spellsByClass[caster][level] = [];
            }
            spellsByClass[caster][level].push(name);
        }
    }

    console.log(spellsByClass);
    return spellsByClass;
}

function StringBuilder() {
    this.array = [];
}
StringBuilder.prototype.append = function(string) {
    this.array.push(string);
    return this;
}
StringBuilder.prototype.toString = function() {
    return this.array.join("");
}
StringBuilder.prototype.appendMany = function(...strings) {
    for (let string of strings) {
        this.append(string);
    }
    return this;
}
StringBuilder.prototype.newLine = function() {
    this.append("\n");
    return this;
}

function getPrefix(number) {
    switch (number) {
        case "1":
            return "st";
        case "2":
            return "nd";
        case "3":
            return "rd";
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            return "th";
    }
}

function write(spellsByClass) {
    let classes = Object.keys(spellsByClass).sort();
    let stringBuilder = new StringBuilder();

    stringBuilder
        .append("<div class='spellList'>")
        .newLine().newLine();

    for (let caster of classes) {
        stringBuilder
            .append('#### ')
            .append(caster)
            .append(' Spells')

        function add(key, name) {
            stringBuilder
                .newLine().newLine()
                .append("##### ")
                .append(name);
            if (spellsByClass[caster][key] != undefined) {
                spellsByClass[caster][key].sort();
                for (let spell of spellsByClass[caster][key]) {
                    stringBuilder
                        .newLine()
                        .append("- ")
                        .append(spell);
                }
            } else {
                stringBuilder.newLine().append("-");
            }
        }

        add("0", "Cantrips (0 Level)");

        for (i = 1; i < 10; i++) {
            n = i.toString();
            add(n, n + getPrefix(n) + " Level");
        }

        stringBuilder
            .newLine().newLine();
    }

    stringBuilder.append("</div>");

    return stringBuilder.toString();
}

function sumarize(text, includeRitual, includeSchool) {
    return write(read(sanitize(text), includeRitual, includeSchool));
}

convert.addEventListener("click", () => {
    errors.setAttribute("hidden", true);
    errorsList.innerHTML = "";

    let schoolSize;
    if (includeSchool.checked) {
        schoolSize = schoolInput.value;
    } else {
        schoolSize = 0;
    }

    let result = sumarize(text.value, includeRitual.checked, schoolSize);
    console.log(result);
    text.value = result;

    text.select();
    document.execCommand("copy");
})

clean.addEventListener("click", () => {
    text.value = "";
    errors.setAttribute("hidden", true);
    errorsList.innerHTML = "";
});