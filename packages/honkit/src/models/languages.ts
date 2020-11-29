import Immutable from "immutable";
import File from "./file";
import Language from "./language";

const Languages = Immutable.Record({
    file: new File(),
    list: Immutable.OrderedMap(),
});

Languages.prototype.getFile = function () {
    return this.get("file");
};

Languages.prototype.getList = function () {
    return this.get("list");
};

/**
 Get default languages

 @return {Language}
 */
Languages.prototype.getDefaultLanguage = function () {
    return this.getList().first();
};

/**
 Get a language by its ID

 @param {string} lang
 @return {Language}
 */
Languages.prototype.getLanguage = function (lang) {
    return this.getList().get(lang);
};

/**
 Return count of langs

 @return {number}
 */
Languages.prototype.getCount = function () {
    return this.getList().size;
};

/**
 Create a languages list from a JS object

 @param {File}
 @param {Array}
 @return {Language}
 */

// @ts-expect-error ts-migrate(2339) FIXME: Property 'createFromList' does not exist on type '... Remove this comment to see the full error message
Languages.createFromList = function (file, langs) {
    let list = Immutable.OrderedMap();

    langs.forEach((lang) => {
        lang = Language({
            title: lang.title,
            path: lang.ref,
        });
        list = list.set(lang.getID(), lang);
    });

    return Languages({
        file: file,
        list: list,
    });
};

export default Languages;