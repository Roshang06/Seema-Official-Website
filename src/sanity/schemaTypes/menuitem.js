export default {
  name: 'menuitem',       // The internal ID (used in your code/queries)
  title: 'Menu Item',      // The label your client sees in the Studio
  type: 'document',      // 'document' means it's a main piece of content
  fields: [
    {
      name: 'itemname',
      title: 'Item Name',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true, // Allows the client to choose the crop area
      },
    },
  ],
}