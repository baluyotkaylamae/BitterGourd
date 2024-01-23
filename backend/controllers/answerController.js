// const Answer = require('../models/answer');
// const Survey = require('../models/survey');

// const answerController = {
//   submitAnswer: async (req, res) => {
//     try {
//       const { surveyId, questionId, selectedOption } = req.body;

//       // Check if the survey and question exist
//       const survey = await Survey.findById(surveyId);
//       if (!survey) {
//         return res.status(404).json({ error: 'Survey not found' });
//       }

//       const question = survey.questions.find((q) => q._id == questionId);
//       if (!question) {
//         return res.status(404).json({ error: 'Question not found' });
//       }

//       // Save the answer to the database
//       const answer = new Answer({
//         surveyId,
//         questionId,
//         selectedOption,
//       });

//       await answer.save();

//       res.status(201).json({ message: 'Answer submitted successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },
// };

// module.exports = answerController;
