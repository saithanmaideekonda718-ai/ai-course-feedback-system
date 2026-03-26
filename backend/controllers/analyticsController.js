import Feedback from "../models/Feedback.js"

/* Sentiment */
export const courseSentimentAnalytics = async (req, res) => {
  try {
    const data = await Feedback.aggregate([
      {
        $group: {
          _id: {
            course: "$courseId",
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

/* Ratings */
export const courseRatings = async (req, res) => {
  try {
    const ratings = await Feedback.aggregate([
  {
    $group: {
      _id: "$courseId",
      averageRating: { $avg: "$rating" },
      totalRatings: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "courses",
      localField: "_id",
      foreignField: "_id",
      as: "course"
    }
  }
])

    res.json(ratings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/* Trend */
export const feedbackTrend = async (req, res) => {
  try {
    const trend = await Feedback.aggregate([
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          totalFeedback: { $sum: 1 }
        }
      }
    ])

    res.json(trend)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}