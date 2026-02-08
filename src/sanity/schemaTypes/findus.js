export default {
    name: "findus",
    title: "Find Us Page",
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
            name: "findustext",
            title: "Find Us Text",
            type: "array",
            of: [
                {
                    type: "text",
                },
            ],
        },
    ],
}