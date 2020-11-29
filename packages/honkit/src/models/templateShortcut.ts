import Immutable from "immutable";
import is from "is";

/*
    A TemplateShortcut is defined in plugin's template blocks
    to replace content with a templating block using delimiters.
*/

const TemplateShortcut = Immutable.Record(
    {
        // List of parser names accepting this shortcut
        parsers: Immutable.Map(),

        start: String(),
        end: String(),

        startTag: String(),
        endTag: String(),
    },
    "TemplateShortcut"
);

TemplateShortcut.prototype.getStart = function () {
    return this.get("start");
};

TemplateShortcut.prototype.getEnd = function () {
    return this.get("end");
};

TemplateShortcut.prototype.getStartTag = function () {
    return this.get("startTag");
};

TemplateShortcut.prototype.getEndTag = function () {
    return this.get("endTag");
};

TemplateShortcut.prototype.getParsers = function () {
    return this.get("parsers");
};

/**
 Test if this shortcut accept a parser

 @param {Parser|String} parser
 @return {boolean}
 */
TemplateShortcut.prototype.acceptParser = function (parser) {
    if (!is.string(parser)) {
        parser = parser.getName();
    }

    const parserNames = this.get("parsers");
    return parserNames.includes(parser);
};

/**
 Create a shortcut for a block

 @param {TemplateBlock} block
 @param {Map} details
 @return {TemplateShortcut}
 */

// @ts-expect-error ts-migrate(2339) FIXME: Property 'createForBlock' does not exist on type '... Remove this comment to see the full error message
TemplateShortcut.createForBlock = function (block, details) {
    details = Immutable.fromJS(details);

    return new TemplateShortcut({
        parsers: details.get("parsers"),
        start: details.get("start"),
        end: details.get("end"),
        startTag: block.getName(),
        endTag: block.getEndTag(),
    });
};

export default TemplateShortcut;