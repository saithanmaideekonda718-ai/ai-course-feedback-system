import Feedback from "../models/Feedback.js"
import Rating from "../models/Rating.js"

/*
Course Sentiment Analytics
Shows positive / neutral / negative feedback count per course
*/
export const courseSentimentAnalytics = async (req, res) => {

  try {

    const data = await Feedback.aggregate([
      {
        $group: {
          _id: {
            course: "$course",
            sentiment: "$sentiment"
          },
          count: { $sum: 1 }
        }
      }
    ])

    res.json(data)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}

/*
Automatic Course Rating Calculation
*/
export const courseRatings = async (req, res) => {

  try {

    const ratings = await Rating.aggregate([
      {
        $group: {
          _id: "$course",
          averageRating: { $avg: "$rating" },
          totalRatings: { $sum: 1 }
        }
      }
    ])

    res.json(ratings)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}

/*
Feedback Trend Analysis
Shows feedback count per month
*/
export const feedbackTrend = async (req, res) => {

  try {

    const trend = await Feedback.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" }
          },
          totalFeedback: { $sum: 1 }
        }
      }
    ])

    res.json(trend)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}