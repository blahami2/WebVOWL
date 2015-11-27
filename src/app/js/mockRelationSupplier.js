/**
 * Contains the logic for the ontology listing and conversion.
 *
 * @returns {{}}
 */
module.exports = function () {

    var mockRelationSupplier = {},
            usersCount = 5
            , cardsCount = 7
            , spacesCount = 1,
            db = {
                projects: [],
                users: [],
                cards: [],
                spaces: [],
                tasks: [],
                chats: []
            };

    function init() {
        COUNT = 20;
        for (i = 0; i < COUNT; i++) {
            db.projects.push({
                id: "Project_#" + i
                , title: "Project_#" + i
                , description: "Description_#" + i
                , link: "Link_#" + i
                , users: []
                , cards: []
                , spaces: []
            });
        }
        for (i = 0; i < COUNT; i++) {
            db.users.push({
                id: "User_#" + i
                , title: "User_#" + i
                , description: "Description_#" + i
                , link: "Link_#" + i
                , cards: []
                , spaces: []
                , projects: []
                , chats: []
                , tasks: []
            });
        }
        for (i = 0; i < COUNT; i++) {
            db.cards.push({
                id: "Card_#" + i
                , title: "Card_#" + i
                , description: "Description_#" + i
                , link: "Link_#" + i
                , users: []
                , projects: []
                , tasks: []
            });
        }
        for (i = 0; i < COUNT; i++) {
            db.spaces.push({
                id: "Space_#" + i
                , title: "Space_#" + i
                , description: "Description_#" + i
                , link: "Link_#" + i
                , users: []
                , cards: []
                , spaces: []
                , projects: []
                , chats: []
                , tasks: []
            });
        }
        for (i = 0; i < COUNT; i++) {
            db.tasks.push({
                id: "Task_#" + i
                , title: "Task_#" + i
                , description: "Description_#" + i
                , link: "Link_#" + i
                , users: []
                , cards: []
            });
        }
        for (i = 0; i < COUNT; i++) {
            db.chats.push({
                id: "Chat_#" + i
                , title: "Chat_#" + i
                , description: "Description_#" + i
                , link: "Link_#" + i
                , users: []
            });
        }
        min = 1;
        max = 5;
        for (i = 0; i < COUNT; i++) {
            fillArray(db.projects[i], "projects", db.users, "users", min, max, COUNT);
            fillArray(db.projects[i], "projects", db.cards, "cards", min, max, COUNT);
            fillArray(db.projects[i], "projects", db.spaces, "spaces", min, max, COUNT);
        }
        for (i = 0; i < COUNT; i++) {
            fillArray(db.cards[i], "cards", db.projects, "projects", min, max, COUNT);
            fillArray(db.cards[i], "cards", db.users, "users", min, max, COUNT);
            fillArray(db.cards[i], "cards", db.tasks, "tasks", min, max, COUNT);
        }
        for (i = 0; i < COUNT; i++) {
            fillArray(db.tasks[i], "tasks", db.cards, "cards", min, max, COUNT);
            fillArray(db.tasks[i], "tasks", db.users, "users", min, max, COUNT);
        }
        for (i = 0; i < COUNT; i++) {
            fillArray(db.users[i], "users", db.projects, "projects", min, max, COUNT);
            fillArray(db.users[i], "users", db.tasks, "tasks", min, max, COUNT);
            fillArray(db.users[i], "users", db.spaces, "spaces", min, max, COUNT);
            fillArray(db.users[i], "users", db.cards, "cards", min, max, COUNT);
            fillArray(db.users[i], "users", db.chats, "chats", min, max, COUNT);
        }
        for (i = 0; i < COUNT; i++) {
            fillArray(db.chats[i], "chats", db.users, "users", min, max, COUNT);
        }
//        alert("init");
//        document.getElementById("description").innerHTML = JSON.stringify(db);
    }

    function fillArray(targetObject, sourcePropertyName, sourceArray, targetPropertyName, minCount, maxCount, arraySize) {
        var n = randomInt(minCount, maxCount);
        for (j = 0; j < n; j++) {
//            while (true) {
//                var tmp = sourceArray[randomInt(0, arraySize - 1)];
//                if (targetArray.indexOf(tmp) < 0) {
//                    targetArray.push(tmp);
//                    
//                    break;
//                }
//            }

            var tmp = sourceArray[randomInt(0, arraySize - 1)];
            if (targetObject[targetPropertyName].indexOf(tmp) < 0) {
                targetObject[targetPropertyName].push(tmp);
                tmp[sourcePropertyName].push(targetObject);
            }
        }
    }

    function randomInt(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    mockRelationSupplier.getProjectDeprecated = function (project) {
        var p;
        for (i = 0; i < db.projects.length; i++) {
            if (db.projects[i].id === project.id) {
                p = db.projects[i];
                break;
            }
        }
        var relations = [];
        for (i = 0; i < p.users.length; i++) {
            relations.push({
                'relationName': 'projectHasMember',
                'relationEntity': {
                    'name': 'User',
                    'value': {
                        'id': p.users[i].id,
                        'title': p.users[i].title,
                        'description': p.users[i].description,
                        'link': p.users[i].link
                    }
                }
            });
        }
        for (i = 0; i < p.cards.length; i++) {
            relations.push({
                'relationName': 'projectHasCard',
                'relationEntity': {
                    'name': 'Card',
                    'value': {
                        'id': p.cards[i].id,
                        'title': p.cards[i].title,
                        'description': p.cards[i].description,
                        'link': p.cards[i].link
                    }
                }
            });
        }
        for (i = 0; i < p.spaces.length; i++) {
            relations.push({
                'relationName': 'projectBelongsToSpace',
                'relationEntity': {
                    'name': 'Space',
                    'value': {
                        'id': p.spaces[i].id,
                        'title': p.spaces[i].title,
                        'description': p.spaces[i].description,
                        'link': p.spaces[i].link
                    }
                }
            });
        }
        return relations;
    };
    
    mockRelationSupplier.getProjectRelations = function (projectId){
        var relations = [];
        for (i = 0; i < 3; i++) {
            relations.push({
                'relationName': 'projectHasMember',
                'relationEntity': {
                    'name': 'User',
                    'value': {
                        'id': "User#" + i,
                        'title': "User#" + i,
                        'description': "User#" + i + "_description",
                        'link': "User#" + i + "_link"
                    }
                }
            });
        }
        for (i = 0; i < 2; i++) {
            relations.push({
                'relationName': 'projectHasCard',
                'relationEntity': {
                    'name': 'Card',
                    'value': {
                        'id': "Card#" + i,
                        'title': "Card#" + i,
                        'description': "Card#" + i + "_description",
                        'link': "Card#" + i + "_link"
                    }
                }
            });
        }
        for (i = 0; i < 1; i++) {
            relations.push({
                'relationName': 'projectBelongsToSpace',
                'relationEntity': {
                    'name': 'Space',
                    'value': {
                        'id': "Space#" + i,
                        'title': "Space#" + i,
                        'description': "Space#" + i + "_description",
                        'link': "Space#" + i + "_link"
                    }
                }
            });
        }
        return relations;
    }

    mockRelationSupplier.getUserRelations = function (userId) {
        db.users.forEach(function (user) {
            if (user.id === userId) {
                var relations = [];
                user.projects.forEach(function (project) {
                    relations.push({
                        'relationName': 'projectHasMember',
                        'relationEntity': {
                            'name': 'User',
                            'value': {
                                'id': p.users[i].id,
                                'title': p.users[i].title,
                                'description': p.users[i].description,
                                'link': p.users[i].link
                            }
                        }
                    });
                });
                return {
                    'relationName': 'projectHasMember',
                    'relationEntity': {
                        'name': 'User',
                        'value': {
                            'id': p.users[i].id,
                            'title': p.users[i].title,
                            'description': p.users[i].description,
                            'link': p.users[i].link
                        }
                    }
                };
            }
        });
    };

    mockRelationSupplier.getProjectCustom = function (project) {
        var relations = {
            project: {
                id: project.id
                , title: "Project_#" + project.id
                , description: "Description_#" + project.id
                , link: "Link_#" + project.id
            }
            , users: []
            , cards: []
            , spaces: []
        };
        for (i = 0; i < usersCount; i++) {
            relations.users.push({
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
    init();

    return mockRelationSupplier;
};




