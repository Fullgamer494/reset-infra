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
                reportCount: { bsonType: "int", description: "Cantidad de reportes" },
                isDeleted: { bsonType: "bool", description: "Borrado lógico" },
                isEdited: { bsonType: "bool", description: "Indica si la publicación fue editada" },
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
                postId: { bsonType: "string" },
                parentId: { bsonType: ["string", "null"] },
                authorId: { bsonType: "string" },
                content: { bsonType: "string" },
                isAnonymous: { bsonType: "bool" },
                reactionUps: { bsonType: "number" },
                reportCount: { bsonType: "number", description: "Cantidad de reportes" },
                isDeleted: { bsonType: "bool", description: "Borrado lógico" },
                isEdited: { bsonType: "bool", description: "Indica si el comentario fue editado" },
                createdAt: { bsonType: "date" },
                updatedAt: { bsonType: "date" }
            }
        }
    }
});

db.comments.createIndex({ "postId": 1, "createdAt": 1 });
db.comments.createIndex({ "parentId": 1 });
db.comments.createIndex({ "authorId": 1 });

db.createCollection("reactions", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["userId", "targetId", "targetType", "createdAt"],
            properties: {
                userId: { bsonType: "string" },
                targetId: { bsonType: "string" },
                targetType: { enum: ["post", "comment"] },
                createdAt: { bsonType: "date" }
            }
        }
    }
});

// Índice único para asegurar que un usuario solo pueda reaccionar una vez a un mismo post o comentario
db.reactions.createIndex({ "targetId": 1, "targetType": 1, "userId": 1 }, { unique: true });
// Índice para buscar rápidamente todas las reacciones de un usuario
db.reactions.createIndex({ "userId": 1 });

db.createCollection("reports", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["reporterId", "targetId", "targetType", "reason", "createdAt"],
            properties: {
                reporterId: { bsonType: "string" },
                targetId: { bsonType: "string" },
                targetType: { enum: ["post", "comment"] },
                reason: {
                    enum: [
                        "SPAM",
                        "HARASSMENT",
                        "HATE_SPEECH",
                        "INAPPROPRIATE_CONTENT",
                        "OTHER"
                    ],
                    description: "Tipos de reporte predefinidos."
                },
                details: {
                    bsonType: "string",
                    description: "Campo abierto de texto sugerido para cuando el usuario selecciona OTHER u otro motivo y desea dar más contexto."
                },
                createdAt: { bsonType: "date" },
                updatedAt: { bsonType: "date" }
            }
        }
    }
});

// Índices para facilitar las consultas del panel de moderación
db.reports.createIndex({ "targetId": 1, "targetType": 1 });
db.reports.createIndex({ "createdAt": -1 });
// Índice único para que un usuario solo pueda reportar una vez el mismo post o comentario
db.reports.createIndex({ "targetId": 1, "targetType": 1, "reporterId": 1 }, { unique: true });

db.createCollection("notifications", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["userId", "type", "isRead", "createdAt"],
            properties: {
                userId: { bsonType: "string", description: "ID del usuario que recibe la notificación" },
                actorId: { bsonType: "string", description: "ID del usuario que originó la notificación (opcional)" },
                type: {
                    enum: [
                        "POST_REACTION",
                        "COMMENT_REACTION",
                        "POST_COMMENT",
                        "COMMENT_REPLY",
                        "POST_REPORTED",
                        "COMMENT_REPORTED",
                        "POST_DELETED_BY_REPORTS",
                        "COMMENT_DELETED_BY_REPORTS",
                        "SPONSORSHIP_REQUEST",
                        "SPONSORSHIP_ACCEPTED",
                        "SPONSORSHIP_REJECTED"
                    ]
                },
                targetId: { bsonType: "string", description: "Referencia al post o comentario según el tipo" },
                isRead: { bsonType: "bool" },
                createdAt: { bsonType: "date" }
            }
        }
    }
});

// Índices para obtener rápidamente las notificaciones de un usuario
db.notifications.createIndex({ "userId": 1, "createdAt": -1 });
// Índices para filtrar notificaciones no leídas
db.notifications.createIndex({ "userId": 1, "isRead": 1 });

db.createCollection("encouragement_notes", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["senderId", "receiverId", "content", "createdAt"],
            properties: {
                senderId: { bsonType: "string", description: "UUID del sponsor emisor" },
                receiverId: { bsonType: "string", description: "UUID del adicto receptor" },
                content: { bsonType: "string", description: "Contenido del mensaje de aliento" },
                createdAt: { bsonType: "date" }
            }
        }
    }
});

// Índice para obtener rápidamente los mensajes recibidos por un adicto, ordenados por fecha
db.encouragement_notes.createIndex({ "receiverId": 1, "createdAt": -1 });
// Índice para buscar mensajes enviados por un sponsor
db.encouragement_notes.createIndex({ "senderId": 1 });

