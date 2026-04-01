export default {
  name: "catering",       // The internal ID (used in your code/queries)
  title: "Catering",      // The label your client sees in the Studio
  type: "document",      // "document" means it"s a main piece of content
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true, // Allows the client to choose the crop area
      },
    },
  ],
}