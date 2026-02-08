export default{
    name: "sitesettings",
    title: "Site Settings",
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
            name: "address",
            title: "Address",
            type: "text",
        },
        {
            name: "phone",
            title: "Phone Number",
            type: "string",
        },
        {
            name: "email",
            title: "Email",
            type: "string",
        },
        {
            name: "instagram",
            title: "Instagram Link",
            type: "string",
        },
    ],
}