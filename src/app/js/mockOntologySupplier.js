/**
 * Contains the logic for the ontology listing and conversion.
 *
 * @returns {{}}
 */
module.exports = function (loadOntologyFromText) {

    var mockOntologySupplier = {};

    mockOntologySupplier.load = function () {
        var json = {
            _comment: "this is comment"
            , namespace: []
            , header: {
                languages: ["en"]
                , title: {
                    en: "English title"
                }
                , iri: "http://not.working.iri"
                , version: "1.0"
                , author: ["Michael Blaha", "Lukas Hruby", "Tester Testing"]
                , description: {
                    en: "This is english description"
                }
                , seeAlso: ["nothing"]
                , issued: ["2015-11-24"]
                , license: ["none"]
                , rdfsLabel: ["My Ontology"]
                , others: {
                }
            }

        };

        mockRelationSupplier = require("./mockRelationSupplier")();
        relations = mockRelationSupplier.getProject();

        json.metrics = {
            "classCount": relations.members.length + relations.cards.length + relations.spaces.length,
            "datatypeCount": 0,
            "objectPropertyCount": 16,
            "datatypePropertyCount": 6,
            "propertyCount": 22,
            "nodeCount": 13,
            "axiomCount": 158,
            "individualCount": 0
        };
        json.class = [];
        json.class.push({
            id: "class_project" + relations.project.id,
            type: "owl:Class"
        });
        for (i = 0; i < relations.members.length; i++) {
            json.class.push({
                id: "class_member" + relations.members[i].id,
                type: "owl:Class"
            });
        }
        for (i = 0; i < relations.cards.length; i++) {
            json.class.push({
                id: "class_card" + relations.cards[i].id,
                type: "owl:Class"
            });
        }
        for (i = 0; i < relations.spaces.length; i++) {
            json.class.push({
                id: "class_space" + relations.spaces[i].id,
                type: "owl:Class"
            });
        }
        json.classAttribute = [];
        json.classAttribute.push({
            id: "class_project" + relations.project.id,
            label: relations.project.title,
            comment: relations.project.description,
            iri: relations.project.link
        });
        for (i = 0; i < relations.members.length; i++) {
            json.classAttribute.push({
                id: "class_member" + relations.members[i].id,
                label: relations.members[i].title,
                comment: relations.members[i].description,
                iri: relations.members[i].link
            });
        }
        for (i = 0; i < relations.cards.length; i++) {
            json.classAttribute.push({
                id: "class_card" + relations.cards[i].id,
                label: relations.cards[i].title,
                comment: relations.cards[i].description,
                iri: relations.cards[i].link
            });
        }
        for (i = 0; i < relations.spaces.length; i++) {
            json.classAttribute.push({
                id: "class_space" + relations.spaces[i].id,
                label: relations.spaces[i].title,
                comment: relations.spaces[i].description,
                iri: relations.spaces[i].link
            });
        }
        json.datatype = [];
        json.datatypeAttribute = [];
        json.property = [];
        for (i = 0; i < relations.members.length; i++) {
            json.property.push({
                id: "property_project_member" + relations.members[i].id,
                type: "owl:objectProperty"
            });
        }
        for (i = 0; i < relations.cards.length; i++) {
            json.property.push({
                id: "property_project_card" + relations.cards[i].id,
                type: "owl:objectProperty"
            });
        }
        for (i = 0; i < relations.spaces.length; i++) {
            json.property.push({
                id: "property_project_space" + relations.spaces[i].id,
                type: "owl:objectProperty"
            });
        }
        json.propertyAttribute = [];
        for (i = 0; i < relations.members.length; i++) {
            json.propertyAttribute.push({
                id: "property_project_member" + relations.members[i].id,
                label: {
                    "en": "hasMember"
                },
                domain: "class_project" + relations.project.id,
                range: "class_member" + relations.members[i].id
            });
        }
        for (i = 0; i < relations.cards.length; i++) {
            json.propertyAttribute.push({
                id: "property_project_card" + relations.cards[i].id,
                label: {
                    "en": "hasCard"
                },
                domain: "class_project" + relations.project.id,
                range: "class_card" + relations.cards[i].id
            });
        }
        for (i = 0; i < relations.spaces.length; i++) {
            json.propertyAttribute.push({
                id: "property_project_space" + relations.spaces[i].id,
                label: {
                    "en": "belongsToSpace"
                },
                domain: "class_project" + relations.project.id,
                range: "class_space" + relations.spaces[i].id
            });
        }
        loadOntologyFromText(JSON.stringify(json), undefined);
    };


    return mockOntologySupplier;
};


