export default {
    name: "homepage",
    title: "Home Page",
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
            name: "herotext",
            title: "Hero Text",
            type: "text",
        },
        {
            name: "features_title",
            title: "Features Section Title",
            type: "string",
        },
        {
            name: "features_content",
            title: "Features Section Content",
            type: "text",
        },
        {
            name: "about_title1",
            title: "About Section Title (1)",
            type: "string",
        },
        {
            name: "about_title2",
            title: "About Section Title (2)",
            type: "string",
        },
        {
            name: "about_content",
            title: "About Section Content",
            type: "text",
        },
        {
            name: "footertext",
            title: "Footer Text",
            type: "text",
        },
    ],
};