db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE || 'reset_forum');

db.createCollection("posts", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["authorId", "title", "content", "isAnonymous", "createdAt"],
            properties: {
                authorId: { bsonType: "string" },
                title: { bsonType: "string" },
                content: { bsonType: "string" },
                isAnonymous: { bsonType: "bool" },
                images: {
                    bsonType: "array",
                    items: { bsonType: "string" }
                },
                tags: {
                    bsonType: "array",
                    items: { bsonType: "string" }
                },
                reactionUps: { bsonType: "int" },
                commentCount: { bsonType: "int" },
                createdAt: { bsonType: "date" },
                updatedAt: { bsonType: "date" }
            }
        }
    }
});

db.posts.createIndex({ "authorId": 1 });
db.posts.createIndex({ "tags": 1 });
db.posts.createIndex({ "createdAt": -1 });

db.createCollection("comments", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["postId", "authorId", "content", "isAnonymous", "createdAt"],
            properties: {
                postId: { bsonType: "objectId" },
                parentId: { bsonType: ["objectId", "null"] },
                authorId: { bsonType: "string" },
                content: { bsonType: "string" },
                isAnonymous: { bsonType: "bool" },
                reactionUps: { bsonType: "int" },
                createdAt: { bsonType: "date" },
                updatedAt: { bsonType: "date" }
            }
        }
    }
});

db.comments.createIndex({ "postId": 1, "createdAt": 1 });
db.comments.createIndex({ "parentId": 1 });
db.comments.createIndex({ "authorId": 1 });
