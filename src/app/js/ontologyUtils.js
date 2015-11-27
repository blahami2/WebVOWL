/**
 * Contains the logic for the ontology listing and conversion.
 *
 * @returns {{}}
 */
module.exports = function (loadOntologyFromText) {
    
    var TYPE_CLASS = "owl:Class";
    var TYPE_PROPERTY_OBJECT = "owl:objectProperty";

    var ontologyUtils = {};
    
    ontologyUtils.loadDefault = function(baseRelation) {
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
                , author: ["Michael Blaha"]
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
        json.class = [];
        json.class.push({
            id: getClassId(baseRelation),
            type: TYPE_CLASS
        });
        json.classAttribute = [];
        json.classAttribute.push({
            id: getClassId(baseRelation),
                label: {
                    en: baseRelation.relationEntity.value.title
                },
                comment: baseRelation.relationEntity.value.description,
                iri: baseRelation.relationEntity.value.link
        });
        json.datatype = [];
        json.datatypeAttribute = [];
        json.property = [];
        json.propertyAttribute = [];
        return json;
    };

    ontologyUtils.load = function () {
        idx = 2;
        var project = {
            id: "Project_#" + idx
            , title: "Project_#" + idx
            , description: "Description_#" + idx
            , link: "Link_#" + idx
        }

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
                , author: ["Michael Blaha"]
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
        relations = mockRelationSupplier.getProjectDeprecated(project);

        json.metrics = {
            "classCount": 0,
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
            id: "class_" + project.id,
            type: "owl:Class"
        });
        for (i = 0; i < relations.length; i++) {
            json.class.push({
                id: "class_" + relations[i].relationEntity.name + relations[i].relationEntity.value.id,
                type: "owl:Class"
            });
        }
        json.classAttribute = [];
        json.classAttribute.push({
            id: "class_" + project.id,
            label: project.title,
            comment: project.description,
            iri: project.link
        });
        for (i = 0; i < relations.length; i++) {
            json.classAttribute.push({
                id: "class_" + relations[i].relationEntity.name + relations[i].relationEntity.value.id,
                label: relations[i].relationEntity.value.title,
                comment: relations[i].relationEntity.value.description,
                iri: relations[i].relationEntity.value.link
            });
        }
        json.datatype = [];
        json.datatypeAttribute = [];
        json.property = [];
        for (i = 0; i < relations.length; i++) {
            json.property.push({
                id: "property_" + project.id + "_" + relations[i].relationEntity.name + relations[i].relationEntity.value.id,
                type: "owl:objectProperty"
            });
        }
        json.propertyAttribute = [];
        for (i = 0; i < relations.length; i++) {
            json.propertyAttribute.push({
                id: "property_" + project.id + "_" + relations[i].relationEntity.name + relations[i].relationEntity.value.id,
                label: {
                    "en": relations[i].relationName
                },
                domain: "class_" + project.id,
                range: "class_" + relations[i].relationEntity.name + relations[i].relationEntity.value.id
            });
        }
//        alert(JSON.stringify(json));
        loadOntologyFromText(JSON.stringify(json), undefined);
    };
    
    
    
    ontologyUtils.expand = function (data, relationToExpand) {
        mockRelationSupplier = require("./mockRelationSupplier")();
        relations = mockRelationSupplier.getProjectRelations(relationToExpand.relationEntity.id);
        for (i = 0; i < relations.length; i++) {
            data.class.push({
                id: getClassId(relations[i]),
                type: TYPE_CLASS
            });
        }
        for (i = 0; i < relations.length; i++) {
            data.classAttribute.push({
                id: getClassId(relations[i]),
                label: {
                    en: relations[i].relationEntity.value.title
                },
                comment: relations[i].relationEntity.value.description,
                iri: relations[i].relationEntity.value.link
            });
        }
        for (i = 0; i < relations.length; i++) {
            data.property.push({
                id: getPropertyId(relationToExpand, relations[i]),
                type: TYPE_PROPERTY_OBJECT
            });
        }
        for (i = 0; i < relations.length; i++) {
            data.propertyAttribute.push({
                id: getPropertyId(relationToExpand, relations[i]),
                label: {
                    en: relations[i].relationName
                },
                domain: getClassId(relationToExpand),
                range: getClassId(relations[i])
            });
        }
        return data;
    };
    
    function getClassId(relation){
        return "class_" + relation.relationEntity.name + "_" + relation.relationEntity.value.id;
    }
    
    function getPropertyId(sourceRelation, targetRelation){
        return "property_" + getClassId(sourceRelation) + "_" + getClassId(targetRelation);
    }


    return ontologyUtils;
};


