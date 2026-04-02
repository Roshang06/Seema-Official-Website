export default {
  name: 'menuitem',       // The internal ID (used in your code/queries)
  title: 'Menu Items',      // The label your client sees in the Studio
  type: 'document',      // 'document' means it's a main piece of content
  fields: [
    {
      name: 'itemname',
      title: 'Item Name',
      type: 'string',
    },
    {
      name: 'section',
      title: 'Section',
      type: 'string',
    },
    {
      name: 'catering',
      title: "Catering Menu Only",
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      validation: (Rule) => Rule.positive(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'modifiers',
      title: 'Modifiers',
      type: 'array',
      of: [{ type: 'modifier' }],
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