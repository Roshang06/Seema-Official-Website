export default {
    name: "modifier",
    title: "Modifier",
    type: "object",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
        },
        {
            name: "options",
            title: "Options",
            type: "array",
            of: [{ type: "string", }],
        },
    ],   
}