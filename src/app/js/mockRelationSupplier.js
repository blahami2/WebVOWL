/**
 * Contains the logic for the ontology listing and conversion.
 *
 * @returns {{}}
 */
module.exports = function () {

    var mockRelationSupplier = {},
        membersCount = 5
        , cardsCount = 7
        , spacesCount = 1;

    mockRelationSupplier.getProject = function () {
        var relations = {
            project: {
                    id: 1
                    , title: "Project_title"
                    , description: "Description_project"
                    , link: "Link_project"
            }
            ,members: []
            , cards: []
            , spaces: []
        };
        for (i = 0; i < membersCount; i++) {
            relations.members.push({
                    id: i
                    , title: "User_#" + i
                    , description: "Description_#" + i
                    , link: "Link_#" + i
                });
        }
        for (i = 0; i < cardsCount; i++) {
            relations.cards.push({
                    id: i
                    , title: "Card_#" + i
                    , description: "Description_#" + i
                    , link: "Link_#" + i
                });
        }
        for (i = 0; i < spacesCount; i++) {
            relations.spaces.push({
                    id: i
                    , title: "Space_#" + i
                    , description: "Description_#" + i
                    , link: "Link_#" + i
                });
        }
        return relations;
    };

    return mockRelationSupplier;
};




