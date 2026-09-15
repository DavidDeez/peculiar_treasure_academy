import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hallOfFameStudent',
  title: 'Hall of Fame Student',
  type: 'document',
  fields: [
    defineField({
      name: 'student',
      title: 'Student Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'exam',
      title: 'Exam Name & Year',
      description: 'e.g., "JAMB 2023" or "WAEC 2023"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'score',
      title: 'Exam Score / Achievement',
      description: 'e.g., "315" or "7 A1s"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subject',
      title: 'Subtext (Department or Admission)',
      description: 'e.g., "Admitted: Medicine & Surgery" or "Science Department"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
