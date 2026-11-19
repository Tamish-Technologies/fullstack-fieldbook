import { quizzes } from './quizzes'
import { weekTwoQuizzes } from './week-two-quizzes'
import { labs, projects as firstProjects } from './practicals'
import { weekTwoLabs, weekTwoProjects } from './week-two-practicals'

import { weekThreeQuizzes } from './week-three-quizzes'
import { weekThreeLabs, weekThreeProjects } from './week-three-practicals'

import { weekFourQuizzes } from './week-four-quizzes'
import { weekFourLabs, weekFourProjects } from './week-four-practicals'

import { weekFiveQuizzes } from './week-five-quizzes'
import { weekFiveLabs, weekFiveProjects } from './week-five-practicals'
import { weekSixQuizzes } from './week-six-quizzes'
import { weekSixLabs, weekSixProjects } from './week-six-practicals'

import { weekSevenQuizzes } from './week-seven-quizzes'
import { weekSevenLabs, weekSevenProjects } from './week-seven-practicals'

import { weekEightQuizzes } from './week-eight-quizzes'
import { weekEightLabs, weekEightProjects } from './week-eight-practicals'

import { weekNineQuizzes } from './week-nine-quizzes'
import { weekNineLabs, weekNineProjects } from './week-nine-practicals'

import { weekTenQuizzes } from './week-ten-quizzes'
import { weekTenLabs, weekTenProjects } from './week-ten-practicals'

import { weekElevenQuizzes } from './week-eleven-quizzes'
import { weekElevenLabs, weekElevenProjects } from './week-eleven-practicals'

import { weekTwelveQuizzes } from './week-twelve-quizzes'
import { weekTwelveLabs, weekTwelveProjects } from './week-twelve-practicals'

export const activeQuizzes = [
  ...quizzes,
  ...weekTwoQuizzes,
  ...weekThreeQuizzes,
  ...weekFourQuizzes,
  ...weekFiveQuizzes,
  ...weekSixQuizzes,
  ...weekSevenQuizzes,
  ...weekEightQuizzes,
  ...weekNineQuizzes,
  ...weekTenQuizzes,
  ...weekElevenQuizzes,
  ...weekTwelveQuizzes,
]
export const projects = {
  ...firstProjects,
  ...weekTwoProjects,
  ...weekThreeProjects,
  ...weekFourProjects,
  ...weekFiveProjects,
  ...weekSixProjects,
  ...weekSevenProjects,
  ...weekEightProjects,
  ...weekNineProjects,
  ...weekTenProjects,
  ...weekElevenProjects,
  ...weekTwelveProjects,
}
export function labFor(id: string) {
  if (/^p1-w01-l\d{2}-c01$/.test(id)) return labs[id.slice(8, 10)]
  return (
    weekTwoLabs[id] ??
    weekThreeLabs[id] ??
    weekFourLabs[id] ??
    weekFiveLabs[id] ??
    weekSixLabs[id] ??
    weekSevenLabs[id] ??
    weekEightLabs[id] ??
    weekNineLabs[id] ??
    weekTenLabs[id] ??
    weekElevenLabs[id] ??
    weekTwelveLabs[id]
  )
}
