export default {
    name: "contact",
    title: "Contact Page",
    type: "document",
    options: {
    singleton: true, // Identify this document as a singleton
    },
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
        },
        {
            name: "contacttext",
            title: "Contact Text",
            type: "text",
        },
    ],
}