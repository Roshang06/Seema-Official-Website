export default {
    name: "homepage",
    title: "Home Page",
    type: "document",

    fields: [
        {
            name: "herotext",
            title: "Hero Text",
            type: "text",
        },
    ],
    preview: {
    prepare() {
      return {
        title: 'Home Page Content', // This replaces "Untitled"
      }
    },
  },
};