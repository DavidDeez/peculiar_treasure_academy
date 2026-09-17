export default {
  name: 'studyMaterial',
  title: 'Study Material',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      description: 'e.g. "Week 1: Introduction to Algebra"',
    },
    {
      name: 'classLevel',
      title: 'Class',
      type: 'string',
      options: {
        list: [
          { title: 'Primary 5', value: 'primary-5' },
          { title: 'Primary 6', value: 'primary-6' },
          { title: 'JSS 1', value: 'jss-1' },
          { title: 'JSS 2', value: 'jss-2' },
          { title: 'JSS 3', value: 'jss-3' },
          { title: 'SSS 1', value: 'sss-1' },
          { title: 'SSS 2', value: 'sss-2' },
          { title: 'SSS 3', value: 'sss-3' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subject',
      title: 'Subject',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      description: 'e.g. Mathematics, English, Physics',
    },
    {
      name: 'file',
      title: 'PDF Document / File',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
      description: 'Upload a PDF file (optional if you are just typing notes)',
    },
    {
      name: 'notes',
      title: 'Additional Notes',
      type: 'text',
      description: 'You can type notes here if you do not have a file to upload.',
    },
    {
      name: 'dateAdded',
      title: 'Date Added',
      type: 'date',
      initialValue: () => (new Date()).toISOString().split('T')[0],
      validation: (Rule: any) => Rule.required(),
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'classLevel',
      subject: 'subject'
    },
    prepare(selection: any) {
      const { title, subtitle, subject } = selection
      return {
        title: title,
        subtitle: `${subtitle?.toUpperCase()} | ${subject}`
      }
    }
  }
}
