type metas = {
  name: string,
  content: string,
}

type TApplicationSetting = {
  name: string,
  shortName: string,
  metas: metas[],
}

export const applicationSetting: TApplicationSetting = {
  name: 'School Management System',
  shortName: 'SMS',
  metas: [
    {
      name: 'keywords',
      content: 'school,teacher,student,management system'
    },
    {
      name: 'description',
      content: 'Manage school resource and analyze student performance.'
    }
  ],
}