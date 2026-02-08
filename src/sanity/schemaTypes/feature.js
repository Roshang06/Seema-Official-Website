export default {
    name: "feature",
    title: "Features",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "content",
            title: "Text",
            type: "text",
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        {
            name: "linkedtext",
            title: "Linked Text",
            type: "string",
        },
    ],
}
       